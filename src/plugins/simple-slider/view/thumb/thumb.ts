/* eslint operator-linebreak: ["error", "after"] */
/* eslint-disable comma-dangle */

import { IPosition } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class Thumb extends UIControl {
  private shift = { shiftX: 0, shiftY: 0 };
  private handleDocumentPointermove: (event: PointerEvent) => void;
  private handleDocumentPointerup: () => void;

  constructor(orientation?: string) {
    super('thumb', orientation);

    this.handleDocumentPointermove = this.drag.bind(this);
    this.handleDocumentPointerup = this.endDrag.bind(this);

    this.init();
  }

  setZIndex(index: number): void {
    this.control.style.zIndex = index.toString();
  }

  resetZIndex(): void {
    this.control.style.zIndex = '';
  }

  moveTo({ left, top }: IPosition): void {
    this.lastPosition = { left, top };
    this.control.style.left = `${left}px`;
    this.control.style.top = `${top}px`;
  }

  protected setPosition(cursorPosition: IPosition): void {
    super.setPosition(cursorPosition);
    this.lastPosition.left -= this.shift.shiftX;
    this.lastPosition.top -= this.shift.shiftY;
  }

  private static disableSelection() {
    document.onselectstart = () => false;
    document.onpointerdown = () => false;
  }

  private static enableSelection() {
    document.onselectstart = null;
    document.onpointerdown = null;
  }

  private init() {
    this.handleThumbPointerdown = this.handleThumbPointerdown.bind(this);
    this.control.addEventListener('pointerdown', this.handleThumbPointerdown);

    this.disableDragAndDrop();
  }

  private disableDragAndDrop(): void {
    this.control.ondragstart = () => false;
  }

  private handleThumbPointerdown(event: PointerEvent): void {
    Thumb.disableSelection();

    const thumbCoords: DOMRect = this.control.getBoundingClientRect();
    this.setThumbShift(
      { left: event.clientX, top: event.clientY },
      { left: thumbCoords.left, top: thumbCoords.top }
    );

    document.addEventListener('pointermove', this.handleDocumentPointermove);
    document.addEventListener('pointerup', this.handleDocumentPointerup);

    this.subject.notify('thumbIsCatched');
    this.increaseZIndex();
  }

  private setThumbShift(cursorPosition: IPosition, thumbPosition: IPosition) {
    this.shift.shiftX = cursorPosition.left - thumbPosition.left;
    this.shift.shiftY = cursorPosition.top - thumbPosition.top;
  }

  private increaseZIndex() {
    const zIndex = this.getStyle('z-index');
    this.control.style.zIndex = (parseInt(zIndex || '0', 10) + 1).toString();
  }

  private drag(event: PointerEvent): void {
    this.setPosition({
      left: event.clientX,
      top: event.clientY,
    });

    this.subject.notify('thumbIsDragged');
  }

  private endDrag(): void {
    Thumb.enableSelection();

    document.removeEventListener('pointermove', this.handleDocumentPointermove);
    document.removeEventListener('pointerup', this.handleDocumentPointerup);
  }
}

export default Thumb;
