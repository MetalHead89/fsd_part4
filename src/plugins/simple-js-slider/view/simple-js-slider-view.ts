/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */

import {
  IObserver,
  IPointParams,
  IPopUpParams,
  IPopUps,
  IPopUpsValues,
  IPosition,
  IProgressBarParams,
  IScalePointParams,
  ISimpleJsSliderView,
  ISize,
  ISliderMargins,
  // ISubject,
  // ISubjectEvents,
  IThumbsParams,
  IThumbsPositions,
  IThumbsValues,
} from '../interfaces';

import Slider from './slider/slider';
import Track from './track/track';
import Thumb from './thumb/thumb';
import PopUp from './pop-up/pop-up';
import ProgressBar from './progress-bar/progress-bar';
import Scale from './scale/scale';
// import Subject from '../subject/subject';
import { IObserverNew, IThumbsPositionsNew } from '../new-interfaces';
import ObserverNew from '../observer/observer';

class SimpleJsSliderView implements ISimpleJsSliderView {
  // subject: ISubject;
  observer: IObserverNew;
  private slider: Slider;
  private sliderWrapper: HTMLDivElement;
  private track: Track;
  private thumbOne: Thumb;
  private thumbTwo: Thumb | null;
  private popUpOne: PopUp | null;
  private popUpTwo: PopUp | null;
  private progressBar: ProgressBar;
  private scale: Scale | null;
  // private events: ISubjectEvents = {
  //   thumbIsDragged: () => this.subject.notify('thumbIsDragged'),
  //   clickToTrack: () => this.subject.notify('clickToTrack'),
  //   clickToScale: () => this.subject.notify('clickToScale'),
  // };

  constructor(wrapper: HTMLDivElement) {
    this.observer = new ObserverNew();
    // this.subject = new Subject();
    this.sliderWrapper = wrapper;

    this.slider = new Slider();
    this.track = new Track();
    this.thumbOne = new Thumb();
    this.thumbTwo = new Thumb();
    this.popUpOne = new PopUp();
    this.popUpTwo = new PopUp();
    this.progressBar = new ProgressBar();
    this.scale = new Scale();

    this.init();
    this.bindContext();
    this.subscribeToEventsNew();
  }

  //NEW_METHODS//
  moveThumbs({ thumbOne, thumbTwo }: IThumbsParams): void {
    const thumbOnePosition = this.getFullPosition(thumbOne.position);
    this.thumbOne.moveTo(this.calculateThumbPosition(this.thumbOne, thumbOnePosition));

    if (this.thumbTwo) {
      const thumbTwoPosition = this.getFullPosition(thumbTwo.position);
      this.thumbTwo.moveTo(this.calculateThumbPosition(this.thumbTwo, thumbTwoPosition));
    }

    // if (this.thumbTwo && thumbOne.position > thumbTwo.position) {
    //   this.swapThumbs();
    // }

    this.updatePopUps({ thumbOne: thumbOne.value, thumbTwo: thumbTwo.value });

    if (this.thumbTwo && thumbOne.position > thumbTwo.position) {
      this.swapThumbs();
    }
  }

  private getFullPosition(position: number): IPosition {
    const isOrientationHorizontal = this.slider.getOrientation() === 'horizontal';

    return {
      left: isOrientationHorizontal ? position : 0,
      top: isOrientationHorizontal ? 0 : position,
    };
  }

  private bindContext(): void {
    this.updateThumbsPositions = this.updateThumbsPositions.bind(this);
    this.setThumbPositionOnClickPosition = this.setThumbPositionOnClickPosition.bind(this);
    // this.notifyAboutThumbsDragged = this.notifyAboutThumbsDragged.bind(this);
  }

  private subscribeToEventsNew(): void {
    this.thumbOne.observer.register('thumbIsDragged', this.updateThumbsPositions);
    this.thumbTwo?.observer.register('thumbIsDragged', this.updateThumbsPositions);
    this.scale?.observer.register('clickToScale', (args: IPosition) =>
      this.setThumbPositionOnClickPosition(args)
    );
  }

  private updateThumbsPositions() {
    // const thumbOne = this.calculateThumbPercentPosition(
    //   this.thumbOne.getPosition(),
    //   this.thumbOne.getSize()
    // );
    // const thumbTwo = this.thumbTwo
    //   ? this.calculateThumbPercentPosition(this.thumbTwo.getPosition(), this.thumbTwo.getSize())
    //   : null;
    const thumbs = this.getThumbsPercentPositions();
    this.notifyAboutThumbsDragged(thumbs.thumbOne, thumbs.thumbTwo);
    // this.observer.notify('thumbIsDragged', {
    //   thumbOne,
    //   thumbTwo,
    // });
  }

  private getThumbsPercentPositions(): IThumbsPositionsNew {
    return {
      thumbOne: this.calculateThumbPercentPosition(
        this.thumbOne.getPosition(),
        this.thumbOne.getSize()
      ),
      thumbTwo: this.thumbTwo
        ? this.calculateThumbPercentPosition(this.thumbTwo.getPosition(), this.thumbTwo.getSize())
        : null,
    };
  }

  private notifyAboutThumbsDragged(thumbOne: number, thumbTwo: number | null): void {
    this.observer.notify('thumbIsDragged', {
      thumbOne,
      thumbTwo,
    });
  }

  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  private setThumbPositionOnClickPosition({ left, top }: IPosition): void {
    // const position = this.positionByOrientation(this.thumbOne.getPosition());
    const thumbSize = this.thumbOne.getSize();
    const position = {
      left: left - thumbSize.width / 2,
      top: top - thumbSize.height / 2,
    };
    // debugger;
    const percentPosition = this.calculateThumbPercentPosition(position, this.thumbOne.getSize());
    // let thumbOne = this.thumbOneValue;
    // let thumbTwo = this.thumbTwoValue;
    const thumbs = { ...this.getThumbsPercentPositions() };

    if (this.thumbTwoIsNearToClick(position)) {
      thumbs.thumbTwo = percentPosition;
      // thumbTwo = this.thumbPositionToValue(this.positionByOrientation(position));
    } else {
      thumbs.thumbOne = percentPosition;
      // thumbOne = this.thumbPositionToValue(this.positionByOrientation(position));
    }

    this.notifyAboutThumbsDragged(thumbs.thumbOne, thumbs.thumbTwo);

    // this.setThumbsValues({ thumbOne, thumbTwo });
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

  private calculateThumbPercentPosition(position: IPosition, size: ISize): number {
    // if (thumb === null) {
    //   return null;
    // }

    const sliderSize = this.slider.getSize();
    // const position = thumb.getPosition();
    // const size = thumb.getSize();

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
    const orientation = this.slider.getOrientation();
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

    if (orientation === 'horizontal') {
      position.left = start;
      size.width = end;
    } else {
      position.top = start;
      size.height = end;
    }

    this.progressBar.update({ position, size });
  }

  private getPopUpPosition(thumb: Thumb): IPosition {
    const thumbPosition = this.positionByOrientation(thumb.getPosition());
    const popUpPosition = thumbPosition + this.sizeByOrientation(thumb.getSize()) / 2;

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

  private calculateScalePointPosition(size: ISize, position: IPosition): IPosition {
    const thumbPosition = this.calculateThumbPosition(this.thumbOne, position);
    const thumbSize = this.thumbOne.getSize();

    const newPosition =
      this.positionByOrientation(thumbPosition) +
      (this.sizeByOrientation(thumbSize) / 2 - this.sizeByOrientation(size) / 2);

    return this.getFullPosition(newPosition);
  }

  private sizeByOrientation(size: ISize): number {
    if (this.slider.getOrientation() === 'horizontal') {
      return size.width;
    }

    return size.height;
  }

  private positionByOrientation({ left, top }: IPosition): number {
    if (this.slider.getOrientation() === 'horizontal') {
      return left;
    }

    return top;
  }

  private swapThumbs(): void {
    if (this.thumbTwo) {
      [this.thumbOne, this.thumbTwo] = [this.thumbTwo, this.thumbOne];
    }
  }

  updateScale(pointsParams: IPointParams[]): void {
    if (!this.scale) {
      return;
    }

    this.disableScale();
    this.enableScale();
    // this.scale = new Scale();

    const pointSize = this.scale.getPointSize(pointsParams[pointsParams.length - 1].value);
    // const divider = this.getScalePointsDivider(
    //   pointsParams.length,
    //   this.sizeByOrientation(pointSize)
    // );

    // const visiblePoints = pointsParams.filter(
    //   (point, index) =>
    //     index === 0 || index === pointsParams.length - 1 || point.value % divider === 0
    // );

    const visiblePoints = this.getVisiblePoints(pointsParams, this.sizeByOrientation(pointSize));

    const points = visiblePoints.map((point) => ({
      position: this.calculateScalePointPosition(pointSize, this.getFullPosition(point.position)),
      size: pointSize,
      value: point.value,
    }));

    this.scale.addPoints(points);
    this.slider.setMargins(this.getMargins());
  }

  private getVisiblePoints(pointsParams: IPointParams[], pointSize: number): IPointParams[] {
    const scaleSize = this.sizeByOrientation(this.slider.getSize());
    const pointsAmount = pointsParams.length;
    const maxPointsAmount = Math.floor(scaleSize / pointSize);

    let divider = 1;

    if (maxPointsAmount < pointsAmount) {
      // divider = Math.ceil(pointsAmount / maxPointsAmount) + 1;
      for (let points = maxPointsAmount; points > 2; points -= 1) {
        const emptyPointsAmount = pointsAmount - points;

        if (emptyPointsAmount % (points - 1) === 0) {
          divider = emptyPointsAmount / (points - 1) + 1;
          break;
        }
      }
    }

    return pointsParams.filter(
      (_, index) => index === 0 || index === pointsAmount - 1 || index % divider === 0
    );
  }

  // getScalePoints(pointsCount: number, gap: number): IScalePointParams[] {
  //   const scalePoints = [];
  //   const pointSize = this.scale?.getPointSize()
  //   const pointsInEmptySegment = this.getPointsInEmptySegmentAmount(pointsCount);

  //   let currentPointPosition =
  //     this.sizeByOrientation(this.thumbOne.getSize()) / 2 -
  //     this.sizeByOrientation(this.scalePointSize) / 2;

  //   let pointsCounter = 0;

  //   for (let i = 0; i <= Math.round(pointsCount - 1); i += 1) {
  //     pointsCounter = pointsCounter >= pointsInEmptySegment + 1 ? 0 : pointsCounter;

  //     const currentPointValue = this.thumbPositionToValue(
  //       currentPointPosition -
  //         this.sizeByOrientation(this.thumbSize) / 2 +
  //         this.sizeByOrientation(this.scalePointSize) / 2
  //     );

  //     currentPointPosition = this.getCorrectPointPosition(currentPointPosition);

  //     const fullPointPosition = { left: 0, top: 0 };
  //     if (this.orientation === 'horizontal') {
  //       fullPointPosition.left = currentPointPosition;
  //     } else {
  //       fullPointPosition.top = currentPointPosition;
  //     }

  //     if (pointsCounter === 0) {
  //       scalePoints.push({
  //         position: fullPointPosition,
  //         size: this.scalePointSize,
  //         value: currentPointValue,
  //       });
  //     }

  //     pointsCounter += 1;
  //     currentPointPosition += gap;
  //   }

  //   return scalePoints;
  // }

  // private getCorrectPointPosition(position: number): number {
  //   const extremePosition =
  //     this.sizeByOrientation(this.slider.getSize()) -
  //     this.sizeByOrientation(this.thumbOne.getSize()) / 2 -
  //     this.sizeByOrientation(this.scalePointSize) / 2;
  //   if (position > extremePosition) {
  //     return extremePosition;
  //   }
  //   return position;
  // }

  // private getPointsInEmptySegmentAmount(scalePointsAmount: number): number {
  //   // const scaleSize = this.sizeByOrientation(this.sliderSize);
  //   // const pointSize = this.sizeByOrientation(this.scalePointSize);
  //   // const maxScalePointsAmount = Math.floor(scaleSize / pointSize);

  //   // if (maxScalePointsAmount < scalePointsAmount) {
  //   //   for (let points = maxScalePointsAmount; points > 2; points -= 1) {
  //   //     const emptyPointsAmount = scalePointsAmount - points;

  //   //     if (emptyPointsAmount % (points - 1) === 0) {
  //   //       return emptyPointsAmount / (points - 1);
  //   //     }
  //   //   }
  //   // }

  //   return 0;
  // }
  //END_NEW_METHODS//

  // update(eventType: string): void {
  //   if (eventType in this.events) {
  //     this.events[eventType]();
  //   }
  // }

  // swapThumbs(): void {
  //   if (this.thumbTwo) {
  //     [this.thumbOne, this.thumbTwo] = [this.thumbTwo, this.thumbOne];
  //   }
  // }

  switchToHorizontal(): void {
    this.slider.resetMargins();
    this.slider.switchToHorizontal();
    this.track.switchToHorizontal();
    this.thumbOne.switchToHorizontal();
    this.thumbTwo?.switchToHorizontal();
    this.popUpOne?.switchToHorizontal();
    this.popUpTwo?.switchToHorizontal();
    this.progressBar.switchToHorizontal();
    this.scale?.switchToHorizontal();
  }

  switchToVertical(): void {
    this.slider.resetMargins();
    this.slider.switchToVertical();
    this.track.switchToVertical();
    this.thumbOne.switchToVertical();
    this.thumbTwo?.switchToVertical();
    this.popUpOne?.switchToVertical();
    this.popUpTwo?.switchToVertical();
    this.progressBar.switchToVertical();
    this.scale?.switchToVertical();
  }

  switchToSingle(): void {
    this.thumbTwo?.remove();
    this.thumbTwo = null;
    this.popUpTwo?.remove();
    this.popUpTwo = null;
  }

  switchToRange(): void {
    if (this.thumbTwo === null) {
      this.thumbTwo = new Thumb(this.slider.getOrientation());
      this.slider.append(this.thumbTwo.getControl());

      if (this.popUpOne) {
        this.popUpTwo = new PopUp(this.slider.getOrientation());
        this.slider.append(this.popUpTwo.getControl());
      }

      this.thumbTwo?.observer.register('thumbIsDragged', this.updateThumbsPositions);
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
      this.popUpOne = new PopUp(this.slider.getOrientation());
      this.slider.append(this.popUpOne.getControl());
    }

    if (this.thumbTwoIsWithoutPopup()) {
      this.popUpTwo = new PopUp(this.slider.getOrientation());
      this.slider.append(this.popUpTwo.getControl());
    }

    this.slider.setMargins(this.getMargins());
  }

  disableScale(): void {
    // this.scale?.subject.unsubscribe('clickToScale', this);
    this.scale?.remove();
    this.scale = null;

    this.slider.setMargins(this.getMargins());
  }

  enableScale(): void {
    if (this.scale) {
      this.scale?.remove();
    }
    this.scale = new Scale(this.slider.getOrientation());
    this.scale.observer.register('clickToScale', (args: IPosition) =>
      this.setThumbPositionOnClickPosition(args)
    );
    this.slider.append(this.scale.getControl());
    this.scale.observer.register('clickToScale', (args: IPosition) =>
      this.setThumbPositionOnClickPosition(args)
    );
    // this.scale.subject.register('clickToScale', this);

    this.slider.setMargins(this.getMargins());
  }

  getThumbSize(): ISize {
    return this.thumbOne.getSize();
  }

  getSliderSize(): ISize {
    return this.slider.getSize();
  }

  getThumbsPositions(): IThumbsPositions {
    const thumbOne = this.thumbOne.getPosition();
    const thumbTwo = this.thumbTwo ? this.thumbTwo.getPosition() : null;

    return { thumbOne, thumbTwo };
  }

  updateThumbs(thumbsPositions: IThumbsPositions): void {
    this.thumbOne.moveTo(thumbsPositions.thumbOne);
    if (thumbsPositions.thumbTwo) {
      this.thumbTwo?.moveTo(thumbsPositions.thumbTwo);
    }
  }

  // updateProgressBar(params: IProgressBarParams): void {
  //   this.progressBar.update(params);
  // }

  // updatePopUps(params: IPopUps): void {
  //   if (this.popUpOne) {
  //     this.popUpOne.update(params.popUpOne);
  //   }
  //   if (this.popUpTwo) {
  //     this.popUpTwo.update(params.popUpTwo);
  //   }
  // }

  // getScalePointSize(value: number): ISize {
  //   return this.scale ? this.scale.getPointSize(value) : { width: 0, height: 0 };
  // }

  // addScalePoints(points: IScalePointParams[]): void {
  // this.scale?.addPoints(points);
  // this.slider.setMargins(this.getMargins());
  // }

  getTrackClickPosition(): IPosition {
    return this.track.getPosition();
  }

  getScaleClickPosition(): IPosition {
    const position = this.scale === null ? { left: 0, top: 0 } : this.scale.getPosition();
    return position;
  }

  private init() {
    // this.subscribeToEvents();
    this.assembleSlider();

    this.handleWindowResize = this.handleWindowResize.bind(this);
    window.addEventListener('resize', this.handleWindowResize);
  }

  private thumbTwoIsWithoutPopup(): boolean {
    return this.popUpTwo === null && this.thumbTwo !== null;
  }

  // private subscribeToEvents(): void {
  //   this.thumbOne.subject.register('thumbIsDragged', this);
  //   this.thumbTwo?.subject.register('thumbIsDragged', this);
  //   this.track.subject.register('clickToTrack', this);
  //   this.scale?.subject.register('clickToScale', this);
  // }

  private handleWindowResize(): void {
    // this.subject.notify('windowResized');
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

    if (this.slider.getOrientation() === 'horizontal') {
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
