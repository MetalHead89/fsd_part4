import { IProgressBarParams } from '../../interfaces';
import Element from '../element/element';

class ProgressBar extends Element {
  constructor() {
    super('progress-bar');
  }

  /**
   * Обновляет положение и размер прогресс-бара
   * @param {IProgressBarParams} params - объект с размером и положением прогресс-бара
   */
  update(params: IProgressBarParams): void {
    this.element.style.left = `${params.position.left}px`;
    this.element.style.top = `${params.position.top}px`;
    this.element.style.width = `${params.size.width}px`;
    this.element.style.height = `${params.size.height}px`;
  }
}

export default ProgressBar;
