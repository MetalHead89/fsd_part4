class Scale {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider__scale');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default Scale;
