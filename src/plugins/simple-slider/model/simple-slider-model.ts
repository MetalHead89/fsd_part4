/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */

import {
  ISimpleSliderModel,
  ISize,
  IThumbsPositions,
  IPosition,
  ISliderSettings,
  IProgressBarParams,
  IPopUps,
  IScalePointParams,
  IThumbsValues,
} from '../interfaces';
import Subject from '../subject/subject';

class SimpleSliderModel extends Subject implements ISimpleSliderModel {
  private orientation = 'horizontal';
  private type = 'range';
  private scale = true;
  private popUps = true;
  private min = 0;
  private max = 10;
  private step = 1;
  private thumbOneValue = 3;
  private thumbTwoValue = 7;
  private sliderSize = { width: 500, height: 10 };
  private thumbSize = { width: 500, height: 10 };

  constructor(settings: ISliderSettings) {
    super();
    this.refreshSliderState(settings);
  }

  /**
   * Устанавливает размер слайдера
   * @param {ISize} size - объект с шириной и высотой слайдера
   */
  setSliderSize(size: ISize): void {
    this.sliderSize = size;
  }

  setThumbSize(size: ISize): void {
    this.thumbSize = size;
  }

  /**
   * Полностью обновляет состояние модели
   * @param settings - объект с настройками модели
   */
  refreshSliderState(settings: ISliderSettings): void {
    if (settings.sliderSize !== undefined) {
      this.sliderSize = settings.sliderSize;
    }
    if (settings.thumbSize !== undefined) {
      this.thumbSize = settings.thumbSize;
    }
    if (this.orientation !== settings.orientation) {
      this.orientation = settings.orientation;
      this.notify('orientationIsUpdated');
    }
    if (this.type !== settings.type) {
      this.type = settings.type;
      this.notify('typeIsUpdated');
    }
    if (this.min !== settings.min) {
      this.min = settings.min;
      this.notify('minIsUpdated');
    }
    if (this.max !== settings.max) {
      this.max = settings.max;
      this.notify('maxIsUpdated');
    }
    if (this.step !== settings.step) {
      this.step = settings.step;
      this.notify('stepIsUpdated');
    }
    if (this.scale !== settings.scale) {
      this.scale = settings.scale;
      this.notify('scaleStateIsUpdated');
    }
    if (this.popUps !== settings.popUps) {
      this.popUps = settings.popUps;
      this.notify('popUpsStateIsUpdated');
    }
    if (
      this.thumbOneValue !== settings.thumbOneValue ||
      this.thumbTwoValue !== settings.thumbTwoValue
    ) {
      this.setThumbsValues({
        thumbOne: settings.thumbOneValue,
        thumbTwo: settings.thumbTwoValue,
      });
    }
  }

  setThumbsValues(thumbs: IThumbsValues): void {
    const thumbOnePos = this.thumbValueToPos(thumbs.thumbOne);
    const thumbTwoPos = this.thumbValueToPos(thumbs.thumbTwo);
    this.updateThumbsState({ thumbOne: thumbOnePos, thumbTwo: thumbTwoPos });
  }

  getMin(): number {
    return this.min;
  }

  getMax(): number {
    return this.max;
  }

  getStep(): number {
    return this.step;
  }

  getScaleState(): boolean {
    return this.scale;
  }

  getPopUpsState(): boolean {
    return this.popUps;
  }

  getType(): string {
    return this.type;
  }

  getOrientation(): string {
    return this.orientation;
  }

  /**
   * Возвращает объект с параметрами для прогрессбара
   * @returns {IProgressBarParams} - Объект с позицией и размерами прогрессбара
   */
  getProgressBarParams(): IProgressBarParams {
    const thumbOnePos = this.thumbValueToPos(this.thumbOneValue);
    const thumbTwoPos = this.thumbValueToPos(this.thumbTwoValue);
    const size = { ...this.sliderSize };
    const position = { left: 0, top: 0 };
    let start = 0;
    let end = 0;

    if (this.type === 'single') {
      end =
        this.posByOrientation(thumbOnePos) +
        this.sizeByOrientation(this.thumbSize);
    } else {
      start = this.posByOrientation(thumbOnePos);
      end =
        this.posByOrientation(thumbTwoPos) -
        this.posByOrientation(thumbOnePos) +
        this.sizeByOrientation(this.thumbSize);
    }

    if (this.orientation === 'horizontal') {
      position.left = start;
      size.width = end;
    } else {
      position.top = start;
      size.height = end;
    }

    return { position, size };
  }

  /**
   * Возврат объекта с позициями бегунков
   * @returns {IThumbsPositions} - объект с позициями бегунков относительно левого и вернего края
   * родительского контейнера
   */
  getThumbsPos(): IThumbsPositions {
    return {
      thumbOne: this.thumbValueToPos(this.thumbOneValue),
      thumbTwo: this.thumbValueToPos(this.thumbTwoValue),
    };
  }

  /**
   * Возвращает объект с параметрами для попапов
   * @returns {IPopUps} - объект с позицииями и значениями попапов
   */
  getPopUpsParams(): IPopUps {
    return {
      popUpOne: {
        value: this.thumbOneValue,
        position: this.getPopUpPosition(
          this.thumbValueToPos(this.thumbOneValue)
        ),
      },
      popUpTwo: {
        value: this.thumbTwoValue,
        position: this.getPopUpPosition(
          this.thumbValueToPos(this.thumbTwoValue)
        ),
      },
    };
  }

  getThumbsValues(): IThumbsValues {
    return { thumbOne: this.thumbOneValue, thumbTwo: this.thumbTwoValue };
  }

  /**
   * Обновление состояния бегунков и оповещение наблюдателей об изменении
   * @param {IThumbsPositions} positions - текущая позиция бегунков
   */
  updateThumbsState(positions: IThumbsPositions): void {
    const thumbOneValue = this.valueWithStep(
      this.posByOrientation(positions.thumbOne)
    );
    let thumbTwoValue: null | number = null;

    if (positions.thumbTwo !== null) {
      thumbTwoValue = this.valueWithStep(
        this.posByOrientation(positions.thumbTwo)
      );
    }

    if (this.isCorrectThumbsPos(thumbOneValue, thumbTwoValue)) {
      this.thumbOneValue = thumbOneValue;
      if (thumbTwoValue !== null) {
        this.thumbTwoValue = thumbTwoValue;
      }
    }

    this.notify('thumbsPosIsUpdated');
  }

  /**
   * Проверка корректности значений ползунков
   * @param {number} thumbOneValue - зачение первого бегунка
   * @param {number} thumbTwoValue - значение второго бегунка
   * @returns {boolean} - значение отображающее корректность начений бегунков
   */
  private isCorrectThumbsPos(
    thumbOneValue: number,
    thumbTwoValue: number | null
  ): boolean {
    let result = true;

    if (thumbTwoValue !== null) {
      result =
        thumbOneValue <= thumbTwoValue &&
        thumbOneValue >= this.min &&
        thumbTwoValue <= this.max;
    } else {
      result = thumbOneValue >= this.min && thumbOneValue <= this.max;
    }

    return result;
  }

  /**
   * Возвращает позицию попапа
   * @param {IPosition} thumbPosition - объект с позицией бегунка,
   * рядом с которым будет распологаться попап
   * @returns {IPosition} - объект с позицией попапа
   */
  private getPopUpPosition(thumbPosition: IPosition): IPosition {
    let left = 0;
    let top = 0;

    if (this.orientation === 'horizontal') {
      left = thumbPosition.left + this.thumbSize.width / 2;
    } else {
      top = thumbPosition.top + this.thumbSize.height / 2;
    }

    return { left, top };
  }

  /**
   * Возвращение значение бегунка в соответствии с заданным шагом исходя из
   * его позиции
   * @param {number} position - позиция бегунка относительно левого или верхнего
   * края родительского контейнера
   * @returns {number} - значение бегунка в соответствии с заданным шагом
   */
  private valueWithStep(position: number): number {
    const stepSize = this.getStepSize();
    const newPosition = Math.round(position / stepSize) * stepSize;

    return this.thumbPosToValue(newPosition);
  }

  /**
   * Возваращает количество шагов бегунка
   * @returns {number} - количество шагов бегунка
   */
  private getStepsCount(): number {
    return (this.max - this.min) / this.step;
  }

  /**
   * Возвращает размер одного шага бегунка
   * @returns {number} - размер одного шага бегунка
   */
  private getStepSize(): number {
    const stepsCount = this.getStepsCount();
    return (
      (this.sizeByOrientation(this.sliderSize) -
        this.sizeByOrientation(this.thumbSize)) /
      stepsCount
    );
  }

  /**
   * Возвращение значения бегунка исходя из его позиции
   * @param {number} position - позиция бегунка относительно левого или верхнего
   * края родительского контейнера
   * @returns {number} - значение бегунка
   */
  private thumbPosToValue(position: number): number {
    const pixelsPerValue = this.getPxPerValue();

    return Math.round(
      this.min +
        ((this.max - this.min) / 100) * Math.round(position / pixelsPerValue)
    );
  }

  /**
   * Возвращение позиции бегунка исходя из его значения
   * @param {number} value - значение бегунка
   * @returns {IThumbPosition} - объект с позицией бегунка относительно левого и вернего края
   * родительского контейнера
   */
  private thumbValueToPos(value: number): IPosition {
    const position = { left: 0, top: 0 };
    const pxPerVal = this.getPxPerValue();
    let thumbValue = value;

    if (thumbValue < this.min) {
      thumbValue = this.min;
    } else if (thumbValue > this.max) {
      thumbValue = this.max;
    }

    const posValue =
      this.min + ((this.max - this.min) / 100) * thumbValue * pxPerVal * 100;

    if (this.orientation === 'horizontal') {
      position.left = posValue;
    } else {
      position.top = posValue;
    }

    return position;
  }

  /**
   * Возвращает количество пикселей в единице ширины слайдера, с вычетом крайних зон
   * @returns {number} - количество пикселей в единице ширины слайдера
   */
  private getPxPerValue(): number {
    if (this.orientation === 'horizontal') {
      return (this.sliderSize.width - this.thumbSize.width) / 100;
    }

    return (this.sliderSize.height - this.thumbSize.height) / 100;
  }

  /**
   * Возвращение ширины или высоты объекта, в зависимости от ориентации слайдера
   * @param {ISize} size - объект с шириной и высотой объекта
   * @returns {number} - значение ширины или высоты объекта
   */
  private sizeByOrientation(size: ISize): number {
    if (this.orientation === 'horizontal') {
      return size.width;
    }

    return size.height;
  }

  /**
   * Возвращение левого или верхнего отступа объекта, в зависимости от ориентации слайдера
   * @param {IPosition} position - объект с позицией
   * @returns {number} - значение левого или верхнего отступа объекта
   */
  private posByOrientation(position: IPosition): number {
    if (this.orientation === 'horizontal') {
      return position.left;
    }

    return position.top;
  }

  getScalePoints(scalePointSize: ISize): IScalePointParams[] {
    const scaleParams = [];
    const stepsCount = this.getStepsCount();
    const stepSize: number = this.getStepSize();
    let prevPointPos = 0;

    let position =
      this.sizeByOrientation(this.thumbSize) / 2 -
      this.sizeByOrientation(scalePointSize) / 2;

    const scalePointsCount = stepsCount + 1;

    for (let i = 0; i <= Math.round(scalePointsCount - 1); i += 1) {
      const pointValue = this.thumbPosToValue(
        position -
          this.sizeByOrientation(this.thumbSize) / 2 +
          this.sizeByOrientation(scalePointSize) / 2
      );

      if (i === 0 || this.isPointFits(position, prevPointPos, scalePointSize)) {
        const pointPos = { left: 0, top: 0 };
        const paddings = { left: 0, top: 0 };
        if (this.orientation === 'horizontal') {
          pointPos.left = position;
          paddings.top = this.thumbSize.height;
        } else {
          pointPos.top = position;
          paddings.left = this.thumbSize.width;
        }

        scaleParams.push({
          position: pointPos,
          paddings,
          size: scalePointSize,
          value: pointValue,
        });

        prevPointPos = position;
      }

      position += stepSize;
    }
    return scaleParams;
  }

  /**
   * Проверяет момещается ли точка на шкале без пересечения других точек, если нет, то она
   * не добавляется на шкалу
   */
  private isPointFits(
    pointPos: number,
    prevpointPos: number,
    scalePointSize: ISize
  ): boolean {
    return pointPos - prevpointPos - 2 > this.sizeByOrientation(scalePointSize);
  }
}

export default SimpleSliderModel;
