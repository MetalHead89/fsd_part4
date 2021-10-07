/**
 * @jest-environment jsdom
 */

import PopUp from '../plugins/simple-js-slider/view/pop-up/pop-up';

let popUp: PopUp;

beforeEach(() => {
  popUp = new PopUp();
});

describe('Метод Update класса PopUp', () => {
  test('Свойство innerHTML элемента PopUp должно быть изменено в соответствии с переданным в методе объектом', () => {
    const params = { value: 50, position: { left: 30, top: 50 } };
    popUp.update(params);
    expect(popUp.getControl().innerHTML).toBe('50');
  });
  test('Свойство innerHTML элемента PopUp должно быть изменено в соответствии с переданным в методе объектом', () => {
    const params = { value: 120, position: { left: 30, top: 50 } };
    popUp.update(params);
    expect(popUp.getControl().innerHTML).toBe('120');
  });
  test('Свойство style элемента PopUp должно быть изменено в соответствии с переданным в методе объектом', () => {
    const params = { value: 50, position: { left: 30, top: 50 } };
    popUp.update(params);
    expect(popUp.getControl().style.left).toBe('30px');
    expect(popUp.getControl().style.top).toBe('50px');
  });
  test('Свойство style элемента PopUp должно быть изменено в соответствии с переданным в методе объектом', () => {
    const params = { value: 50, position: { left: 90, top: 14 } };
    popUp.update(params);
    expect(popUp.getControl().style.left).toBe('90px');
    expect(popUp.getControl().style.top).toBe('14px');
  });
});
