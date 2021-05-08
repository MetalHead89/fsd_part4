import Subject from '../../../simple-slider/subject/subject';

class TextField extends Subject {
  private control: HTMLDivElement;
  private field: HTMLInputElement;
  private label: HTMLLabelElement;

  constructor(labelText: string) {
    super();
    this.control = document.createElement('div');
    this.field = document.createElement('input');
    this.label = document.createElement('label');

    this.init(labelText);
  }

  /**
   * Возвращает компонент текстового поля
   * @returns {HTMLDivElement} - группа HTML элементов обернутая в div
   */
  getControl(): HTMLDivElement {
    return this.control;
  }

  /**
   * Возвращает значение введённое в текстовое поле
   * @returns {number} - значение введённое в текстовое поле
   */
  getValue(): number {
    return parseInt(this.field.value, 10);
  }

  /**
   * Записывает значение в текстовое поле
   * @param {number} value - значение которое должно быть записано в текстовое поле
   */
  setValue(value: number): void {
    this.field.value = `${value}`;
  }

  /**
   * Инициализирует текстовое поле. Добавляет классы, слушатели событий, лейблы и т.п.
   * для его составляющих и компонует все в единый элемент
   * @param {string} labelText - текст лейбла
   */
  private init(labelText: string) {
    this.control.classList.add('slider-panel__text-field-control');

    this.field.type = 'number';
    this.field.classList.add('control-panel__text-field');
    this.field.addEventListener('blur', this.reportChanges.bind(this));
    this.field.onkeypress = TextField.removeNonDigitChar;

    this.label.classList.add('slider-panel__text-field-label');
    this.label.innerText = labelText;
    this.label.append(this.field);

    this.control.append(this.label);
  }

  /**
   * Оповещает подписчиков, об изменении данных
   */
  private reportChanges() {
    this.notify('controlPanelDataUpdated');
  }

  /**
   * Удаляет из текстового поля символы, не являющиеся цифрами
   * @param {KeyboardEvent} event - событие клавиатуры
   */
  private static removeNonDigitChar(event: KeyboardEvent): boolean {
    return /[-\d]/.test(event.key);
  }
}

export default TextField;
