import { ISimpleSliderModel, ISimpleSliderController } from '../interfaces';

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
  private element: HTMLDivElement;
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

    this.element = document.createElement('div');
    this.element.classList.add('slider', 'slider_horizontal');

    this.track = new Track();
    this.thumbOne = new Thumb();
    this.thumbTwo = new Thumb();
    this.popUpOne = new PopUp();
    this.popUpTwo = new PopUp();
    this.progressBar = new ProgressBar();
    this.scale = new Scale();

    this.assembleSlider();
    this.init();
  }

  private assembleSlider(): void {
    this.element.append(this.track.getElement());
    this.element.append(this.thumbOne.getElement());
    this.element.append(this.thumbTwo.getElement());
    this.element.append(this.popUpOne.getElement());
    this.element.append(this.popUpTwo.getElement());
    this.element.append(this.progressBar.getElement());
    this.element.append(this.scale.getElement());

    // Временный способ размещения слайдера на странице
    const body = document.querySelector('body');
    if (body !== null) {
      this.sliderWrapper.append(this.element);
      body.append(this.sliderWrapper);
    }
    // Временный способ размещения слайдера на странице
  }

  private init(): void {
    this.simpleSliderController.setSliderSize({
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    });

    this.simpleSliderController.setThumbSize({
      width: this.thumbOne.getElement().offsetWidth,
      height: this.thumbOne.getElement().offsetHeight,
    });

    const thumbsPositions = this.simpleSliderModel.getThumbsPositions();
    this.thumbOne.moveTo(thumbsPositions.thumbOne);
    this.thumbTwo.moveTo(thumbsPositions.thumbTwo);
  }
}

export default SimpleSliderView;
