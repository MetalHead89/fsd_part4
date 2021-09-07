import UIControl from '../../ui-control/ui-control';

jest.mock('../../ui-control/ui-control');

export default class Track extends UIControl {
  constructor() {
    super('slider__track');
  }
}
