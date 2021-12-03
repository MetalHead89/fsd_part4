/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable dot-notation */

import Observer from '../plugins/simple-js-slider/observer/Observer';

let observer = new Observer();

beforeEach(() => {
  observer = new Observer();
});

describe('Метод register класса Observer', () => {
  test('Должны быть добавлены наблюдатели события thumbMove', () => {
    observer.register('thumbMove', () => {});
    expect(observer['observers'].thumbMove.length).toBe(1);

    observer.register('thumbMove', () => {});
    expect(observer['observers'].thumbMove.length).toBe(2);

    observer.register('thumbMove', () => {});
    expect(observer['observers'].thumbMove.length).toBe(3);
  });
});

describe('Метод remove класса Observer', () => {
  test('Наблюдатели события thumbMove должны быть удалены', () => {
    const func1 = () => {};
    const func2 = () => {};
    const func3 = () => {};

    observer.register('thumbMove', func1);
    observer.register('thumbMove', func2);
    observer.register('thumbMove', func3);

    expect(observer['observers'].thumbMove.length).toBe(3);

    observer.unsubscribe('thumbMove', func1);
    expect(observer['observers'].thumbMove.length).toBe(2);

    observer.unsubscribe('thumbMove', func2);
    expect(observer['observers'].thumbMove.length).toBe(1);

    observer.unsubscribe('thumbMove', func3);
    expect(observer['observers'].thumbMove.length).toBe(0);
  });
});

describe('Метод notify класса Observer', () => {
  test('Наблюдатели события thumbMove должны быть оповещены о наступлении события', () => {
    let numberOfNotifiedObservers = 0;

    const func1 = () => {
      numberOfNotifiedObservers += 1;
    };
    const func2 = () => {
      numberOfNotifiedObservers += 1;
    };
    const func3 = () => {
      numberOfNotifiedObservers += 1;
    };

    observer.register('thumbMove', func1);
    observer['notify']('thumbMove');
    expect(numberOfNotifiedObservers).toBe(1);

    numberOfNotifiedObservers = 0;
    observer.register('thumbMove', func2);
    observer['notify']('thumbMove');
    expect(numberOfNotifiedObservers).toBe(2);

    numberOfNotifiedObservers = 0;
    observer.register('thumbMove', func3);
    observer['notify']('thumbMove');
    expect(numberOfNotifiedObservers).toBe(3);
  });

  test('Наблюдатели события thumbMove не должны быть оповещены о наступлении события', () => {
    let numberOfNotifiedObservers = 0;

    const func1 = () => {
      numberOfNotifiedObservers += 1;
    };
    const func2 = () => {
      numberOfNotifiedObservers += 1;
    };
    const func3 = () => {
      numberOfNotifiedObservers += 1;
    };

    observer.register('thumbMove', func1);
    observer.register('thumbMove', func2);
    observer.register('thumbMove', func3);

    observer['notify']('clickToScale');
    expect(numberOfNotifiedObservers).toBe(0);
  });
});
