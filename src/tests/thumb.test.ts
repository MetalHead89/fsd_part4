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
