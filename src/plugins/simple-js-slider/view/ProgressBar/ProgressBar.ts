import { IProgressBarParams } from '../../interfaces';
import UIControl from '../UIControl/UIControl';

class ProgressBar extends UIControl {
  constructor() {
    super('progress-bar');
  }

  update({ position, size }: IProgressBarParams): void {
    this.control.style.left = `${position.left}px`;
    this.control.style.top = `${position.top}px`;
    this.control.style.width = `${size.width}px`;
    this.control.style.height = `${size.height}px`;
  }
}

export default ProgressBar;
