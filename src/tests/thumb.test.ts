/**
 * @jest-environment jsdom
 */

import Thumb from '../plugins/simple-slider/view/thumb/thumb';

let thumb: Thumb;

beforeEach(() => {
  thumb = new Thumb();
});

describe('Set z-index', () => {
  test('Thumb z-inex should be 5', () => {
    thumb.setZIndex(5);
    expect(thumb.getElement().style.zIndex).toBe('5');
  });
  test('Thumb z-inex should be 8', () => {
    thumb.setZIndex(8);
    expect(thumb.getElement().style.zIndex).toBe('8');
  });
});

describe('Reset z-index', () => {
  test('Thumb z-inex should be ""', () => {
    thumb.setZIndex(4);
    thumb.resetZIndex();
    expect(thumb.getElement().style.zIndex).toBe('');
  });
});

describe('Move to', () => {
  test('Thumb last position should be {left: 40, top: 11}', () => {
    thumb.moveTo({ left: 40, top: 11 });
    expect(thumb.getPosition().left).toBe(40);
    expect(thumb.getPosition().top).toBe(11);
  });
  test('Thumb element left should be 80px', () => {
    thumb.moveTo({ left: 80, top: 11 });
    expect(thumb.getElement().style.left).toBe('80px');
  });
  test('Thumb element top should be 54px', () => {
    thumb.moveTo({ left: 80, top: 54 });
    expect(thumb.getElement().style.top).toBe('54px');
  });
});
