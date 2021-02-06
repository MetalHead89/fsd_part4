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

/**
 * Класс дорожки слайдера. Содержит HTML элемент дорожки слайдера
 * и организовывает управление им
 */
class SimpleSliderView implements ISimpleSliderView {
  private observers: IObserver[];
  private container: Container;
  private sliderWrapper: HTMLDivElement;
  private track: Track;
  private thumbOne: Thumb;
  private thumbTwo: Thumb;
  private popUpOne: PopUp;
  private popUpTwo: PopUp;
  private progressBar: ProgressBar;
  private scale: Scale;

  constructor() {
    this.observers = [];
    // sliderWrapper должен инициализироваться из параметров конструктора
    this.sliderWrapper = document.createElement('div');
    this.sliderWrapper.classList.add(
      'slider-wrapper',
      'slider-wrapper_horizontal'
    );
    // sliderWrapper должен инициализироваться из параметров конструктора

    this.container = new Container();
    this.track = new Track();
    this.thumbOne = new Thumb();
    this.thumbTwo = new Thumb();
    this.popUpOne = new PopUp();
    this.popUpTwo = new PopUp();
    this.progressBar = new ProgressBar();
    this.scale = new Scale();

    this.assembleSlider();
  }

  /**
   * Регистрация нового наблюдателя, следящего за изменением позиций бегунков
   * @param {IThumbsObserver} observer - регистрируемый наблюдатель
   */
  registerObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  /**
   * Удаление наблюдателя, следящего за изменением позиций бегунков
   * @param {IThumbsObserver} observer - удаляемый наблюдатель
   */
  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter(
      (registeredObserver) => registeredObserver !== observer
    );
  }

  /**
   * Оповещение зарегистрированных наблюдателей об изменении позиций бегунков
   */
  notifyThumbsMoveObservers(): void {
    this.observers.forEach((registeredObserver) => registeredObserver.update());
  }

  private assembleSlider(): void {
    this.container.append(this.track.getElement());
    this.container.append(this.thumbOne.getElement());
    this.container.append(this.thumbTwo.getElement());
    this.container.append(this.popUpOne.getElement());
    this.container.append(this.popUpTwo.getElement());
    this.container.append(this.progressBar.getElement());
    this.container.append(this.scale.getElement());

    // Временный способ размещения слайдера на странице
    const body = document.querySelector('body');
    if (body !== null) {
      this.sliderWrapper.append(this.container.element);
      body.append(this.sliderWrapper);
    }
    // Временный способ размещения слайдера на странице
  }

  getThumbSize(): ISize {
    return this.thumbOne.getSize();
  }

  getSliderSize(): ISize {
    return this.container.getSize();
  }

  updatedThumbs(thumbsPositions: IThumbsPositions): void {
    this.thumbOne.moveTo(thumbsPositions.thumbOne);
    this.thumbTwo.moveTo(thumbsPositions.thumbTwo);
  }
}

export default SimpleSliderView;
