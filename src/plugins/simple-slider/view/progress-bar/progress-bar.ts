import { IProgressBarParams } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class ProgressBar extends UIControl {
  constructor() {
    super('progress-bar');
  }

  /**
   * Обновляет положение и размер прогресс-бара
   * @param {IProgressBarParams} params - объект с размером и положением прогресс-бара
   */
  update(params: IProgressBarParams): void {
    this.control.style.left = `${params.position.left}px`;
    this.control.style.top = `${params.position.top}px`;
    this.control.style.width = `${params.size.width}px`;
    this.control.style.height = `${params.size.height}px`;
  }
}

export default ProgressBar;
