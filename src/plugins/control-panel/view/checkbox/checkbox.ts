import Subject from '../../../simple-slider/subject/subject';
import { ICheckboxParams } from '../../interfaces';

class Checkbox extends Subject {
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

  private init(params: ICheckboxParams): void {
    this.control.classList.add('checkbox');

    this.label.classList.add('checkbox__label');
    this.label.innerText = params.label;

    this.checkbox.type = 'checkbox';
    this.checkbox.name = params.name;
    this.checkbox.value = params.value;
    this.checkbox.classList.add('checkbox__check');
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.checkbox.addEventListener('change', this.handleCheckboxChange);

    this.label.append(this.checkbox);
    this.control.append(this.label);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  private handleCheckboxChange(): void {
    if (this.checkbox.checked) {
      this.label.classList.add('checkbox__label_checked');
    } else {
      this.label.classList.remove('checkbox__label_checked');
    }

    this.notify('controlPanelDataUpdated');
  }

  setState(state: boolean): void {
    this.checkbox.checked = state;
    this.handleCheckboxChange();
  }

  getState(): boolean {
    return this.checkbox.checked;
  }
}

export default Checkbox;
