import Element from '../element/element';

class Track extends Element {
  constructor() {
    super();
    this.element.classList.add('slider__track', 'slider__track_horizontal');
  }
}

export default Track;
