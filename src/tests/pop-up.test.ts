/**
 * @jest-environment jsdom
 */

import PopUp from '../plugins/simple-slider/view/pop-up/pop-up';

let popUp: PopUp;

beforeEach(() => {
  popUp = new PopUp();
});

describe('Update', () => {
  test('Popup value should be 50', () => {
    const params = { value: 50, position: { left: 30, top: 50 } };
    popUp.update(params);
    expect(popUp.getControl().innerHTML).toBe('50');
  });
  test('Popup value should be 120', () => {
    const params = { value: 120, position: { left: 30, top: 50 } };
    popUp.update(params);
    expect(popUp.getControl().innerHTML).toBe('120');
  });
  test('Popup position should be { left: 30, top: 50 }', () => {
    const params = { value: 50, position: { left: 30, top: 50 } };
    popUp.update(params);
    expect(popUp.getControl().style.left).toBe('30px');
    expect(popUp.getControl().style.top).toBe('50px');
  });
  test('Popup position should be { left: 90, top: 14 }', () => {
    const params = { value: 50, position: { left: 90, top: 14 } };
    popUp.update(params);
    expect(popUp.getControl().style.left).toBe('90px');
    expect(popUp.getControl().style.top).toBe('14px');
  });
});
