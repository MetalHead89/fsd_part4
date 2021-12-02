/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

import {
  IPointParams,
  IPosition,
  ISimpleJsSliderView,
  ISize,
  ISliderMargins,
  IThumbsParams,
  IThumbsPositions,
  IThumbsValues,
  IObserver,
  IFullThumbsPositions,
} from '../interfaces';

import Slider from './Slider/Slider';
import Track from './Track/Track';
import Thumb from './Thumb/Thumb';
import PopUp from './PopUp/PopUp';
import ProgressBar from './ProgressBar/ProgressBar';
import Scale from './Scale/Scale';
import Observer from '../observer/Observer';

class SimpleJsSliderView implements ISimpleJsSliderView {
  observer: IObserver;
  private slider: Slider;
  private sliderWrapper: HTMLDivElement;
  private track: Track;
  private thumbOne: Thumb;
  private thumbTwo: Thumb | null;
  private popUpOne: PopUp | null;
  private popUpTwo: PopUp | null;
  private progressBar: ProgressBar;
  private scale: Scale | null;
  private orientation: string;

  constructor(wrapper: HTMLDivElement) {
    this.observer = new Observer();
    this.sliderWrapper = wrapper;
    this.slider = new Slider();
    this.track = new Track();
    this.thumbOne = new Thumb();
    this.thumbTwo = new Thumb();
    this.popUpOne = new PopUp();
    this.popUpTwo = new PopUp();
    this.progressBar = new ProgressBar();
    this.scale = new Scale();
    this.orientation = 'horizontal';

    this.bindContext();
    this.init();
    this.subscribeToEventsNew();
  }

  moveThumbs({ thumbOne, thumbTwo }: IThumbsParams): void {
    const thumbOnePosition = this.getFullPosition(thumbOne.position);
    this.thumbOne.moveTo(
      this.calculateThumbPosition(this.thumbOne, thumbOnePosition)
    );

    if (this.thumbTwo) {
      const thumbTwoPosition = this.getFullPosition(thumbTwo.position);
      this.thumbTwo.moveTo(
        this.calculateThumbPosition(this.thumbTwo, thumbTwoPosition)
      );
    }

    this.updatePopUps({ thumbOne: thumbOne.value, thumbTwo: thumbTwo.value });

    if (this.thumbTwo && thumbOne.position > thumbTwo.position) {
      this.swapThumbs();
    }
  }

  updatePopUps(values: IThumbsValues): void {
    if (this.popUpOne && this.thumbOne) {
      this.popUpOne.update({
        value: values.thumbOne,
        position: this.getPopUpPosition(this.thumbOne),
      });
    }

    if (this.popUpTwo && this.thumbTwo) {
      this.popUpTwo.update({
        value: values.thumbTwo,
        position: this.getPopUpPosition(this.thumbTwo),
      });
    }
  }

  updateProgressBar(): void {
    const thumbOnePosition = this.thumbOne.getPosition();
    const thumbTwoPosition = this.thumbTwo ? this.thumbTwo.getPosition() : null;
    const position = { left: 0, top: 0 };
    const size = this.slider.getSize();
    let start = 0;
    let end = 0;

    if (this.thumbTwo && thumbTwoPosition) {
      start = this.positionByOrientation(thumbOnePosition);
      end =
        this.positionByOrientation(thumbTwoPosition) -
        this.positionByOrientation(thumbOnePosition) +
        this.sizeByOrientation(this.thumbTwo.getSize());
    } else {
      end =
        this.positionByOrientation(thumbOnePosition) +
        this.sizeByOrientation(this.thumbOne.getSize());
    }

    if (this.orientation === 'horizontal') {
      position.left = start;
      size.width = end;
    } else {
      position.top = start;
      size.height = end;
    }

    this.progressBar.update({ position, size });
  }

  updateScale(pointsParams: IPointParams[]): void {
    if (!this.scale) {
      return;
    }

    this.disableScale();
    this.enableScale();

    const pointSize = this.scale.getPointSize(
      pointsParams[pointsParams.length - 1].value
    );
    const visiblePoints = this.getVisiblePoints(
      pointsParams,
      this.sizeByOrientation(pointSize)
    );

    const points = visiblePoints.map((point) => ({
      position: this.calculateScalePointPosition(
        pointSize,
        this.getFullPosition(point.position)
      ),
      size: pointSize,
      value: point.value,
    }));

    this.scale.addPoints(points);
    this.slider.setMargins(this.getMargins());
  }

  switchOrientation(orientation: string): void {
    this.orientation = orientation;
    this.slider.resetMargins();
    this.slider.setOrientation(orientation);
    this.track.setOrientation(orientation);
    this.thumbOne.setOrientation(orientation);
    this.thumbTwo?.setOrientation(orientation);
    this.popUpOne?.setOrientation(orientation);
    this.popUpTwo?.setOrientation(orientation);
    this.progressBar.setOrientation(orientation);
    this.scale?.setOrientation(orientation);
  }

  switchToSingle(): void {
    this.thumbTwo?.remove();
    this.thumbTwo = null;
    this.popUpTwo?.remove();
    this.popUpTwo = null;
  }

  switchToRange(): void {
    if (this.thumbTwo === null) {
      this.thumbTwo = new Thumb(this.orientation);
      this.slider.append(this.thumbTwo.getControl());

      if (this.popUpOne) {
        this.popUpTwo = new PopUp(this.orientation);
        this.slider.append(this.popUpTwo.getControl());
      }

      this.thumbTwo?.observer.register(
        'thumbIsDragged',
        this.updateThumbsPositions
      );
    }
  }

  disablePopUps(): void {
    this.popUpOne?.remove();
    this.popUpOne = null;
    this.popUpTwo?.remove();
    this.popUpTwo = null;

    this.slider.setMargins(this.getMargins());
  }

  enablePopUps(): void {
    if (this.popUpOne === null) {
      this.popUpOne = new PopUp(this.orientation);
      this.slider.append(this.popUpOne.getControl());
    }

    if (this.thumbTwoIsWithoutPopup()) {
      this.popUpTwo = new PopUp(this.orientation);
      this.slider.append(this.popUpTwo.getControl());
    }

    this.slider.setMargins(this.getMargins());
  }

  disableScale(): void {
    this.scale?.remove();
    this.scale = null;

    this.slider.setMargins(this.getMargins());
  }

  enableScale(): void {
    if (this.scale) {
      this.scale?.remove();
    }
    this.scale = new Scale(this.orientation);
    this.scale.observer.register('clickToScale', (args: IPosition) =>
      this.setThumbPositionOnClickPosition(args)
    );
    this.slider.append(this.scale.getControl());

    this.slider.setMargins(this.getMargins());
  }

  getThumbSize(): ISize {
    return this.thumbOne.getSize();
  }

  getSliderSize(): ISize {
    return this.slider.getSize();
  }

  getThumbsPositions(): IFullThumbsPositions {
    const thumbOne = this.thumbOne.getPosition();
    const thumbTwo = this.thumbTwo ? this.thumbTwo.getPosition() : null;

    return { thumbOne, thumbTwo };
  }

  updateThumbs(thumbsPositions: IFullThumbsPositions): void {
    this.thumbOne.moveTo(thumbsPositions.thumbOne);
    if (thumbsPositions.thumbTwo) {
      this.thumbTwo?.moveTo(thumbsPositions.thumbTwo);
    }
  }

  getTrackClickPosition(): IPosition {
    return this.track.getPosition();
  }

  getScaleClickPosition(): IPosition {
    const position =
      this.scale === null ? { left: 0, top: 0 } : this.scale.getPosition();
    return position;
  }

  private getFullPosition(position: number): IPosition {
    const isOrientationHorizontal = this.orientation === 'horizontal';

    return {
      left: isOrientationHorizontal ? position : 0,
      top: isOrientationHorizontal ? 0 : position,
    };
  }

  private bindContext(): void {
    this.updateThumbsPositions = this.updateThumbsPositions.bind(this);
    this.setThumbPositionOnClickPosition =
      this.setThumbPositionOnClickPosition.bind(this);
  }

  private subscribeToEventsNew(): void {
    this.thumbOne.observer.register(
      'thumbIsDragged',
      this.updateThumbsPositions
    );
    this.thumbTwo?.observer.register(
      'thumbIsDragged',
      this.updateThumbsPositions
    );
    this.scale?.observer.register('clickToScale', (args: IPosition) =>
      this.setThumbPositionOnClickPosition(args)
    );
    this.track.observer.register('clickToTrack', (args: IPosition) =>
      this.setThumbPositionOnClickPosition(args)
    );
  }

  private updateThumbsPositions() {
    const thumbs = this.getThumbsPercentPositions();
    this.notifyAboutThumbsDragged(thumbs.thumbOne, thumbs.thumbTwo);
  }

  private getThumbsPercentPositions(): IThumbsPositions {
    return {
      thumbOne: this.calculateThumbPercentPosition(
        this.thumbOne.getPosition(),
        this.thumbOne.getSize()
      ),
      thumbTwo: this.thumbTwo
        ? this.calculateThumbPercentPosition(
            this.thumbTwo.getPosition(),
            this.thumbTwo.getSize()
          )
        : null,
    };
  }

  private notifyAboutThumbsDragged(
    thumbOne: number,
    thumbTwo: number | null
  ): void {
    this.observer.notify('thumbIsDragged', {
      thumbOne,
      thumbTwo,
    });
  }

  private setThumbPositionOnClickPosition({ left, top }: IPosition): void {
    const thumbSize = this.thumbOne.getSize();
    const position = {
      left: left - thumbSize.width / 2,
      top: top - thumbSize.height / 2,
    };

    const percentPosition = this.calculateThumbPercentPosition(
      position,
      this.thumbOne.getSize()
    );
    const thumbs = { ...this.getThumbsPercentPositions() };

    if (this.thumbTwoIsNearToClick(position)) {
      thumbs.thumbTwo = percentPosition;
    } else {
      thumbs.thumbOne = percentPosition;
    }

    this.notifyAboutThumbsDragged(thumbs.thumbOne, thumbs.thumbTwo);
  }

  private thumbTwoIsNearToClick(position: IPosition): boolean {
    if (this.thumbTwo) {
      return (
        Math.abs(
          this.positionByOrientation(position) -
            this.positionByOrientation(this.thumbTwo.getPosition())
        ) <
        Math.abs(
          this.positionByOrientation(position) -
            this.positionByOrientation(this.thumbOne.getPosition())
        )
      );
    }

    return false;
  }

  private calculateThumbPercentPosition(
    position: IPosition,
    size: ISize
  ): number {
    const sliderSize = this.slider.getSize();
    const percentPosition = {
      left: (position.left * 100) / (sliderSize.width - size.width),
      top: (position.top * 100) / (sliderSize.height - size.height),
    };

    const positionByOrientation = this.positionByOrientation(percentPosition);

    if (positionByOrientation >= 0 && positionByOrientation <= 100) {
      return positionByOrientation;
    }

    return positionByOrientation < 0 ? 0 : 100;
  }

  private getPopUpPosition(thumb: Thumb): IPosition {
    const thumbPosition = this.positionByOrientation(thumb.getPosition());
    const popUpPosition =
      thumbPosition + this.sizeByOrientation(thumb.getSize()) / 2;

    return this.getFullPosition(popUpPosition);
  }

  private calculateThumbPosition(thumb: Thumb, position: IPosition): IPosition {
    const sliderSize = this.slider.getSize();
    const thumbSize = thumb.getSize();

    return {
      left: (position.left * (sliderSize.width - thumbSize.width)) / 100,
      top: (position.top * (sliderSize.height - thumbSize.height)) / 100,
    };
  }

  private calculateScalePointPosition(
    size: ISize,
    position: IPosition
  ): IPosition {
    const thumbPosition = this.calculateThumbPosition(this.thumbOne, position);
    const thumbSize = this.thumbOne.getSize();

    const newPosition =
      this.positionByOrientation(thumbPosition) +
      (this.sizeByOrientation(thumbSize) / 2 -
        this.sizeByOrientation(size) / 2);

    return this.getFullPosition(newPosition);
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

  private swapThumbs(): void {
    if (this.thumbTwo) {
      [this.thumbOne, this.thumbTwo] = [this.thumbTwo, this.thumbOne];
    }
  }

  private getVisiblePoints(
    pointsParams: IPointParams[],
    pointSize: number
  ): IPointParams[] {
    const scaleSize = this.sizeByOrientation(this.slider.getSize());
    const pointsAmount = pointsParams.length;
    const maxPointsAmount = Math.floor(scaleSize / pointSize);

    let divider = 1;

    if (maxPointsAmount < pointsAmount) {
      for (let points = maxPointsAmount; points > 2; points -= 1) {
        const emptyPointsAmount = pointsAmount - points;

        if (emptyPointsAmount % (points - 1) === 0) {
          divider = emptyPointsAmount / (points - 1) + 1;
          break;
        }
      }
    }

    return pointsParams.filter(
      (_, index) =>
        index === 0 || index === pointsAmount - 1 || index % divider === 0
    );
  }

  private init() {
    this.assembleSlider();
  }

  private thumbTwoIsWithoutPopup(): boolean {
    return this.popUpTwo === null && this.thumbTwo !== null;
  }

  private assembleSlider(): void {
    this.slider.append(this.track.getControl());
    this.slider.append(this.thumbOne.getControl());
    if (this.thumbTwo) {
      this.slider.append(this.thumbTwo.getControl());
    }
    if (this.popUpOne) {
      this.slider.append(this.popUpOne.getControl());
    }
    if (this.popUpTwo) {
      this.slider.append(this.popUpTwo.getControl());
    }
    this.slider.append(this.progressBar.getControl());
    if (this.scale) {
      this.slider.append(this.scale.getControl());
    }

    this.sliderWrapper.append(this.slider.getControl());
  }

  private getMargins(): ISliderMargins {
    const margins = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };

    const sliderRect = this.slider.getRect();
    const popUpRect = this.popUpOne ? this.popUpOne.getRect() : null;
    const scaleRect = this.scale ? this.scale.getRect() : null;

    if (this.orientation === 'horizontal') {
      if (popUpRect) {
        margins.top += sliderRect.top - popUpRect.top;
      }
      if (scaleRect) {
        margins.bottom += scaleRect.bottom - sliderRect.bottom;
      }
    } else {
      if (popUpRect) {
        margins.left += sliderRect.left - popUpRect.left;
      }
      if (scaleRect) {
        margins.right += scaleRect.right - sliderRect.right;
      }
    }

    return margins;
  }
}

export default SimpleJsSliderView;
