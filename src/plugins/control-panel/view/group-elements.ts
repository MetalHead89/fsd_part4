/**
 * Оборачивает полученные элементы в div с заданным классом
 * @param {string} wrapperClass - класс, который будет назначен обёртке
 * @param {HTMLElement[]} - массив элементов, которые требуется обернуть
 * @returns {HTMLDivElement} - элементы в обёртке
 */
export default function wrapElements(
  wrapperClass: string,
  ...elements: HTMLDivElement[]
): HTMLDivElement {
  const wrapper: HTMLDivElement = document.createElement('div');
  wrapper.className = wrapperClass;

  for (
    let elementIndex = 0;
    elementIndex < elements.length;
    elementIndex += 1
  ) {
    wrapper.append(elements[elementIndex]);
  }

  return wrapper;
}
