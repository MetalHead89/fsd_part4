/**
 * @jest-environment jsdom
 */

/* eslint-disable dot-notation */

import Thumb from '../plugins/simple-slider/view/thumb/thumb';

let thumb: Thumb;

beforeEach(() => {
  thumb = new Thumb();
});

describe('Move to', () => {
  test('Thumb last position should be {left: 40, top: 11}', () => {
    thumb.moveTo({ left: 40, top: 11 });
    expect(thumb.getPosition().left).toBe(40);
    expect(thumb.getPosition().top).toBe(11);
  });
  test('Thumb element left should be 80px', () => {
    thumb.moveTo({ left: 80, top: 11 });
    expect(thumb.getControl().style.left).toBe('80px');
  });
  test('Thumb element top should be 54px', () => {
    thumb.moveTo({ left: 80, top: 54 });
    expect(thumb.getControl().style.top).toBe('54px');
  });
});

describe('Thumb dragstart event', () => {
  test('Event should return false', () => {
    const evt = new window.Event('dragstart');
    expect(thumb.getControl().dispatchEvent(evt)).toBe(false);
  });
});

describe('Set thumb shift', () => {
  test('Thumb shift should be {shiftX: 2, shiftY: 5}', () => {
    thumb['setThumbShift']({ left: 85, top: 47 }, { left: 83, top: 42 });
    expect(thumb['shift'].shiftX).toBe(2);
    expect(thumb['shift'].shiftY).toBe(5);
  });
  test('Thumb shift should be {shiftX: 5, shiftY: 3}', () => {
    thumb['setThumbShift']({ left: 100, top: 80 }, { left: 95, top: 77 });
    expect(thumb['shift'].shiftX).toBe(5);
    expect(thumb['shift'].shiftY).toBe(3);
  });
});

describe('Drag', () => {
  test('SetPosition method should be called once', () => {
    const spy = spyOn<any>(thumb, 'setPosition');
    const moveEvt = new window.MouseEvent('pointermove') as PointerEvent;
    thumb['drag'](moveEvt);
    expect(spy).toBeCalledTimes(1);
  });
  test('Notify method should be called once', () => {
    const spy = spyOn<any>(thumb.subject, 'notify');
    const moveEvt = new window.MouseEvent('pointermove') as PointerEvent;
    thumb['drag'](moveEvt);
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Set position', () => {
  test('Thumb position should be {left: 40, top: 17}', () => {
    thumb['shift'] = { shiftX: 5, shiftY: 3 };
    thumb['setPosition']({ left: 45, top: 20 });
    expect(thumb.getPosition().left).toBe(40);
    expect(thumb.getPosition().top).toBe(17);
  });
  test('Thumb position should be {left: 45, top: 20}', () => {
    thumb['shift'] = { shiftX: 8, shiftY: 9 };
    thumb['setPosition']({ left: 146, top: 146 });
    expect(thumb.getPosition().left).toBe(138);
    expect(thumb.getPosition().top).toBe(137);
  });
});

describe('Enable selection', () => {
  test('Document onselectstart event should be null', () => {
    thumb['endDrag']();
    expect(document.onselectstart).toBe(null);
  });
  test('Document pointerdown event should be null', () => {
    thumb['endDrag']();
    expect(document.onpointerdown).toBe(null);
  });
});

describe('Disable selection', () => {
  test('Document pointerdown event not should be null', () => {
    const evt = new window.Event('pointerdown');
    thumb.getControl().dispatchEvent(evt);
    expect(document.onselectstart).not.toBe(null);
  });
  test('Document selectstart event should return false', () => {
    const evt = new window.Event('pointerdown');
    thumb.getControl().dispatchEvent(evt);

    if (document.onselectstart !== null) {
      const docEvt = new window.Event('selectstart');
      expect(document.onselectstart(docEvt)).toBe(false);
    }
  });
  test('Document pointerdown event should return false', () => {
    const evt = new window.Event('pointerdown');
    thumb.getControl().dispatchEvent(evt);

    if (document.onpointerdown !== null) {
      const docEvt = new window.Event('pointerdown') as PointerEvent;
      expect(document.onpointerdown(docEvt)).toBe(false);
    }
  });
});
