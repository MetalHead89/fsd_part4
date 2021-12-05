/* eslint-disable operator-linebreak */

import {
  ISimpleJsSliderModel,
  ISliderSettings,
  IThumbsValues,
  IPointParams,
  IThumbsParams,
  IThumbsPositions,
  ModelEvents,
} from '../interfaces';
import Observer from '../observer/Observer';

class SimpleJsSliderModel extends Observer<ModelEvents> implements ISimpleJsSliderModel {
  private orientation = 'horizontal';
  private type = 'range';
  private isScale = true;
  private isPopUps = true;
  private min = 0;
  private max = 10;
  private step = 1;
  private thumbOneValue = 3;
  private thumbTwoValue = 7;

  constructor(settings: ISliderSettings) {
    super();
    this.updateSliderSettings(settings);
  }

  updateThumbsValues({ thumbOne, thumbTwo }: IThumbsPositions): void {
    const thumbOnePosition = this.getThumbPositionByStep(thumbOne);
    this.thumbOneValue = this.getThumbValue(thumbOnePosition);

    const thumbTwoPosition = thumbTwo !== null ? this.getThumbPositionByStep(thumbTwo) : null;
    this.thumbTwoValue =
      thumbTwoPosition !== null ? this.getThumbValue(thumbTwoPosition) : this.thumbTwoValue;

    this.notify('modelIsUpdated', this.getSliderSettings());
  }

  getSliderSettings(): ISliderSettings {
    return {
      orientation: this.orientation,
      type: this.type,
      isScale: this.isScale,
      isPopUps: this.isPopUps,
      min: this.min,
      max: this.max,
      step: this.step,
      thumbOneValue: this.thumbOneValue,
      thumbTwoValue: this.thumbTwoValue,
    };
  }

  updateSliderSettings(settings: ISliderSettings): void {
    this.orientation = settings.orientation;
    this.type = settings.type;
    this.isScale = settings.isScale;
    this.isPopUps = settings.isPopUps;
    this.updateMinValue(settings.min);
    this.updateMaxValue(settings.max);
    this.updateStep(settings.step);
    this.thumbOneValue = this.getCorrectValue(settings.thumbOneValue);
    this.thumbTwoValue = this.getCorrectValue(settings.thumbTwoValue);

    if (this.thumbOneValue > this.thumbTwoValue) {
      [this.thumbOneValue, this.thumbTwoValue] = [this.thumbTwoValue, this.thumbOneValue];
    }

    this.notify('settingsIsUpdated', this.getSliderSettings());
  }

  getThumbsPositions(): IThumbsParams {
    return {
      thumbOne: {
        position: this.valueToPosition(this.thumbOneValue),
        value: this.thumbOneValue,
      },
      thumbTwo: {
        position: this.valueToPosition(this.thumbTwoValue),
        value: this.thumbTwoValue,
      },
    };
  }

  getThumbValues(): IThumbsValues {
    return {
      thumbOne: this.thumbOneValue,
      thumbTwo: this.thumbTwoValue,
    };
  }

  getPointsParams(): IPointParams[] {
    const pointsParams = [];
    for (let current = this.min; current <= this.max; current += 1) {
      pointsParams.push({
        value: current,
        position: this.valueToPosition(current),
      });
    }

    return pointsParams;
  }

  private getCorrectValue(value: number): number {
    if (value >= this.min && value <= this.max) {
      return value;
    }

    return value < this.min ? this.min : this.max;
  }

  private getThumbPositionByStep(position: number): number {
    const stepCount = (this.max - this.min) / this.step;
    const stepPercent = 100 / stepCount;

    const newPosition = Math.round(position / stepPercent) * stepPercent;

    return this.getThumbValue(newPosition) > this.max || this.getThumbValue(position) >= this.max
      ? this.valueToPosition(this.max)
      : newPosition;
  }

  private valueToPosition(value: number): number {
    const stepCount = (this.max - this.min) / this.step;
    const stepPercent = 100 / stepCount;

    return ((value - this.min) / this.step) * stepPercent;
  }

  private getThumbValue(position: number): number {
    const stepCount = (this.max - this.min) / this.step;
    const stepPercent = 100 / stepCount;

    return Math.round((position / stepPercent) * this.step) + this.min;
  }

  private updateMinValue(value: number): void {
    this.min = value < this.max ? value : this.min;
  }

  private updateMaxValue(value: number): void {
    this.max = value > this.min ? value : this.max;
  }

  private updateStep(value: number): void {
    const stepsCount = this.max - this.min;
    this.step = value > 0 && value <= stepsCount ? value : this.step;
  }
}

export default SimpleJsSliderModel;
