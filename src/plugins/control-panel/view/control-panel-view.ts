import Container from './container/container';
import TextField from './text-field/text-field';

export default class ControlPanelView {
  private sliderWrapper: HTMLDivElement;
  private thumbOneValue: TextField;

  constructor(sliderWrapper: HTMLDivElement) {
    this.sliderWrapper = sliderWrapper;
    this.thumbOneValue = new TextField('First thumb value');

    this.createPanel();
  }

  private createPanel(): void {
    const container = new Container();
    container.append(this.thumbOneValue.getControl());

    this.sliderWrapper.append(container.getElement());
  }
}
