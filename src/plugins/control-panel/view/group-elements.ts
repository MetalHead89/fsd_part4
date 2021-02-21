import { IGroupElements } from '../interfaces';

/**
 * Оборачивает полученные элементы в div с заданным классом
 * @param {string} wrapperClass - класс, который будет назначен обёртке
 * @param {HTMLElement[]} - массив элементов, которые требуется обернуть
 * @returns {HTMLDivElement} - элементы в обёртке
 */
export default function groupElements(params: IGroupElements): HTMLDivElement {
  const wrapper: HTMLDivElement = document.createElement('div');
  wrapper.className = params.wrapperClass;

  for (
    let elementIndex = 0;
    elementIndex < params.elements.length;
    elementIndex += 1
  ) {
    if (params.header !== undefined) {
      const header = document.createElement('label');
      header.classList.add('control-panel__radio-group-header');
      header.innerText = params.header;
      wrapper.append(header);
    }

    wrapper.append(params.elements[elementIndex]);
  }

  return wrapper;
}
