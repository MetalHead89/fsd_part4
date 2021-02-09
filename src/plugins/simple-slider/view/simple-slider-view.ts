/* eslint-disable comma-dangle */

import {
  IObserver,
  ISimpleSliderView,
  ISize,
  IThumbsPositions,
} from '../interfaces';

import Container from './container/container';
import Track from './track/track';
import Thumb from './thumb/thumb';
import ProgressBar from './progress-bar/progress-bar';
import PopUp from './pop-up/pop-up';
import Scale from './scale/scale';
import Subject from '../subject/subject';

/**
 * Класс дорожки слайдера. Содержит HTML элемент дорожки слайдера
 * и организовывает управление им
 */
class SimpleSliderView extends Subject implements ISimpleSliderView, IObserver {
  private container: Container;
  private sliderWrapper: HTMLDivElement;
  private track: Track;
  private thumbOne: Thumb;
  private thumbTwo: Thumb;
  private popUpOne: PopUp;
  private popUpTwo: PopUp;
  private progressBar: ProgressBar;
  private scale: Scale;

  constructor(wrapper: HTMLDivElement) {
    super();
    this.sliderWrapper = wrapper;

    this.container = new Container();
    this.track = new Track();
    this.thumbOne = new Thumb();
    this.thumbTwo = new Thumb();
    this.popUpOne = new PopUp();
    this.popUpTwo = new PopUp();
    this.progressBar = new ProgressBar();
    this.scale = new Scale();

    this.thumbOne.register('thumbIsDragged', this);
    this.thumbTwo.register('thumbIsDragged', this);
    this.thumbOne.register('thumbIsCatched', this);
    this.thumbTwo.register('thumbIsCatched', this);

    this.assembleSlider();
  }

  update(eventType: string): void {
    if (eventType === 'thumbIsDragged') {
      this.notify('thumbIsDragged');
    } else if (eventType === 'thumbIsCatched') {
      this.thumbOne.resetZIndex();
      this.thumbTwo.resetZIndex();
    }
  }

  private assembleSlider(): void {
    this.container.append(this.track.getElement());
    this.container.append(this.thumbOne.getElement());
    this.container.append(this.thumbTwo.getElement());
    this.container.append(this.popUpOne.getElement());
    this.container.append(this.popUpTwo.getElement());
    this.container.append(this.progressBar.getElement());
    this.container.append(this.scale.getElement());

    this.sliderWrapper.append(this.container.element);
  }

  getThumbSize(): ISize {
    return this.thumbOne.getSize();
  }

  getSliderSize(): ISize {
    return this.container.getSize();
  }

  getThumbsPos(): IThumbsPositions {
    return {
      thumbOne: this.thumbOne.getPosition(),
      thumbTwo: this.thumbTwo.getPosition(),
    };
  }

  updatedThumbs(thumbsPositions: IThumbsPositions): void {
    this.thumbOne.moveTo(thumbsPositions.thumbOne);
    this.thumbTwo.moveTo(thumbsPositions.thumbTwo);
  }
}

export default SimpleSliderView;
