import { IElement, ISize } from '../../interfaces';

export default class Element implements IElement {
  element: HTMLDivElement;

  constructor() {
    const element = document.createElement('div');
    this.element = element;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  getSize(): ISize {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };
  }

  switchToHorizontal(): void {
    const mainClass = this.element.classList[0];
    this.element.classList.remove(`${mainClass}_vertical`);
    this.element.classList.add(`${mainClass}_horizontal`);
  }

  switchToVertical(): void {
    const mainClass = this.element.classList[0];
    this.element.classList.remove(`${mainClass}_horizontal`);
    this.element.classList.add(`${mainClass}_vertical`);
  }

  remove(): void {
    this.element.remove();
  }

  protected getOrientation(): string {
    const mainClass = this.element.classList[0];
    const classWithOrientation = this.element.classList[1];
    return classWithOrientation.replace(`${mainClass}_`, '');
  }
}
