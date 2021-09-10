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
  private scalePointSize = { width: 0, height: 0 };

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
      if (this.rangeValuesIsCorrect()) {
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
  private rangeValuesIsCorrect(): boolean {
    return this.type === 'range' && this.thumbTwoValue < this.thumbOneValue;
  }

  /**
   * Обновление состояния бегунков и оповещение наблюдателей об изменении
   * @param {IThumbsPositions} positions - текущая позиция бегунков
   */
  updateThumbsState(positions: IThumbsPositions): void {
    const thumbOneValue = this.valueWithStep(
      this.positionByOrientation(positions.thumbOne)
    );
    let thumbTwoValue: null | number = null;

    if (positions.thumbTwo !== null) {
      thumbTwoValue = this.valueWithStep(
        this.positionByOrientation(positions.thumbTwo)
      );
    }

    if (
      SimpleSliderModel.secondValueIsIncorrect(thumbOneValue, thumbTwoValue)
    ) {
      this.thumbOneValue = thumbOneValue;
      if (thumbTwoValue !== null) {
        this.thumbTwoValue = thumbTwoValue;
      }
    }

    this.subject.notify('thumbsPositionsIsUpdated');
  }

  /**
   * Возвращает истину, если второе значение равно null или меньше либо равно первому значению
   * @returns {boolean} - результат вычисления логического выражения
   */
  private static secondValueIsIncorrect(
    valueOne: number,
    valueTwo: number | null
  ): boolean {
    return valueTwo === null || valueOne <= valueTwo;
  }

  setSliderSize(size: ISize): void {
    this.sliderSize = SimpleSliderModel.getCorrectSize(size, 0);
  }

  setThumbSize(size: ISize): void {
    this.thumbSize = SimpleSliderModel.getCorrectSize(size, 0);
  }

  setThumbsValues(thumbs: IThumbsValues): void {
    const thumbOnePosition = this.thumbValueToPosition(thumbs.thumbOne);
    let thumbTwoPosition = null;
    if (this.type === 'range') {
      thumbTwoPosition = this.thumbValueToPosition(thumbs.thumbTwo);
    }
    this.updateThumbsState({
      thumbOne: thumbOnePosition,
      thumbTwo: thumbTwoPosition,
    });
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

  getProgressBarParams(): IProgressBarParams {
    const thumbOnePosition = this.thumbValueToPosition(this.thumbOneValue);
    const thumbTwoPosition = this.thumbValueToPosition(this.thumbTwoValue);
    const size = { ...this.sliderSize };
    const position = { left: 0, top: 0 };
    let start = 0;
    let end = 0;

    if (this.type === 'single') {
      end =
        this.positionByOrientation(thumbOnePosition) +
        this.sizeByOrientation(this.thumbSize);
    } else {
      start = this.positionByOrientation(thumbOnePosition);
      end =
        this.positionByOrientation(thumbTwoPosition) -
        this.positionByOrientation(thumbOnePosition) +
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

  getThumbsPositions(): IThumbsPositions {
    return {
      thumbOne: this.thumbValueToPosition(this.thumbOneValue),
      thumbTwo: this.thumbValueToPosition(this.thumbTwoValue),
    };
  }

  getPopUpsParams(): IPopUps {
    return {
      popUpOne: {
        value: this.thumbOneValue,
        position: this.getPopUpPosition(
          this.thumbValueToPosition(this.thumbOneValue)
        ),
      },
      popUpTwo: {
        value: this.thumbTwoValue,
        position: this.getPopUpPosition(
          this.thumbValueToPosition(this.thumbTwoValue)
        ),
      },
    };
  }

  getThumbsValues(): IThumbsValues {
    return { thumbOne: this.thumbOneValue, thumbTwo: this.thumbTwoValue };
  }

  getScalePoints(): IScalePointParams[] {
    const scalePoints = [];
    const stepsCount = this.getStepsCount();
    const stepSize: number = this.getStepSize();
    const scalePointsCount = stepsCount + 1;
    let previousPointPosition = 0;

    let currentPointPosition =
      this.sizeByOrientation(this.thumbSize) / 2 -
      this.sizeByOrientation(this.scalePointSize) / 2;

    for (let i = 0; i <= Math.round(scalePointsCount - 1); i += 1) {
      const currentPointValue = this.thumbPositionToValue(
        currentPointPosition -
          this.sizeByOrientation(this.thumbSize) / 2 +
          this.sizeByOrientation(this.scalePointSize) / 2
      );

      currentPointPosition = this.getCorrectPointPosition(currentPointPosition);

      if (
        i === 0 ||
        this.pointsDoNotIntersect(currentPointPosition, previousPointPosition)
      ) {
        const fullPointPosition = { left: 0, top: 0 };
        if (this.orientation === 'horizontal') {
          fullPointPosition.left = currentPointPosition;
        } else {
          fullPointPosition.top = currentPointPosition;
        }

        scalePoints.push({
          position: fullPointPosition,
          size: this.scalePointSize,
          value: currentPointValue,
        });

        previousPointPosition = currentPointPosition;
      }

      currentPointPosition += stepSize;
    }
    return scalePoints;
  }

  setScalePointSize(size: ISize): void {
    this.scalePointSize = size;
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
   * @param {number} currentPosition - текущая позиция точки
   * @param {number} previousPosition - позиция предыдущей точки
   * @returns {boolean} - результат логического выражения
   */
  private pointsDoNotIntersect(
    currentPosition: number,
    previousPosition: number
  ): boolean {
    return (
      currentPosition - previousPosition >
      this.sizeByOrientation(this.scalePointSize)
    );
  }

  /**
   * Сохраняет значение бегунка, ближайшего к месту клика по шкале, либо треку
   * @param {IPosition} clickPosition - объект с позицией клика
   */
  setThumbPositionOnClickPosition(clickPosition: IPosition): void {
    const position = {
      left: clickPosition.left - this.thumbSize.width / 2,
      top: clickPosition.top - this.thumbSize.height / 2,
    };
    let thumbOne = this.thumbOneValue;
    let thumbTwo = this.thumbTwoValue;

    if (this.thumbTwoIsNearToClick(position)) {
      thumbTwo = this.thumbPositionToValue(
        this.positionByOrientation(position)
      );
    } else {
      thumbOne = this.thumbPositionToValue(
        this.positionByOrientation(position)
      );
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
          this.positionByOrientation(position) -
            this.positionByOrientation(
              this.thumbValueToPosition(this.thumbTwoValue)
            )
        ) <
        Math.abs(
          this.positionByOrientation(position) -
            this.positionByOrientation(
              this.thumbValueToPosition(this.thumbOneValue)
            )
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

  private updateMinValue(value: number): void {
    this.min = value < this.max ? value : this.min;
    this.subject.notify('minIsUpdated');
  }

  private updateMaxValue(value: number): void {
    this.max = value > this.min ? value : this.max;
    this.subject.notify('maxIsUpdated');
  }

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
    if (this.thumbPositionToValue(position) >= this.max) {
      return this.thumbPositionToValue(position);
    }

    const stepSize = this.getStepSize();
    const newPosition = Math.round(position / stepSize) * stepSize;

    return this.thumbPositionToValue(newPosition);
  }

  private getStepsCount(): number {
    return (this.max - this.min) / this.step;
  }

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
  private thumbPositionToValue(position: number): number {
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
  private thumbValueToPosition(value: number): IPosition {
    const position = { left: 0, top: 0 };
    const pxPerVal = this.getPxPerValue();
    let thumbValue = value;

    if (thumbValue < this.min) {
      thumbValue = this.min;
    } else if (thumbValue > this.max) {
      thumbValue = this.max;
    }

    const positionValue =
      ((thumbValue - this.min) / (this.max - this.min)) * pxPerVal * this.max;

    if (this.orientation === 'horizontal') {
      position.left = positionValue;
    } else {
      position.top = positionValue;
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
  private positionByOrientation(position: IPosition): number {
    if (this.orientation === 'horizontal') {
      return position.left;
    }

    return position.top;
  }

  /**
   * Отслеживает позицию деления, не давая ему выйти за пределы шкалы
   * @param {number} position - позиция деления шкалы
   * @returns {number} - позиция следующего деления
   */
  private getCorrectPointPosition(position: number): number {
    const extremePosition =
      this.sizeByOrientation(this.sliderSize) -
      this.sizeByOrientation(this.thumbSize) / 2 -
      this.sizeByOrientation(this.scalePointSize) / 2;

    if (position > extremePosition) {
      position = extremePosition;
    }

    return position;
  }
}

export default SimpleSliderModel;
