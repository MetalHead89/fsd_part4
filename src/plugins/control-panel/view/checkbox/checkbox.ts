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

  /**
   * Инициализирует чекбокс. Добавляет классы, слушатели событий, лейблы и т.п.
   * для его составляющих и компонует все в единый элемент
   * @param {ICheckboxParams} params - параметры чекбокса
   */
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

  /**
   * Возвращает компонент чекбокса
   * @returns {HTMLDivElement} - группа HTML элементов обернутая в div
   */
  getControl(): HTMLDivElement {
    return this.control;
  }

  /**
   * Добавляет/удаляет галочку, в зависимости от состояния чекбокса.
   * Оповещает подписчиков об изменении состояния чекбокса
   */
  private onChange(): void {
    if (this.checkbox.checked) {
      this.label.classList.add('control-panel__checkbox-label_checked');
    } else {
      this.label.classList.remove('control-panel__checkbox-label_checked');
    }

    this.notify('controlPanelDataUpdated');
  }

  /**
   * Переводит чекбокс в состояние выбран/не выбран в зависимости от полученного состояния
   * @param {boolean} state - состояние радиокнопки
   */
  setState(state: boolean): void {
    this.checkbox.checked = state;
    this.onChange();
  }

  /**
   * Возвращает состояние чекбокса
   * @returns {boolean} - состояние чекбокса
   */
  getState(): boolean {
    return this.checkbox.checked;
  }
}

export default Checkbox;
