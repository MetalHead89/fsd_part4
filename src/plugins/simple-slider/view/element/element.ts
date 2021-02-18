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

  protected getOrientation(): string {
    const mainClass = this.element.classList[0];
    const classWithOrientation = this.element.classList[1];
    return classWithOrientation.replace(mainClass, '');
  }
}
