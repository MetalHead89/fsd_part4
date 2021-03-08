import Element from '../../element/element';

jest.mock('../../element/element');

export default class ProgressBar extends Element {
  private TEST_OK = true;

  constructor() {
    super('slider__progress-bar');
  }

  update(): boolean {
    return this.TEST_OK;
  }
}
