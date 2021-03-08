import Element from '../../element/element';

jest.mock('../../element/element');

export default class PopUp extends Element {
  private TEST_OK = true;

  constructor() {
    super('slider__scale');
  }

  getPointSize(): boolean {
    return this.TEST_OK;
  }
}
