import { IGroupElements } from '../interfaces';

function groupElements({ header, wrapperClass, elements }: IGroupElements): HTMLDivElement {
  const wrapper: HTMLDivElement = document.createElement('div');
  wrapper.className = wrapperClass;

  if (header !== undefined) {
    const title = document.createElement('label');
    title.classList.add('control-panel__group-title');
    title.innerText = header;
    wrapper.append(title);
  }

  elements.forEach((element) => {
    wrapper.append(element);
  });

  return wrapper;
}

export default groupElements;
