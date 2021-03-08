import Element from '../../element/element';

jest.mock('../../element/element');

export default class Track extends Element {
  constructor() {
    super('slider__track');
  }
}
