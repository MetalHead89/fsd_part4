import { IPosition } from '../../interfaces';
import Element from '../element/element';

class Track extends Element {
  constructor() {
    super('slider__track');
    this.init();
  }

  private init(): void {
    this.element.addEventListener('click', this.clickToTrack.bind(this));
  }

  private clickToTrack(event: MouseEvent): void {
    this.setPosition({ left: event.clientX, top: event.clientY });
    this.subject.notify('clickToTrack');
  }

  getClickPosition(): IPosition {
    return this.lastPosition;
  }
}

export default Track;
