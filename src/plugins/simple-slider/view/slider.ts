import Track from './track';

/**
 * Класс дорожки слайдера. Содержит HTML элемент дорожки слайдера и организовывает управление им
 */
class Slider {
  protected track: Track;

  constructor() {
    this.track = new Track();
  }
}

export default Slider;
