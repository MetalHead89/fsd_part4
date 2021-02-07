/* eslint-disable dot-notation */

import Subject from '../plugins/simple-slider/subject/subject';

let subject = new Subject();

beforeEach(() => {
  subject = new Subject();
});

describe('Register', () => {
  test('Observers must be added', () => {
    const newObserverOne = {
      update(): void {
        /* some operations */
      },
    };
    const newObserverTwo = {
      update(): void {
        /* some operations */
      },
    };
    const newObserverThree = {
      update(): void {
        /* some operations */
      },
    };

    subject.register('thumbMove', newObserverOne);
    expect(subject['observers'].thumbMove.length).toBe(1);

    subject.register('thumbMove', newObserverTwo);
    expect(subject['observers'].thumbMove.length).toBe(2);

    subject.register('thumbMove', newObserverThree);
    expect(subject['observers'].thumbMove.length).toBe(3);
  });
});
