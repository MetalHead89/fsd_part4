import { IProgressBarParams } from '../../interfaces';

class ProgressBar {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add(
      'slider__progress-bar',
      'slider__progress-bar_horizontal',
    );
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  update(params: IProgressBarParams): void {
    this.element.style.left = `${params.position.left}px`;
    this.element.style.top = `${params.position.top}px`;
    this.element.style.width = `${params.size.width}px`;
    this.element.style.height = `${params.size.height}px`;
  }
}

export default ProgressBar;
