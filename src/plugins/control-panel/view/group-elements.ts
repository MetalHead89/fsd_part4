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
    header.classList.add('control-panel__group-title');
    header.innerText = params.header;
    wrapper.append(header);
  }

  params.elements.forEach((element) => {
    wrapper.append(element);
  });

  return wrapper;
}

export default groupElements;
