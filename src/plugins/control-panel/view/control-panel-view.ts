import Container from './container/container';

export default class ControlPanelView {
  private sliderWrapper: HTMLDivElement;

  constructor(sliderWrapper: HTMLDivElement) {
    this.sliderWrapper = sliderWrapper;
    this.createPanel();
  }

  private createPanel(): void {
    const container = new Container();

    this.sliderWrapper.append(container.getElement());
  }
}
