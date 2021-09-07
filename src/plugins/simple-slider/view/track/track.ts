import Element from '../element/element';

class Track extends Element {
  constructor() {
    super('track');
    this.init();
  }

  /**
   * Инициализация трека, подключение обработчиков событий
   */
  private init(): void {
    this.element.addEventListener('click', this.clickToTrack.bind(this));
  }

  /**
   * Обработка клика по треку
   * @param {MouseEvent} event - объект события click
   */
  private clickToTrack(event: MouseEvent): void {
    this.setPosition({ left: event.clientX, top: event.clientY });
    this.subject.notify('clickToTrack');
  }
}

export default Track;
