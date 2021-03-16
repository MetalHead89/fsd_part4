/**
 * @jest-environment jsdom
 */

/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */

import Element from '../plugins/simple-slider/view/element/element';

let element: Element;

// Расширение HTML элементов дополнительными геттерами для тестирования
Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
    },
  },
  offsetTop: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).marginTop) || 0;
    },
  },
  offsetHeight: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).height) || 0;
    },
  },
  offsetWidth: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).width) || 0;
    },
  },
});

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

describe('Get size', () => {
  test('Element size should be {width: 400, height: 50}', () => {
    element['element'].style.width = '400px';
    element['element'].style.height = '50px';
    expect(element.getSize().width).toBe(400);
    expect(element.getSize().height).toBe(50);
  });
  test('Element size should be {width: 250, height: 40}', () => {
    element['element'].style.width = '250px';
    element['element'].style.height = '40px';
    expect(element.getSize().width).toBe(250);
    expect(element.getSize().height).toBe(40);
  });
});

describe('Switch to horizontal', () => {
  test('Element should be not contain class some-element_vertical', () => {
    element = new Element('some-element', 'vertical');
    element.switchToHorizontal();
    expect(element['element'].classList.contains('some-element_vertical')).toBe(
      false,
    );
  });
  test('Element should be contain class some-element_horizontal', () => {
    element = new Element('some-element', 'vertical');
    element.switchToHorizontal();
    expect(
      element['element'].classList.contains('some-element_horizontal'),
    ).toBe(true);
  });
});

describe('Switch to vertical', () => {
  test('Element should be not contain class some-element_horizontal', () => {
    element.switchToVertical();
    expect(
      element['element'].classList.contains('some-element_horizontal'),
    ).toBe(false);
  });
  test('Element should be contain class some-element_vertical', () => {
    element.switchToVertical();
    expect(element['element'].classList.contains('some-element_vertical')).toBe(
      true,
    );
  });
});

describe('Remove', () => {
  test('Element should be not exist in the DOM', () => {
    const body = document.querySelector('body');
    body?.append(element.getElement());
    element.remove();
    expect(document.querySelector('.some-element')).toBe(null);
  });
});

describe('Get orientation', () => {
  test('Element orientation should be horizontal', () => {
    expect(element.getOrientation()).toBe('horizontal');
  });
  test('Element orientation should be vertical', () => {
    element = new Element('some-element', 'vertical');
    expect(element.getOrientation()).toBe('vertical');
  });
});

describe('Get rect', () => {
  test('Element rect should be {top: 40, left: 45, bottom: 50, right: 55}', () => {
    element['element'].getBoundingClientRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 40,
        left: 45,
        bottom: 50,
        right: 55,
        x: 35,
        y: 48,
        toJSON: () => null,
      };
    });
    expect(element.getRect().top).toBe(40);
    expect(element.getRect().left).toBe(45);
    expect(element.getRect().bottom).toBe(50);
    expect(element.getRect().right).toBe(55);
  });
  test('Element rect should be {top: 11, left: 49, bottom: 60, right: 5}', () => {
    element['element'].getBoundingClientRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 11,
        left: 49,
        bottom: 60,
        right: 5,
        x: 35,
        y: 48,
        toJSON: () => null,
      };
    });
    expect(element.getRect().top).toBe(11);
    expect(element.getRect().left).toBe(49);
    expect(element.getRect().bottom).toBe(60);
    expect(element.getRect().right).toBe(5);
  });
});

describe('Get style', () => {
  test('Element width style should be 138px', () => {
    element['element'].style.width = '138px';
    expect(element.getStyle('width')).toBe('138px');
  });
  test('Element width style should be ""', () => {
    expect(element.getStyle('someStyle')).toBe('');
  });
});
