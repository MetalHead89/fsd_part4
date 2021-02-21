import Container from './container/container';
import TextField from './text-field/text-field';
import groupElements from './group-elements';

export default class ControlPanelView {
  private sliderWrapper: HTMLDivElement;
  private thumbOneValue: TextField;
  private thumbTwoValue: TextField;

  constructor(sliderWrapper: HTMLDivElement) {
    this.sliderWrapper = sliderWrapper;
    this.thumbOneValue = new TextField('First thumb value');
    this.thumbTwoValue = new TextField('Second thumb value');

    this.createPanel();
  }

  private createPanel(): void {
    const container = new Container();

    container.append(
      groupElements(
        'slider-panel__text-fields-group',
        this.thumbOneValue.getControl(),
        this.thumbTwoValue.getControl()
      )
    );

    this.sliderWrapper.append(container.getElement());
  }
}
