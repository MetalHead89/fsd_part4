import Element from '../../element/element';

jest.mock('../../element/element');

export default class Thumb extends Element {
  private TEST_OK = true;
  private subject = {
    register: () => true,
    unsubscribe: () => true,
    notify: () => true,
  };

  constructor() {
    super('slider__thumb');
  }

  resetZIndex(): boolean {
    return this.TEST_OK;
  }

  moveTo(): boolean {
    return this.TEST_OK;
  }

  register(): boolean {
    return this.TEST_OK;
  }
}
