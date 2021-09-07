/**
 * @jest-environment jsdom
 */

/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */

import UIControl from '../plugins/simple-slider/view/ui-control/ui-control';

let control: UIControl;

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
  control = new UIControl('some-element');
});

describe('Constructor', () => {
  test('UI-Control should have a class some-element', () => {
    expect(control['control'].classList.contains('some-element')).toBe(true);
  });
  test('UI-Control should have a class some-element_horizontal', () => {
    expect(
      control['control'].classList.contains('some-element_horizontal'),
    ).toBe(true);
  });
  test('UI-Control should have a class some-element_vertical', () => {
    control = new UIControl('some-element', 'vertical');
    expect(control['control'].classList.contains('some-element_vertical')).toBe(
      true,
    );
  });
});

describe('Set position and get position', () => {
  test('UI-Control position should be {left: 80, top: 20}', () => {
    const elementParrent = document.createElement('div');
    elementParrent.style.left = '100px';
    elementParrent.style.top = '40px';
    elementParrent.append(control.getControl());
    control['setPosition']({ left: 80, top: 20 });
    expect(control.getPosition().left).toBe(80);
    expect(control.getPosition().top).toBe(20);
  });
  test('UI-Control position should be {left: 20, top: 10}', () => {
    control['setPosition']({ left: 20, top: 10 });
    expect(control.getPosition().left).toBe(20);
    expect(control.getPosition().top).toBe(10);
  });
});

describe('Get element', () => {
  test('UI-Control should be exist', () => {
    expect(control.getControl()).not.toBeNull();
  });
  test('UI-Control should be exist', () => {
    control = new UIControl('some-element', 'vertical');
    expect(control.getControl()).not.toBeNull();
  });
});

describe('Get size', () => {
  test('UIControl size should be {width: 400, height: 50}', () => {
    control['control'].style.width = '400px';
    control['control'].style.height = '50px';
    expect(control.getSize().width).toBe(400);
    expect(control.getSize().height).toBe(50);
  });
  test('UI-Control size should be {width: 250, height: 40}', () => {
    control['control'].style.width = '250px';
    control['control'].style.height = '40px';
    expect(control.getSize().width).toBe(250);
    expect(control.getSize().height).toBe(40);
  });
});

describe('Switch to horizontal', () => {
  test('UI-Control should be not contain class some-element_vertical', () => {
    control = new UIControl('some-element', 'vertical');
    control.switchToHorizontal();
    expect(control['control'].classList.contains('some-element_vertical')).toBe(
      false,
    );
  });
  test('UI-Control should be contain class some-element_horizontal', () => {
    control = new UIControl('some-element', 'vertical');
    control.switchToHorizontal();
    expect(
      control['control'].classList.contains('some-element_horizontal'),
    ).toBe(true);
  });
});

describe('Switch to vertical', () => {
  test('UI-Control should be not contain class some-element_horizontal', () => {
    control.switchToVertical();
    expect(
      control['control'].classList.contains('some-element_horizontal'),
    ).toBe(false);
  });
  test('UI-Control should be contain class some-element_vertical', () => {
    control.switchToVertical();
    expect(control['control'].classList.contains('some-element_vertical')).toBe(
      true,
    );
  });
});

describe('Remove', () => {
  test('UI-Control should be not exist in the DOM', () => {
    const body = document.querySelector('body');
    body?.append(control.getControl());
    control.remove();
    expect(document.querySelector('.some-element')).toBe(null);
  });
});

describe('Get orientation', () => {
  test('UI-Control orientation should be horizontal', () => {
    expect(control.getOrientation()).toBe('horizontal');
  });
  test('UI-Control orientation should be vertical', () => {
    control = new UIControl('some-element', 'vertical');
    expect(control.getOrientation()).toBe('vertical');
  });
});

describe('Get rect', () => {
  test('UI-Control rect should be {top: 40, left: 45, bottom: 50, right: 55}', () => {
    control['control'].getBoundingClientRect = jest.fn(() => {
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
    expect(control.getRect().top).toBe(40);
    expect(control.getRect().left).toBe(45);
    expect(control.getRect().bottom).toBe(50);
    expect(control.getRect().right).toBe(55);
  });
  test('UI-Control rect should be {top: 11, left: 49, bottom: 60, right: 5}', () => {
    control['control'].getBoundingClientRect = jest.fn(() => {
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
    expect(control.getRect().top).toBe(11);
    expect(control.getRect().left).toBe(49);
    expect(control.getRect().bottom).toBe(60);
    expect(control.getRect().right).toBe(5);
  });
});

describe('Get style', () => {
  test('UI-Control width style should be 138px', () => {
    control['control'].style.width = '138px';
    expect(control.getStyle('width')).toBe('138px');
  });
  test('UI-Control width style should be ""', () => {
    expect(control.getStyle('someStyle')).toBe('');
  });
});
