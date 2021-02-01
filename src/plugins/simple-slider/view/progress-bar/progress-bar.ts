class ProgressBar {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider__progress-bar', 'slider__progress-bar_horizontal');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default ProgressBar;
