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
    this.setPosition({ left: event.clientX, top: event.clientY });
    this.subject.notify('clickToTrack');
  }
}

export default Track;
