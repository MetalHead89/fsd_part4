class ProgressBar {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default ProgressBar;
