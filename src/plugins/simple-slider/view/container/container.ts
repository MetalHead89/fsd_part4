import Element from '../element/element';

class Container extends Element {
  constructor() {
    super();
    this.element.classList.add('slider');
  }

  append(control: HTMLDivElement): void {
    this.element.append(control);
  }
}

export default Container;
