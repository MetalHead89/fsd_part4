import Element from '../../element/element';

jest.mock('../../element/element');

export default class PopUp extends Element {
  private TEST_OK = true;

  constructor() {
    super('slider__pop-up');
  }

  update(): boolean {
    return this.TEST_OK;
  }
}
