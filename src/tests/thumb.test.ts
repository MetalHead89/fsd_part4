/**
 * @jest-environment jsdom
 */

/* eslint-disable dot-notation */

import Thumb from '../plugins/simple-js-slider/view/thumb/thumb';

let thumb: Thumb;

beforeEach(() => {
  thumb = new Thumb();
});

describe('Метод moveTo класса Thumb', () => {
  test('Позиция элемента Thumb должна соответствовать переданному в метод объекту', () => {
    thumb.moveTo({ left: 40, top: 11 });
    expect(thumb.getPosition().left).toBe(40);
    expect(thumb.getPosition().top).toBe(11);
  });
  test('Позиция left элемента Thumb должна соответствовать переданному в метод объекту', () => {
    thumb.moveTo({ left: 80, top: 11 });
    expect(thumb.getControl().style.left).toBe('80px');
  });
  test('Позиция top элемента Thumb должна соответствовать переданному в метод объекту', () => {
    thumb.moveTo({ left: 80, top: 54 });
    expect(thumb.getControl().style.top).toBe('54px');
  });
});

describe('Событие dragstart класса Thumb', () => {
  test('Событие должно возвратить false', () => {
    const evt = new window.Event('dragstart');
    expect(thumb.getControl().dispatchEvent(evt)).toBe(false);
  });
});

describe('Метод setThumbShift класса Thumb', () => {
  test('Метод должен корректно вычислять разность left и top позиций объектов из своих параметров', () => {
    thumb['setThumbShift']({ left: 85, top: 47 }, { left: 83, top: 42 });
    expect(thumb['shift'].shiftX).toBe(2);
    expect(thumb['shift'].shiftY).toBe(5);
  });
  test('Метод должен корректно вычислять разность left и top позиций объектов из своих параметров', () => {
    thumb['setThumbShift']({ left: 100, top: 80 }, { left: 95, top: 77 });
    expect(thumb['shift'].shiftX).toBe(5);
    expect(thumb['shift'].shiftY).toBe(3);
  });
});

describe('Метод drag класса Thumb', () => {
  test('Метод setPosition должен быть вызван один раз', () => {
    const spy = spyOn<any>(thumb, 'setPosition');
    const moveEvt = new window.MouseEvent('pointermove') as PointerEvent;
    thumb['drag'](moveEvt);
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод notify должен быть вызван один раз', () => {
    const spy = spyOn<any>(thumb.subject, 'notify');
    const moveEvt = new window.MouseEvent('pointermove') as PointerEvent;
    thumb['drag'](moveEvt);
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод setPosition класса Thumb', () => {
  test('Метод должен корректно вычислять позицию Thumb исходя из учитывая величину смещения относительно курсора', () => {
    thumb['shift'] = { shiftX: 5, shiftY: 3 };
    thumb['setPosition']({ left: 45, top: 20 });
    expect(thumb.getPosition().left).toBe(40);
    expect(thumb.getPosition().top).toBe(17);
  });
  test('Метод должен корректно вычислять позицию Thumb исходя из учитывая величину смещения относительно курсора', () => {
    thumb['shift'] = { shiftX: 8, shiftY: 9 };
    thumb['setPosition']({ left: 146, top: 146 });
    expect(thumb.getPosition().left).toBe(138);
    expect(thumb.getPosition().top).toBe(137);
  });
});

describe('Метод enableSelection класса Thumb', () => {
  test('Document.onselectstart должен быть null', () => {
    thumb['endDrag']();
    expect(document.onselectstart).toBe(null);
  });
  test('Document.pointerdown должен быть null', () => {
    thumb['endDrag']();
    expect(document.onpointerdown).toBe(null);
  });
});

describe('Метод disableSelection класса Thumb', () => {
  test('Document.pointerdown не должен быть null', () => {
    const evt = new window.Event('pointerdown');
    thumb.getControl().dispatchEvent(evt);
    expect(document.onselectstart).not.toBe(null);
  });
  test('Document.selectstart должен возвращать false', () => {
    const evt = new window.Event('pointerdown');
    thumb.getControl().dispatchEvent(evt);

    if (document.onselectstart !== null) {
      const docEvt = new window.Event('selectstart');
      expect(document.onselectstart(docEvt)).toBe(false);
    }
  });
  test('Document pointerdown должен возвращать false', () => {
    const evt = new window.Event('pointerdown');
    thumb.getControl().dispatchEvent(evt);

    if (document.onpointerdown !== null) {
      const docEvt = new window.Event('pointerdown') as PointerEvent;
      expect(document.onpointerdown(docEvt)).toBe(false);
    }
  });
});
