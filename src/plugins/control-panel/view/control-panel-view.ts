import Container from './container/container';
import TextField from './text-field/text-field';
import groupElements from './group-elements';
import RadioButton from './radio-button/radio-button';
import Checkbox from './checkbox/checkbox';

export default class ControlPanelView {
  private sliderWrapper: HTMLDivElement;
  private thumbOneValue: TextField;
  private thumbTwoValue: TextField;
  private min: TextField;
  private max: TextField;
  private step: TextField;
  private typeRadio: RadioButton;
  private orientationRadio: RadioButton;
  private scaleCheckbox: Checkbox;
  private popUpsCheckbox: Checkbox;

  constructor(sliderWrapper: HTMLDivElement) {
    this.sliderWrapper = sliderWrapper;
    this.thumbOneValue = new TextField('First thumb value');
    this.thumbTwoValue = new TextField('Second thumb value');
    this.min = new TextField('min value');
    this.max = new TextField('max value');
    this.step = new TextField('step');
    this.typeRadio = new RadioButton(
      'type',
      { label: 'single', value: 'single' },
      { label: 'range', value: 'range' }
    );
    this.orientationRadio = new RadioButton(
      'orientation',
      { label: 'horizontal', value: 'horizontal' },
      { label: 'vertical', value: 'vertical' }
    );
    this.scaleCheckbox = new Checkbox({
      label: 'scale',
      name: 'scale',
      value: 'scale',
    });
    this.popUpsCheckbox = new Checkbox({
      label: 'pop ups',
      name: 'popUps',
      value: 'popUps',
    });

    this.createPanel();
  }

  private createPanel(): void {
    const container = new Container();

    container.append(
      groupElements({
        wrapperClass: 'control-panel__text-fields-group',
        elements: [
          this.thumbOneValue.getControl(),
          this.thumbTwoValue.getControl(),
        ],
      })
    );

    container.append(
      groupElements({
        wrapperClass: 'control-panel__text-fields-group',
        elements: [
          this.min.getControl(),
          this.max.getControl(),
          this.step.getControl(),
        ],
      })
    );

    container.append(
      groupElements({
        header: 'type',
        wrapperClass: '',
        elements: [this.typeRadio.getControl()],
      })
    );

    container.append(
      groupElements({
        header: 'orientation',
        wrapperClass: '',
        elements: [this.orientationRadio.getControl()],
      })
    );

    container.append(
      groupElements({
        header: 'on/off elements',
        wrapperClass: '',
        elements: [
          this.scaleCheckbox.getControl(),
          this.popUpsCheckbox.getControl(),
        ],
      })
    );

    this.sliderWrapper.append(container.getElement());
  }
}
