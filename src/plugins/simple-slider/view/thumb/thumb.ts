class Thumb {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider__thumb', 'slider__thumb_horizontal');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default Thumb;
