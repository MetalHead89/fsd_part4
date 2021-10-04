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
  private isScale = true;
  private isPopUps = true;
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

  refreshSliderState({
    orientation,
    type,
    isScale,
    isPopUps,
    min,
    max,
    step,
    thumbOneValue,
    thumbTwoValue,
    sliderSize,
    thumbSize,
  }: ISliderSettings): void {
    if (sliderSize !== undefined) {
      this.sliderSize = sliderSize;
    }
    if (thumbSize !== undefined) {
      this.thumbSize = thumbSize;
    }
    if (this.orientation !== orientation) {
      this.orientation = orientation;
      this.subject.notify('orientationIsUpdated');
    }
    if (this.type !== type) {
      this.type = type;
      if (this.rangeValuesIsCorrect()) {
        this.thumbTwoValue = this.thumbOneValue;
      }
      this.subject.notify('typeIsUpdated');
    }
    if (this.min !== min) {
      this.updateMinValue(min);
    }
    if (this.max !== max) {
      this.updateMaxValue(max);
    }
    if (this.step !== step) {
      this.updateStep(step);
    }
    if (this.isScale !== isScale) {
      this.isScale = isScale;
      this.subject.notify('scaleStateIsUpdated');
    }
    if (this.isPopUps !== isPopUps) {
      this.isPopUps = isPopUps;
      this.subject.notify('popUpsStateIsUpdated');
    }
    if (
      this.thumbOneValue !== thumbOneValue ||
      this.thumbTwoValue !== thumbTwoValue
    ) {
      this.setThumbsValues({
        thumbOne: thumbOneValue,
        thumbTwo: thumbTwoValue,
      });
    }
  }

  updateThumbsState({ thumbOne, thumbTwo }: IThumbsPositions): void {
    let thumbOneValue = this.valueWithStep(
      this.positionByOrientation(thumbOne)
    );
    let thumbTwoValue: null | number = null;

    if (thumbTwo) {
      thumbTwoValue = this.valueWithStep(this.positionByOrientation(thumbTwo));
    }

    if (thumbTwoValue !== null && thumbOneValue > thumbTwoValue) {
      this.subject.notify('thumbsSwapped');
      [thumbOneValue, thumbTwoValue] = [thumbTwoValue, thumbOneValue];
    }

    this.thumbOneValue = thumbOneValue;
    if (thumbTwoValue !== null) {
      this.thumbTwoValue = thumbTwoValue;
    }

    this.subject.notify('thumbsPositionsIsUpdated');
  }

  setSliderSize(size: ISize): void {
    this.sliderSize = SimpleSliderModel.getCorrectSize(size, 0);
  }

  setThumbSize(size: ISize): void {
    this.thumbSize = SimpleSliderModel.getCorrectSize(size, 0);
  }

  setThumbsValues({ thumbOne, thumbTwo }: IThumbsValues): void {
    const thumbOnePosition = this.thumbValueToPosition(thumbOne);
    const thumbTwoPosition =
      this.type === 'range' ? this.thumbValueToPosition(thumbTwo) : null;

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

  isScaleEnabled(): boolean {
    return this.isScale;
  }

  isPopUpsEnabled(): boolean {
    return this.isPopUps;
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

  recalculateStep(): void {
    const stepsCount = this.max - this.min;
    this.step = this.step > stepsCount ? stepsCount : this.step;
  }

  setThumbPositionOnClickPosition({ left, top }: IPosition): void {
    const position = {
      left: left - this.thumbSize.width / 2,
      top: top - this.thumbSize.height / 2,
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

  private pointsDoNotIntersect(
    currentPosition: number,
    previousPosition: number
  ): boolean {
    return (
      currentPosition - previousPosition >
      this.sizeByOrientation(this.scalePointSize)
    );
  }

  private rangeValuesIsCorrect(): boolean {
    return this.type === 'range' && this.thumbTwoValue < this.thumbOneValue;
  }

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

  private static getCorrectSize({ width, height }: ISize, min: number): ISize {
    width = width >= min ? width : min;
    height = height >= min ? height : min;
    return { width, height };
  }

  private getPopUpPosition({ left, top }: IPosition): IPosition {
    if (this.orientation === 'horizontal') {
      left += this.thumbSize.width / 2;
      top = 0;
    } else {
      left = 0;
      top += this.thumbSize.height / 2;
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

  private sizeByOrientation(size: ISize): number {
    if (this.orientation === 'horizontal') {
      return size.width;
    }

    return size.height;
  }

  private positionByOrientation({ left, top }: IPosition): number {
    if (this.orientation === 'horizontal') {
      return left;
    }

    return top;
  }

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
