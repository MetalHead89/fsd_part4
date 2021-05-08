import { IGroupElements } from '../interfaces';

/**
 * Оборачивает полученные элементы в div с заданным классом
 * @param {string} wrapperClass - класс, который будет назначен обёртке
 * @param {HTMLElement[]} - массив элементов, которые требуется обернуть
 * @returns {HTMLDivElement} - элементы в обёртке
 */
function groupElements(params: IGroupElements): HTMLDivElement {
  const wrapper: HTMLDivElement = document.createElement('div');
  wrapper.className = params.wrapperClass;

  if (params.header !== undefined) {
    const header = document.createElement('label');
    header.classList.add('control-panel__radio-group-title');
    header.innerText = params.header;
    wrapper.append(header);
  }

  for (
    let elementIndex = 0;
    elementIndex < params.elements.length;
    elementIndex += 1
  ) {
    wrapper.append(params.elements[elementIndex]);
  }

  return wrapper;
}

export default groupElements;
