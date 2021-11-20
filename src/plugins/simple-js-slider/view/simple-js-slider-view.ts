/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */

import {
  IObserver,
  IPopUpParams,
  IPopUps,
  IPosition,
  IProgressBarParams,
  IScalePointParams,
  ISimpleJsSliderView,
  ISize,
  ISliderMargins,
  ISubject,
  ISubjectEvents,
  IThumbsPositions,
} from '../interfaces';

import Slider from './slider/slider';
import Track from './track/track';
import Thumb from './thumb/thumb';
import PopUp from './pop-up/pop-up';
import ProgressBar from './progress-bar/progress-bar';
import Scale from './scale/scale';
import Subject from '../subject/subject';
import { IObserverNew, IThumbsPositionsNew } from '../new-interfaces';
import ObserverNew from '../observer/observer';

class SimpleJsSliderView implements ISimpleJsSliderView, IObserver {
  subject: ISubject;
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
  private events: ISubjectEvents = {
    thumbIsDragged: () => this.subject.notify('thumbIsDragged'),
    clickToTrack: () => this.subject.notify('clickToTrack'),
    clickToScale: () => this.subject.notify('clickToScale'),
  };

  constructor(wrapper: HTMLDivElement) {
    this.observer = new ObserverNew();
    this.subject = new Subject();
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
  moveThumbs({ thumbOne, thumbTwo }: IThumbsPositionsNew): void {
    const thumbOnePosition = this.getFullPosition(thumbOne);
    this.thumbOne.moveTo(this.calculateThumbPosition(this.thumbOne, thumbOnePosition));

    const thumbTwoPosition = thumbTwo !== null ? this.getFullPosition(thumbTwo) : null;
    if (this.thumbTwo && thumbTwoPosition !== null) {
      this.thumbTwo.moveTo(this.calculateThumbPosition(this.thumbTwo, thumbTwoPosition));
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
  }

  private subscribeToEventsNew(): void {
    this.thumbOne.observer.register('thumbIsDragged', this.updateThumbsPositions);
    this.thumbTwo?.observer.register('thumbIsDragged', this.updateThumbsPositions);
  }

  private updateThumbsPositions() {
    const thumbOne = this.calculateThumbPercentPosition(this.thumbOne);
    const thumbTwo = this.calculateThumbPercentPosition(this.thumbTwo);

    this.observer.notify('thumbIsDragged', {
      thumbOne,
      thumbTwo,
    });
  }

  private calculateThumbPercentPosition(thumb: Thumb | null): number | null {
    if (thumb === null) {
      return null;
    }

    const sliderSize = this.slider.getSize();
    const position = thumb.getPosition();
    const size = thumb.getSize();

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

  private getPopUpPosition(popUp: PopUp, thumb: Thumb): IPosition {
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
  //END_NEW_METHODS//

  update(eventType: string): void {
    if (eventType in this.events) {
      this.events[eventType]();
    }
  }

  swapThumbs(): void {
    if (this.thumbTwo) {
      [this.thumbOne, this.thumbTwo] = [this.thumbTwo, this.thumbOne];
    }
  }

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

      this.thumbTwo.subject.register('thumbIsDragged', this);
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
    this.scale?.subject.unsubscribe('clickToScale', this);
    this.scale?.remove();
    this.scale = null;

    this.slider.setMargins(this.getMargins());
  }

  enableScale(): void {
    if (this.scale) {
      this.scale?.remove();
    }
    this.scale = new Scale(this.slider.getOrientation());
    this.slider.append(this.scale.getControl());
    this.scale.subject.register('clickToScale', this);

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

  updateProgressBar(params: IProgressBarParams): void {
    this.progressBar.update(params);
  }

  updatePopUps(params: IPopUps): void {
    if (this.popUpOne) {
      this.popUpOne.update(params.popUpOne);
    }
    if (this.popUpTwo) {
      this.popUpTwo.update(params.popUpTwo);
    }
  }

  getScalePointSize(value: number): ISize {
    return this.scale ? this.scale.getPointSize(value) : { width: 0, height: 0 };
  }

  addScalePoints(points: IScalePointParams[]): void {
    this.scale?.addPoints(points);
    this.slider.setMargins(this.getMargins());
  }

  getTrackClickPosition(): IPosition {
    return this.track.getPosition();
  }

  getScaleClickPosition(): IPosition {
    const position = this.scale === null ? { left: 0, top: 0 } : this.scale.getPosition();
    return position;
  }

  private init() {
    this.subscribeToEvents();
    this.assembleSlider();

    this.handleWindowResize = this.handleWindowResize.bind(this);
    window.addEventListener('resize', this.handleWindowResize);
  }

  private thumbTwoIsWithoutPopup(): boolean {
    return this.popUpTwo === null && this.thumbTwo !== null;
  }

  private subscribeToEvents(): void {
    this.thumbOne.subject.register('thumbIsDragged', this);
    this.thumbTwo?.subject.register('thumbIsDragged', this);
    this.track.subject.register('clickToTrack', this);
    this.scale?.subject.register('clickToScale', this);
  }

  private handleWindowResize(): void {
    this.subject.notify('windowResized');
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
