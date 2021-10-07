/**
 * @jest-environment jsdom
 */

/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */

import UIControl from '../plugins/simple-js-slider/view/ui-control/ui-control';

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

describe('Конструктор класса UIControl', () => {
  test('Элемент UIControl должен содержать элемент с классом some-element', () => {
    expect(control['control'].classList.contains('some-element')).toBe(true);
  });
  test('Элемент UIControl должен содержать элемент с классом some-element_horizontal', () => {
    expect(
      control['control'].classList.contains('some-element_horizontal'),
    ).toBe(true);
  });
  test('Элемент UIControl должен содержать элемент с классом some-element_vertical', () => {
    control = new UIControl('some-element', 'vertical');
    expect(control['control'].classList.contains('some-element_vertical')).toBe(
      true,
    );
  });
});

describe('Методы setPosition and getPosition класса UIControl', () => {
  test('Позиция элемента UIControl должна соответствовать переданному в метод setPosition объекту', () => {
    const elementParrent = document.createElement('div');
    elementParrent.style.left = '100px';
    elementParrent.style.top = '40px';
    elementParrent.append(control.getControl());
    control['setPosition']({ left: 80, top: 20 });
    expect(control.getPosition().left).toBe(80);
    expect(control.getPosition().top).toBe(20);
  });
  test('Позиция элемента UIControl должна соответствовать переданному в метод setPosition объекту', () => {
    control['setPosition']({ left: 20, top: 10 });
    expect(control.getPosition().left).toBe(20);
    expect(control.getPosition().top).toBe(10);
  });
});

describe('Метод getControl класса UIControl', () => {
  test('Элемент UIControl должен существовать', () => {
    expect(control.getControl()).not.toBeNull();
  });
  test('Элемент UIControl должен существовать', () => {
    control = new UIControl('some-element', 'vertical');
    expect(control.getControl()).not.toBeNull();
  });
});

describe('Метод getSize класса UIControl', () => {
  test('Метод должен возвращать  объект соответствующий свойствам style.width и style.height элемента UIControl', () => {
    control['control'].style.width = '400px';
    control['control'].style.height = '50px';
    expect(control.getSize().width).toBe(400);
    expect(control.getSize().height).toBe(50);
  });
  test('Метод должен возвращать  объект соответствующий свойствам style.width и style.height элемента UIControl', () => {
    control['control'].style.width = '250px';
    control['control'].style.height = '40px';
    expect(control.getSize().width).toBe(250);
    expect(control.getSize().height).toBe(40);
  });
});

describe('Метод switchToHorizontal класса UIControl', () => {
  test('Элемент UIControl не должен содержать класс some-element_vertical', () => {
    control = new UIControl('some-element', 'vertical');
    control.switchToHorizontal();
    expect(control['control'].classList.contains('some-element_vertical')).toBe(
      false,
    );
  });
  test('Элемент UIControl должен содержать класс some-element_horizontal', () => {
    control = new UIControl('some-element', 'vertical');
    control.switchToHorizontal();
    expect(
      control['control'].classList.contains('some-element_horizontal'),
    ).toBe(true);
  });
});

describe('Метод switchToVertical класса UIControl', () => {
  test('Элемент UIControl не должен содержать класс some-element_horizontal', () => {
    control.switchToVertical();
    expect(
      control['control'].classList.contains('some-element_horizontal'),
    ).toBe(false);
  });
  test('Элемент UIControl должен содержать класс some-element_vertical', () => {
    control.switchToVertical();
    expect(control['control'].classList.contains('some-element_vertical')).toBe(
      true,
    );
  });
});

describe('Метод remove класса UIControl', () => {
  test('Элемент UIControl не должен существовать в DOM', () => {
    const body = document.querySelector('body');
    body?.append(control.getControl());
    control.remove();
    expect(document.querySelector('.some-element')).toBe(null);
  });
});

describe('Метод getOrientation класса UIControl', () => {
  test('Метод должен возвращать текущую ориентацию элемента', () => {
    expect(control.getOrientation()).toBe('horizontal');
  });
  test('Метод должен возвращать текущую ориентацию элемента', () => {
    control = new UIControl('some-element', 'vertical');
    expect(control.getOrientation()).toBe('vertical');
  });
});

describe('Метод getRect класса UIControl', () => {
  test('Метод должен возвращать объект с позицией прямоугольника в который вписан элемент UIControl', () => {
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
  test('Метод должен возвращать объект с позицией прямоугольника в который вписан элемент UIControl', () => {
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

describe('Метод getStyle класса UIControl', () => {
  test('Метод должен возвращать значение стилевого свойства, переданного в параметрах', () => {
    control['control'].style.width = '138px';
    expect(control.getStyle('width')).toBe('138px');
  });
  test('Метод должен возвращать значение стилевого свойства, переданного в параметрах', () => {
    expect(control.getStyle('someStyle')).toBe('');
  });
});
