import { boundMethod } from 'autobind-decorator';
import UIControl from '../UIControl/UIControl';

class Track extends UIControl {
  constructor() {
    super('track');
    this.init();
  }

  private init(): void {
    this.control.addEventListener('click', this.handleTrackClick);
  }

  @boundMethod
  private handleTrackClick(event: MouseEvent): void {
    const position = this.getPositionInsideParent({ left: event.clientX, top: event.clientY });
    this.notify('clickToTrack', position);
  }
}

export default Track;
