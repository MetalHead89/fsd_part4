import Track from './track/track';

/**
 * Класс дорожки слайдера. Содержит HTML элемент дорожки слайдера и организовывает управление им
 */
class Slider {
  private element: HTMLDivElement;
  protected track: Track;

  constructor() {
    this.element = document.createElement('div');
    this.track = new Track();

    this.assembleSlider();
  }

  assembleSlider(): void {
    this.element.append(this.track.getElement());

    // Тестовый контейнер
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');
    if (body !== null) {
      body.append(wrapper);
      wrapper.append(this.element);
    }
  }
}

export default Slider;
