/* eslint-disable comma-dangle */
import { IPosition, ISize } from '../../interfaces';
import Observer from '../../observer/Observer';

class UIControl extends Observer {
  protected control: HTMLDivElement;
  protected lastPosition: IPosition;
  protected orientation: string;
  protected name: string;

  constructor(name: string, orientation = 'horizontal') {
    super();
    const control = document.createElement('div');
    this.control = control;
    this.lastPosition = { left: 0, top: 0 };
    this.orientation = orientation;
    this.name = name;

    this.control.classList.add(name);
    this.setOrientation(orientation);
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

  setOrientation(orientation: string): void {
    this.orientation = orientation;

    const oldOrientationClasses = [...this.control.classList].filter(
      (controlClass) => controlClass.includes('_orientation_')
    );

    oldOrientationClasses.forEach((controlClass) => {
      this.control.classList.remove(controlClass);
    });

    this.control.classList.add(`${this.name}_orientation_${orientation}`);
  }

  remove(): void {
    this.control.remove();
  }

  getRect(): DOMRect {
    return this.control.getBoundingClientRect();
  }

  getStyle(styleName: string): string | undefined {
    return document.defaultView
      ?.getComputedStyle(this.control, null)
      .getPropertyValue(styleName);
  }

  protected getPositionInsideParent({ left, top }: IPosition): IPosition {
    const positionInsideParent = { left, top };

    const parent: HTMLElement | null = this.control.parentElement;
    if (parent) {
      const parentCoords: DOMRect = parent.getBoundingClientRect();
      positionInsideParent.left -= parentCoords.left;
      positionInsideParent.top -= parentCoords.top;
    }

    return positionInsideParent;
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
