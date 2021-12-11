import Observer from '../../../simple-js-slider/observer/Observer';
import { ICheckboxParams, PanelControlEvents } from '../../interfaces';

class Checkbox extends Observer<PanelControlEvents> {
  private control: HTMLDivElement;
  private checkbox: HTMLInputElement;
  private label: HTMLLabelElement;

  constructor(params: ICheckboxParams) {
    super();
    this.control = document.createElement('div');
    this.label = document.createElement('label');
    this.checkbox = document.createElement('input');

    this.init(params);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  setState(state: boolean): void {
    if (this.checkbox.checked === state) {
      return;
    }

    this.checkbox.checked = state;
    this.handleCheckboxChange();
  }

  isEnabled(): boolean {
    return this.checkbox.checked;
  }

  private init({ label, name, value }: ICheckboxParams): void {
    this.control.classList.add('checkbox');

    this.label.classList.add('checkbox__label');
    this.label.innerText = label;

    this.checkbox.type = 'checkbox';
    this.checkbox.name = name;
    this.checkbox.value = value;
    this.checkbox.classList.add('checkbox__check');
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.checkbox.addEventListener('change', this.handleCheckboxChange);

    this.label.append(this.checkbox);
    this.control.append(this.label);
  }

  private handleCheckboxChange(): void {
    this.label.classList.toggle('checkbox__label_checked');

    this.notify('PanelControlIsUpdated', '');
  }
}

export default Checkbox;
