import Element from '../../element/element';

jest.mock('../../element/element');

export default class Container extends Element {
  TEST_OK = true;

  constructor() {
    super('slider');
  }

  append(element: HTMLDivElement): void {
    this.element.append(element);
  }

  resetMargins(): boolean {
    return this.TEST_OK;
  }

  setMargins(): boolean {
    return this.TEST_OK;
  }
}
