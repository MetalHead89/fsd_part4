/**
 * @jest-environment jsdom
 */

/* eslint-disable dot-notation */

import Element from '../plugins/simple-slider/view/element/element';

let element: Element;

beforeEach(() => {
  element = new Element('some-element');
});

describe('Constructor', () => {
  test('Element should have a class some-element', () => {
    expect(element['element'].classList.contains('some-element')).toBe(true);
  });
  test('Element should have a class some-element_horizontal', () => {
    expect(
      element['element'].classList.contains('some-element_horizontal'),
    ).toBe(true);
  });
  test('Element should have a class some-element_vertical', () => {
    element = new Element('some-element', 'vertical');
    expect(element['element'].classList.contains('some-element_vertical')).toBe(
      true,
    );
  });
});

describe('Set position and get position', () => {
  test('Element position should be {left: 80, top: 20}', () => {
    const elementParrent = document.createElement('div');
    elementParrent.style.left = '100px';
    elementParrent.style.top = '40px';
    elementParrent.append(element.getElement());
    element['setPosition']({ left: 80, top: 20 });
    expect(element.getPosition().left).toBe(80);
    expect(element.getPosition().top).toBe(20);
  });
  test('Element position should be {left: 20, top: 10}', () => {
    element['setPosition']({ left: 20, top: 10 });
    expect(element.getPosition().left).toBe(20);
    expect(element.getPosition().top).toBe(10);
  });
});

describe('Get element', () => {
  test('Element should be exist', () => {
    expect(element.getElement()).not.toBeNull();
  });
  test('Element should be exist', () => {
    element = new Element('some-element', 'vertical');
    expect(element.getElement()).not.toBeNull();
  });
});
