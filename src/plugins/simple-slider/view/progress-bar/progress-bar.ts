import { IProgressBarParams } from '../../interfaces';
import Element from '../element/element';

class ProgressBar extends Element {
  constructor() {
    super();
    this.element.classList.add(
      'slider__progress-bar',
      'slider__progress-bar_horizontal',
    );
  }

  update(params: IProgressBarParams): void {
    this.element.style.left = `${params.position.left}px`;
    this.element.style.top = `${params.position.top}px`;
    this.element.style.width = `${params.size.width}px`;
    this.element.style.height = `${params.size.height}px`;
  }
}

export default ProgressBar;
