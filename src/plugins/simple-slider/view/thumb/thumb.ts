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

  private init() {
    this.handleThumbPointerdown = this.handleThumbPointerdown.bind(this);
    this.control.addEventListener('pointerdown', this.handleThumbPointerdown);

    this.disableDragAndDrop();
  }

  setZIndex(index: number): void {
    this.control.style.zIndex = index.toString();
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
  
  private setThumbShift(cursorPos: IPosition, thumbPos: IPosition) {
    this.shift.shiftX = cursorPos.left - thumbPos.left;
    this.shift.shiftY = cursorPos.top - thumbPos.top;
  }

  private increaseZIndex() {
    const zIndex = this.getStyle('z-index');
    this.control.style.zIndex = (parseInt(zIndex || '0', 10) + 1).toString();
  }

  resetZIndex(): void {
    this.control.style.zIndex = '';
  }

  private drag(event: PointerEvent): void {
    this.setPosition({
      left: event.clientX,
      top: event.clientY,
    });

    this.subject.notify('thumbIsDragged');
  }

  protected setPosition(cursorPosition: IPosition): void {
    super.setPosition(cursorPosition);
    this.lastPosition.left -= this.shift.shiftX;
    this.lastPosition.top -= this.shift.shiftY;
  }

  private endDrag(): void {
    Thumb.enableSelection();

    document.removeEventListener('pointermove', this.handleDocumentPointermove);
    document.removeEventListener('pointerup', this.handleDocumentPointerup);
  }

  moveTo(position: IPosition): void {
    this.lastPosition = position;
    this.control.style.left = `${position.left}px`;
    this.control.style.top = `${position.top}px`;
  }
  
  private static disableSelection() {
    document.onselectstart = () => false;
    document.onpointerdown = () => false;
  }
  
  private static enableSelection() {
    document.onselectstart = null;
    document.onpointerdown = null;
  }
}

export default Thumb;
