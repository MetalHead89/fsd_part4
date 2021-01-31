class Track {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider__track', 'slider__track_horizontal');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default Track;
