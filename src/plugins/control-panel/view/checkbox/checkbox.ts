import Subject from '../../../simple-slider/subject/subject';
import { ICheckboxParams } from '../../interfaces';

export default class Checkbox extends Subject {
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
    this.control.classList.add('control-panel__checkbox-wrapper');

    this.label.classList.add('control-panel__checkbox-label');
    this.label.innerText = params.label;

    this.checkbox.type = 'checkbox';
    this.checkbox.name = params.name;
    this.checkbox.value = params.value;
    this.checkbox.classList.add('control-panel__checkbox');
    this.checkbox.addEventListener('change', this.onChange.bind(this));

    this.label.append(this.checkbox);
    this.control.append(this.label);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  private onChange(): void {
    if (this.checkbox.checked) {
      this.label.classList.add('control-panel__checkbox-label_checked');
    } else {
      this.label.classList.remove('control-panel__checkbox-label_checked');
    }

    this.notify('controlPanelDataUpdated');
  }

  setState(state: boolean): void {
    this.checkbox.checked = state;
    this.onChange();
  }

  getState(): boolean {
    return this.checkbox.checked;
  }
}
