import Element from '../../element/element';

jest.mock('../../element/element');

export default class Container extends Element {
  testOk = true;

  constructor() {
    super('slider');
  }

  append(element: HTMLDivElement): void {
    this.element.append(element);
  }
}
