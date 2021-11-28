import UIControl from '../../UIControl/UIControl';

jest.mock('../../ui-control/ui-control');

export default class Track extends UIControl {
  constructor() {
    super('slider__track');
  }
}
