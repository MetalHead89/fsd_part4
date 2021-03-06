import Element from '../element/element';

class Container extends Element {
  constructor() {
    super('slider');
  }

  append(control: HTMLDivElement): void {
    this.element.append(control);
  }
}

export default Container;
