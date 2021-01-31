import Track from './track/track';

/**
 * Класс дорожки слайдера. Содержит HTML элемент дорожки слайдера и организовывает управление им
 */
class Slider {
  private element: HTMLDivElement;
  private track: Track;
  private sliderWrapper: HTMLDivElement;

  constructor() {
    // sliderWrapper должен инициализироваться из параметров конструктора
    this.sliderWrapper = document.createElement('div');
    this.sliderWrapper.classList.add(
      'slider-wrapper',
      'slider-wrapper_horizontal'
    );
    // sliderWrapper должен инициализироваться из параметров конструктора

    this.element = document.createElement('div');
    this.track = new Track();

    this.assembleSlider();
  }

  assembleSlider(): void {
    this.element.append(this.track.getElement());

    // Временный способ размещения слайдера на странице
    const body = document.querySelector('body');
    if (body !== null) {
      this.sliderWrapper.append(this.element);
      body.append(this.sliderWrapper);
    }
    // Временный способ размещения слайдера на странице
  }
}

export default Slider;
