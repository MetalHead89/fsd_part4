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
  ISubject,
} from '../interfaces';
import Subject from '../subject/subject';

class SimpleSliderModel implements ISimpleSliderModel {
  subject: ISubject;
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
    this.subject = new Subject();
    this.refreshSliderState(settings);
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
      this.subject.notify('orientationIsUpdated');
    }
    if (this.type !== settings.type) {
      this.type = settings.type;
      if (this.typeIsRangeAndSecondThumbValueLessThanFirst()) {
        this.thumbTwoValue = this.thumbOneValue;
      }
      this.subject.notify('typeIsUpdated');
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
      this.subject.notify('scaleStateIsUpdated');
    }
    if (this.popUps !== settings.popUps) {
      this.popUps = settings.popUps;
      this.subject.notify('popUpsStateIsUpdated');
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
   * Возвращает истину, если тип слайдера - диапазон и значение второго
   * бегунка меньше значения первого
   * @returns {boolean} - результат вычисления логического выражения
   */
  private typeIsRangeAndSecondThumbValueLessThanFirst(): boolean {
    return this.type === 'range' && this.thumbTwoValue < this.thumbOneValue;
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

    if (
      SimpleSliderModel.valueTwoIsNullOrMoreOrEqualThenValueOne(
        thumbOneValue,
        thumbTwoValue
      )
    ) {
      this.thumbOneValue = thumbOneValue;
      if (thumbTwoValue !== null) {
        this.thumbTwoValue = thumbTwoValue;
      }
    }

    this.subject.notify('thumbsPosIsUpdated');
  }

  /**
   * Возвращает истину, значение второго равно нулю или меньше либо равно значению первого
   * @returns {boolean} - результат вычисления логического выражения
   */
  private static valueTwoIsNullOrMoreOrEqualThenValueOne(
    valueOne: number,
    valueTwo: number | null
  ): boolean {
    return valueTwo === null || valueOne <= valueTwo;
  }

  /**
   * Устанавливает размер слайдера
   * @param {ISize} size - объект с шириной и высотой слайдера
   */
  setSliderSize(size: ISize): void {
    this.sliderSize = SimpleSliderModel.getCorrectSize(size, 0);
  }

  /**
   * Устанавливает размер бегунков
   * @param {ISize} size - объект с шириной и высотой бегунка
   */
  setThumbSize(size: ISize): void {
    this.thumbSize = SimpleSliderModel.getCorrectSize(size, 0);
  }

  /**
   * Сохраняет значения бегунков
   * @param {IThumbsValues} thumbs - объект со значениями бегунков
   */
  setThumbsValues(thumbs: IThumbsValues): void {
    const thumbOnePos = this.thumbValueToPos(thumbs.thumbOne);
    let thumbTwoPos = null;
    if (this.type === 'range') {
      thumbTwoPos = this.thumbValueToPos(thumbs.thumbTwo);
    }
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
   * @returns {boolean} - состояние шкалы
   */
  getScaleState(): boolean {
    return this.scale;
  }

  /**
   * Возвращает состояние всплывающих подсказок (выключены или отключены)
   * @returns {boolean} - состояние всплывающих подсказок над бегунками
   */
  getPopUpsState(): boolean {
    return this.popUps;
  }

  /**
   * Возвращает тип слайдера (одиночный или диапазон)
   * @returns {string} - тип слайдера
   */
  getType(): string {
    return this.type;
  }

  /**
   * Возвращает ориентацию слайдера (горизонтальный или вертикальный)
   * @returns {string} - ориентация слайдера
   */
  getOrientation(): string {
    return this.orientation;
  }

  /**
   * Возвращает объект с параметрами для прогресс-бара
   * @returns {IProgressBarParams} - Объект с позицией и размерами прогресс-бара
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
   * @returns {IThumbsPositions} - объект с позициями бегунков относительно левого и верхнего края
   * родительского контейнера
   */
  getThumbsPos(): IThumbsPositions {
    return {
      thumbOne: this.thumbValueToPos(this.thumbOneValue),
      thumbTwo: this.thumbValueToPos(this.thumbTwoValue),
    };
  }

  /**
   * Возвращает объект с параметрами для всплывающих подсказок
   * @returns {IPopUps} - объект с позициями и значениями всплывающих подсказок
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

  /**
   * Возвращает объект с текущими значениями бегунков
   * @returns {IThumbsValues} - объект со значениями бегунков
   */
  getThumbsValues(): IThumbsValues {
    return { thumbOne: this.thumbOneValue, thumbTwo: this.thumbTwoValue };
  }

  /**
   * Возвращает массив объектов с настройками делений шкалы
   * @param {ISize} scalePointSize - объект с размерами шкалы
   * @returns {IScalePointParams[]} - массив объектов с настройками делений шкалы
   */
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

      position = this.getNextScalePointPos(position, scalePointSize);

      if (this.isPointFits(i, position, prevPointPos, scalePointSize)) {
        const pointPos = { left: 0, top: 0 };
        if (this.orientation === 'horizontal') {
          pointPos.left = position;
        } else {
          pointPos.top = position;
        }

        scaleParams.push({
          position: pointPos,
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
   * Пересчитывает значение шага. Если текущее значение шага больше максимально-допустимого
   * количества шагов в слайдере, то оно приравнивается к максимально-допустимому количеству шагов
   */
  recalculateStep(): void {
    const stepsCount = this.max - this.min;
    this.step = this.step > stepsCount ? stepsCount : this.step;
  }

  /**
   * Проверяет помещается ли точка на шкале без пересечения с другими точками, если нет, то она
   * не добавляется на шкалу
   * @param {number} index - индекс точки
   * @param {number} pointPos - текущая позиция точки
   * @param {number} prevPointPos - позиция предыдущей точки
   * @param {ISize} scalePointSize - объект с размером точки
   * @returns {boolean} - результат логического выражения
   */
  private isPointFits(
    index: number,
    pointPos: number,
    prevPointPos: number,
    scalePointSize: ISize
  ): boolean {
    return (
      index === 0 ||
      pointPos - prevPointPos > this.sizeByOrientation(scalePointSize)
    );
  }

  /**
   * Сохраняет значение бегунка, ближайшего к месту клика по шкале, либо треку
   * @param {IPosition} clickPosition - объект с позицией клика
   */
  setThumbPosOnClickPos(clickPosition: IPosition): void {
    const position = {
      left: clickPosition.left - this.thumbSize.width / 2,
      top: clickPosition.top - this.thumbSize.height / 2,
    };
    let thumbOne = this.thumbOneValue;
    let thumbTwo = this.thumbTwoValue;

    if (this.thumbTwoIsNearToClick(position)) {
      thumbTwo = this.thumbPosToValue(this.posByOrientation(position));
    } else {
      thumbOne = this.thumbPosToValue(this.posByOrientation(position));
    }

    this.setThumbsValues({ thumbOne, thumbTwo });
  }

  /**
   * Вычисляет, находится ли второй бегунок ближе к месту клика по шкале или треку
   * @param {IPosition} position - объект с позицией клика
   * @returns {boolean} - значение показывающее истинность того, что второй бегунок находится ближе
   * к месту клика, чем первый
   */
  private thumbTwoIsNearToClick(position: IPosition): boolean {
    if (this.type === 'range') {
      return (
        Math.abs(
          this.posByOrientation(position) -
            this.posByOrientation(this.thumbValueToPos(this.thumbTwoValue))
        ) <
        Math.abs(
          this.posByOrientation(position) -
            this.posByOrientation(this.thumbValueToPos(this.thumbOneValue))
        )
      );
    }

    return false;
  }

  /**
   * Возвращает корректный размер в соответствии с заданным минимумом
   * @param {ISize} size - объект с шириной и высотой
   * @param {number} min - минимальное значение ширины и высоты
   * @returns {ISize} - объект с корректными размерами
   */
  private static getCorrectSize(size: ISize, min: number): ISize {
    const width = size.width >= min ? size.width : min;
    const height = size.height >= min ? size.height : min;
    return { width, height };
  }

  /**
   * Возвращает позицию всплывающей подсказки
   * @param {IPosition} thumbPosition - объект с позицией бегунка,
   * рядом с которым будет располагаться всплывающая подсказка
   * @returns {IPosition} - объект с позицией всплывающей подсказки
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
   * Устанавливает минимальное значение слайдера
   * @param {number} value - новое значение минимума
   */
  private updateMinValue(value: number): void {
    this.min = value < this.max ? value : this.min;
    this.subject.notify('minIsUpdated');
  }

  /**
   * Устанавливает максимальное значение слайдера
   * @param {number} value - новое значение максимума
   */
  private updateMaxValue(value: number): void {
    this.max = value > this.min ? value : this.max;
    this.subject.notify('maxIsUpdated');
  }

  /**
   * Устанавливает размер шага бегунка
   * @param {number} value - новое значение шага
   */
  private updateStep(value: number): void {
    const stepsCount = this.max - this.min;
    this.step = value > 0 && value <= stepsCount ? value : this.step;
    this.subject.notify('stepIsUpdated');
  }

  /**
   * Возвращение значение бегунка в соответствии с заданным шагом исходя из
   * его позиции
   * @param {number} position - позиция бегунка относительно левого или верхнего
   * края родительского контейнера
   * @returns {number} - значение бегунка в соответствии с заданным шагом
   */
  private valueWithStep(position: number): number {
    if (this.thumbPosToValue(position) >= this.max) {
      return this.thumbPosToValue(position);
    }

    const stepSize = this.getStepSize();
    const newPosition = Math.round(position / stepSize) * stepSize;

    return this.thumbPosToValue(newPosition);
  }

  /**
   * Возвращает количество шагов бегунка
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
        ((this.max - this.min) / this.max) * (position / pixelsPerValue)
    );

    newValue = newValue < this.min ? this.min : newValue;
    newValue = newValue > this.max ? this.max : newValue;

    return newValue;
  }

  /**
   * Возвращение позиции бегунка исходя из его значения
   * @param {number} value - значение бегунка
   * @returns {IThumbPosition} - объект с позицией бегунка относительно левого и верхнего края
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
      ((thumbValue - this.min) / (this.max - this.min)) * pxPerVal * this.max;

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
      this.max
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

  /**
   * Возвращает позицию следующего деления шкалы
   * @param {number} position - позиция последнего деления
   * @param {ISize} pointSize - объект с размерами деления
   * @returns {number} - позиция следующего деления
   */
  private getNextScalePointPos(position: number, pointSize: ISize): number {
    let newPosition = position;

    const extremePosition =
      this.sizeByOrientation(this.sliderSize) -
      this.sizeByOrientation(this.thumbSize) / 2 -
      this.sizeByOrientation(pointSize) / 2;

    if (newPosition > extremePosition) {
      newPosition = extremePosition;
    }

    return newPosition;
  }
}

export default SimpleSliderModel;
