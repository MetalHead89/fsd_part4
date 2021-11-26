import UIControl from '../ui-control/ui-control';

class Track extends UIControl {
  constructor() {
    super('track');
    this.init();
  }

  private init(): void {
    this.handleTrackClick = this.handleTrackClick.bind(this);
    this.control.addEventListener('click', this.handleTrackClick);
  }

  private handleTrackClick(event: MouseEvent): void {
    const position = this.getPositionInsideParent({ left: event.clientX, top: event.clientY });
    this.observer.notify('clickToTrack', position);
  }
}

export default Track;
