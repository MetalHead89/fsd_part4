import SimpleSliderModel from '../plugins/simple-slider/model/simple-slider-model';

let model = new SimpleSliderModel();

beforeEach(() => {
  model = new SimpleSliderModel();
});

describe('Register observer', () => {
  test('Observers must be added', () => {
    expect(model['thumbsObservers'].length).toBe(0);

    const newObserverOne = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };
    const newObserverTwo = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };
    const newObserverThree = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };
    const newObserverFour = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };
    const newObserverFive = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };

    model.registerObserver(newObserverOne);
    expect(model['thumbsObservers'].length).toBe(1);

    model.registerObserver(newObserverTwo);
    expect(model['thumbsObservers'].length).toBe(2);

    model.registerObserver(newObserverThree);
    expect(model['thumbsObservers'].length).toBe(3);

    model.registerObserver(newObserverFour);
    expect(model['thumbsObservers'].length).toBe(4);

    model.registerObserver(newObserverFive);
    expect(model['thumbsObservers'].length).toBe(5);
  });
});
