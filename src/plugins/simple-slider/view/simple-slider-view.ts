import {
  ISimpleSliderModel,
  ISimpleSliderController,
  ISize,
} from '../interfaces';

import Container from './container/container';
import Track from './track/track';
import Thumb from './thumb/thumb';
import ProgressBar from './progress-bar/progress-bar';
import PopUp from './pop-up/pop-up';
import Scale from './scale/scale';

/**
 * Класс дорожки слайдера. Содержит HTML элемент дорожки слайдера и организовывает управление им
 */
class SimpleSliderView {
  private simpleSliderModel: ISimpleSliderModel;
  private simpleSliderController: ISimpleSliderController;
  private container: Container;
  private sliderWrapper: HTMLDivElement;
  private track: Track;
  private thumbOne: Thumb;
  private thumbTwo: Thumb;
  private popUpOne: PopUp;
  private popUpTwo: PopUp;
  private progressBar: ProgressBar;
  private scale: Scale;

  constructor(controller: ISimpleSliderController, model: ISimpleSliderModel) {
    this.simpleSliderModel = model;
    this.simpleSliderController = controller;

    // sliderWrapper должен инициализироваться из параметров конструктора
    this.sliderWrapper = document.createElement('div');
    this.sliderWrapper.classList.add(
      'slider-wrapper',
      'slider-wrapper_horizontal',
    );
    // sliderWrapper должен инициализироваться из параметров конструктора

    // this.element = document.createElement('div');
    // this.element.classList.add('slider', 'slider_horizontal');

    this.container = new Container();
    this.track = new Track();
    this.thumbOne = new Thumb();
    this.thumbTwo = new Thumb();
    this.popUpOne = new PopUp();
    this.popUpTwo = new PopUp();
    this.progressBar = new ProgressBar();
    this.scale = new Scale();

    this.assembleSlider();
    // this.init();
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

  // private init(): void {
  //   this.simpleSliderController.setSliderSize({
  //     width: this.element.offsetWidth,
  //     height: this.element.offsetHeight,
  //   });

  //   this.simpleSliderController.setThumbSize({
  //     width: this.thumbOne.getElement().offsetWidth,
  //     height: this.thumbOne.getElement().offsetHeight,
  //   });

  //   const thumbsPositions = this.simpleSliderModel.getThumbsPositions();
  //   this.thumbOne.moveTo(thumbsPositions.thumbOne);
  //   this.thumbTwo.moveTo(thumbsPositions.thumbTwo);
  // }
}

export default SimpleSliderView;
