import { boundMethod } from 'autobind-decorator';
import { IPosition } from '../../interfaces';
import UIControl from '../UIControl/UIControl';

class Thumb extends UIControl {
  private shift = { shiftX: 0, shiftY: 0 };
  private handleDocumentPointermove: (event: PointerEvent) => void;
  private handleDocumentPointerup: () => void;

  constructor(orientation?: string) {
    super('thumb', orientation);

    this.handleDocumentPointermove = this.drag;
    this.handleDocumentPointerup = this.endDrag;

    this.init();
  }

  moveTo({ left, top }: IPosition): void {
    this.lastPosition = { left, top };
    this.control.style.left = `${left}px`;
    this.control.style.top = `${top}px`;
  }

  protected setPosition(cursorPosition: IPosition): void {
    super.setPosition(cursorPosition);
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
    this.control.addEventListener('pointerdown', this.handleThumbPointerdown);

    this.disableDragAndDrop();
  }

  private disableDragAndDrop(): void {
    this.control.ondragstart = () => false;
  }

  @boundMethod
  private handleThumbPointerdown(event: PointerEvent): void {
    Thumb.disableSelection();

    const thumbCoords: DOMRect = this.control.getBoundingClientRect();
    this.setThumbShift(
      { left: event.clientX, top: event.clientY },
      { left: thumbCoords.left, top: thumbCoords.top }
    );

    document.addEventListener('pointermove', this.handleDocumentPointermove);
    document.addEventListener('pointerup', this.handleDocumentPointerup);
  }

  private setThumbShift(cursorPosition: IPosition, thumbPosition: IPosition) {
    this.shift.shiftX = cursorPosition.left - thumbPosition.left;
    this.shift.shiftY = cursorPosition.top - thumbPosition.top;
  }

  @boundMethod
  private drag(event: PointerEvent): void {
    this.setPosition({
      left: event.clientX - this.shift.shiftX,
      top: event.clientY - this.shift.shiftY,
    });

    this.notify('thumbIsDragged', '');
  }

  @boundMethod
  private endDrag(): void {
    this.shift = { shiftX: 0, shiftY: 0 };
    Thumb.enableSelection();

    document.removeEventListener('pointermove', this.handleDocumentPointermove);
    document.removeEventListener('pointerup', this.handleDocumentPointerup);
  }
}

export default Thumb;
