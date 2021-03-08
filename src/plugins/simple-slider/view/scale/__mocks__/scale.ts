import Element from '../../element/element';

jest.mock('../../element/element');

export default class PopUp extends Element {
  constructor() {
    super('slider__scale');
  }
}
