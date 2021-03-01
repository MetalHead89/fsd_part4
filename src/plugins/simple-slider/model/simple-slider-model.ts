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
  private thumbSize = { width: 20, height: 10 };

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

  /**
   * Устанавливает размер бегунков
   * @param {ISize} size - объект с шириной и высотой бегунка
   */
  setThumbSize(size: ISize): void {
    this.thumbSize = size;
  }

  /**
   * Полностью обновляет состояние модели в соответствии с полученным объектом
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
      this.updateMinValue(settings.min);
    }
    if (this.max !== settings.max) {
      this.updateMaxValue(settings.max);
    }
    if (this.step !== settings.step) {
      this.updateStep(settings.step);
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

  /**
   * Устанавливает минимальное значение слайдера
   * @param {number} value - новое значение минимума
   */
  private updateMinValue(value: number): void {
    let newMin = value;
    if (this.type === 'range' && newMin > this.max) {
      newMin = this.max;
    }
    this.min = newMin;
    this.notify('minIsUpdated');
  }

  /**
   * Устанавливает максимальное значение слайдера
   * @param {number} value - новое значение максимума
   */
  private updateMaxValue(value: number): void {
    let newMax = value;
    if (this.type === 'range' && newMax < this.min) {
      newMax = this.min;
    }
    this.max = newMax;
    this.notify('maxIsUpdated');
  }

  /**
   * Устанавливает размер шага бегунка
   * @param {number} value - новое значение шага
   */
  private updateStep(value: number): void {
    let newStep = value;
    if (newStep <= 0) {
      newStep = 1;
    }
    this.step = newStep;
    this.notify('stepIsUpdated');
  }

  /**
   * Сохраняет значения бегунков
   * @param {IThumbsValues} thumbs - объект со значениями бегунков
   */
  setThumbsValues(thumbs: IThumbsValues): void {
    const thumbOnePos = this.thumbValueToPos(thumbs.thumbOne);
    const thumbTwoPos = this.thumbValueToPos(thumbs.thumbTwo);
    this.updateThumbsState({ thumbOne: thumbOnePos, thumbTwo: thumbTwoPos });
  }

  /**
   * Возвращает минимальное значение слайдера
   * @returns {number} - минимальное значение
   */
  getMin(): number {
    return this.min;
  }

  /**
   * Возвращает максимальное значение слайдера
   * @returns {number} - максимальное значение
   */
  getMax(): number {
    return this.max;
  }

  /**
   * Возвращает шаг с которым перемещается бегунок
   * @returns {number} - значение шага
   */
  getStep(): number {
    return this.step;
  }

  /**
   * Возвращает состояние шкалы (выключена или включена)
   * @returns {number} - состояние шкалы
   */
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

    if (thumbTwoValue === null || thumbOneValue <= thumbTwoValue) {
      this.thumbOneValue = thumbOneValue;
      if (thumbTwoValue !== null) {
        this.thumbTwoValue = thumbTwoValue;
      }
    }

    this.notify('thumbsPosIsUpdated');
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

    let newValue = Math.round(
      this.min +
        ((this.max - this.min) / 100) * Math.round(position / pixelsPerValue)
    );

    newValue = newValue < this.min ? this.min : newValue;
    newValue = newValue > this.max ? this.max : newValue;

    return newValue;
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
      ((thumbValue - this.min) / (this.max - this.min)) * pxPerVal * 100;

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
    return (
      (this.sizeByOrientation(this.sliderSize) -
        this.sizeByOrientation(this.thumbSize)) /
      100
    );
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
