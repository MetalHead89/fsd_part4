import { IPosition, ISize } from '../../interfaces';
import ObserverNew from '../../observer/observer';

class UIControl {
  observer: ObserverNew;
  protected control: HTMLDivElement;
  protected lastPosition: IPosition;

  constructor(name: string, orientation?: string) {
    const control = document.createElement('div');
    this.control = control;
    this.observer = new ObserverNew();
    this.lastPosition = { left: 0, top: 0 };
    const orientationClass = orientation
      ? `${name}_orientation_${orientation}`
      : `${name}_orientation_horizontal`;
    this.control.classList.add(`${name}`, orientationClass);
  }

  getPosition(): IPosition {
    return this.lastPosition;
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  getSize(): ISize {
    return {
      width: this.control.offsetWidth,
      height: this.control.offsetHeight,
    };
  }

  switchToHorizontal(): void {
    const mainClass = this.control.classList[0];
    this.control.classList.remove(`${mainClass}_orientation_vertical`);
    this.control.classList.add(`${mainClass}_orientation_horizontal`);
  }

  switchToVertical(): void {
    const mainClass = this.control.classList[0];
    this.control.classList.remove(`${mainClass}_orientation_horizontal`);
    this.control.classList.add(`${mainClass}_orientation_vertical`);
  }

  remove(): void {
    this.control.remove();
  }

  getOrientation(): string {
    const mainClass = this.control.classList[0];
    const classWithOrientation = this.control.classList[1];
    return classWithOrientation.replace(`${mainClass}_orientation_`, '');
  }

  getRect(): DOMRect {
    return this.control.getBoundingClientRect();
  }

  getStyle(styleName: string): string | undefined {
    return document.defaultView?.getComputedStyle(this.control, null).getPropertyValue(styleName);
  }

  protected setPosition({ left, top }: IPosition): void {
    const positionInsideParent = { left, top };

    const parent: HTMLElement | null = this.control.parentElement;

    if (parent) {
      const parentCoords: DOMRect = parent.getBoundingClientRect();
      positionInsideParent.left -= parentCoords.left;
      positionInsideParent.top -= parentCoords.top;
    }

    this.lastPosition = positionInsideParent;
  }
}

export default UIControl;
