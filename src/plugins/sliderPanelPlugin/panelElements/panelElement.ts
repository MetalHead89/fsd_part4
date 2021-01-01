/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { IInputControl } from '../interfaces';

class PanelElement {
  private MIN_RAND_NUMBER = 1;
  private MAX_RAND_NUMBER = 100000;
  private element = document.createElement('input');

  protected generateID(prefix: string): string {
    while (true) {
      const id = prefix + this.generateRandNumber();

      if (!document.getElementById(id)) {
        return id;
      }
    }
  }

  protected generateName(prefix: string): string {
    while (true) {
      const name = prefix + this.generateRandNumber();

      if (document.getElementsByName(name).length === 0) {
        return name;
      }
    }
  }

  private generateRandNumber(): number {
    return Math.floor(this.MIN_RAND_NUMBER + Math.random()
      * (this.MAX_RAND_NUMBER + 1 - this.MIN_RAND_NUMBER));
  }

  protected createControl(params: IInputControl): HTMLDivElement {
    this.createElement(params.inputElement, params.inputType, params.inputClass);

    const controlLabel: HTMLLabelElement = document.createElement('label');
    controlLabel.classList.add(params.labelClass);
    controlLabel.textContent = params.labelText;

    if (params.id) {
      this.element.id = params.id;
      controlLabel.htmlFor = params.id;
    }

    if (params.name) {
      this.element.name = params.name;
    }

    if (params.value) {
      this.element.value = params.value;
    }

    return PanelElement.wrapElements(params.wrapperClass, this.element, controlLabel);
  }

  private createElement(inputElement: HTMLInputElement,
    inputType: string, inputClass: string): void {
    this.element = inputElement;
    this.element.type = inputType;
    this.element.className = inputClass;
  }

  /**
   * Оборачивает полученные элементы в div с заданным классом
   * @param {string} wrapperClass - класс, который будет назначен обёртке
   * @param {HTMLElement[]} - массив элементов, которые требуется обернуть
   * @returns {HTMLDivElement} - элементы в обёртке
   */
  private static wrapElements(wrapperClass: string, ...elements: HTMLElement[]): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = wrapperClass;

    for (let elementIndex = 0; elementIndex < elements.length; elementIndex += 1) {
      wrapper.append(elements[elementIndex]);
    }

    return wrapper;
  }
}

export default PanelElement;
