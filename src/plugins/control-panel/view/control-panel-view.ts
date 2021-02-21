import Container from './container/container';
import TextField from './text-field/text-field';
import groupElements from './group-elements';

export default class ControlPanelView {
  private sliderWrapper: HTMLDivElement;
  private thumbOneValue: TextField;
  private thumbTwoValue: TextField;
  private min: TextField;
  private max: TextField;
  private step: TextField;

  constructor(sliderWrapper: HTMLDivElement) {
    this.sliderWrapper = sliderWrapper;
    this.thumbOneValue = new TextField('First thumb value');
    this.thumbTwoValue = new TextField('Second thumb value');
    this.min = new TextField('min value');
    this.max = new TextField('max value');
    this.step = new TextField('step');

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

    container.append(
      groupElements(
        'slider-panel__text-fields-group',
        this.min.getControl(),
        this.max.getControl(),
        this.step.getControl()
      )
    );

    this.sliderWrapper.append(container.getElement());
  }
}
