/**
 * @jest-environment jsdom
 */

/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */

import SimpleSliderController from '../plugins/simple-slider/controller/simple-slider-controller';
import { ISliderSettings } from '../plugins/simple-slider/interfaces';
import SimpleSliderModel from '../plugins/simple-slider/model/simple-slider-model';
import SimpleSliderView from '../plugins/simple-slider/view/simple-slider-view';

jest.mock('../plugins/simple-slider/model/simple-slider-model');
jest.mock('../plugins/simple-slider/view/simple-slider-view');

let controller: SimpleSliderController;
let model: SimpleSliderModel;
let view: SimpleSliderView;
let wrapper: HTMLDivElement;
let settings: ISliderSettings;

beforeEach(() => {
  settings = {
    orientation: 'horizontal',
    type: 'range',
    isScale: true,
    isPopUps: true,
    min: 0,
    max: 10,
    step: 1,
    thumbOneValue: 3,
    thumbTwoValue: 7,
    sliderSize: { width: 500, height: 10 },
    thumbSize: { width: 20, height: 20 },
  };
  wrapper = document.createElement('div');
  view = new SimpleSliderView(wrapper);
  model = new SimpleSliderModel(settings);
  controller = new SimpleSliderController({ model, view });
});

describe('Метод init класса SimpleSliderController', () => {
  test('Метод setSliderSize из класса SimpleSliderModel должен быть вызван один раз', () => {
    const spy = jest.spyOn(model, 'setSliderSize');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(2);
  });
  test('Метод setThumbSize из класса SimpleSliderModel должен быть вызван один раз', () => {
    const spy = jest.spyOn(model, 'setThumbSize');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод switchToHorizontal из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'switchToHorizontal');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод switchToVertical из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'switchToVertical');
    settings.orientation = 'vertical';
    model = new SimpleSliderModel(settings);
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод switchToSingle из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'switchToSingle');
    settings.type = 'single';
    model = new SimpleSliderModel(settings);
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод switchToRange из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'switchToRange');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод enablePopUps из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'enablePopUps');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод disablePopUps из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'disablePopUps');
    settings.isPopUps = false;
    model = new SimpleSliderModel(settings);
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод update класса SimpleSliderController', () => {
  test('Метод updateThumbsState из класса SimpleSliderModel должен быть вызван один раз', () => {
    const spy = jest.spyOn(model, 'updateThumbsState');
    controller.update('thumbIsDragged');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод setThumbPositionOnClickPosition из класса SimpleSliderModel должен быть вызван один раз', () => {
    const spy = jest.spyOn(model, 'setThumbPositionOnClickPosition');
    controller.update('clickToTrack');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод setThumbPositionOnClickPosition из класса SimpleSliderModel должен быть вызван один раз', () => {
    const spy = jest.spyOn(model, 'setThumbPositionOnClickPosition');
    controller.update('clickToScale');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод init method из класса SimpleSliderController должен быть вызван один раз', () => {
    const spy = spyOn<any>(controller, 'init');
    controller.update('windowResized');
    expect(spy).toBeCalledTimes(1);
  });
  test('Различные методы класса Controller должны быть вызваны', () => {
    const spy1 = jest.spyOn(model, 'updateThumbsState');
    controller.update('emptyEvent');
    expect(spy1).toBeCalledTimes(0);

    const spy2 = jest.spyOn(model, 'setThumbPositionOnClickPosition');
    controller.update('emptyEvent');
    expect(spy2).toBeCalledTimes(0);

    const spy3 = spyOn<any>(controller, 'updateThumbsPositions');
    controller.update('emptyEvent');
    expect(spy3).toBeCalledTimes(0);

    const spy4 = spyOn<any>(controller, 'updateView');
    controller.update('emptyEvent');
    expect(spy4).toBeCalledTimes(0);

    const spy5 = spyOn<any>(controller, 'updateSliderOrientation');
    controller.update('emptyEvent');
    expect(spy5).toBeCalledTimes(0);

    const spy6 = spyOn<any>(controller, 'updateSliderType');
    controller.update('emptyEvent');
    expect(spy6).toBeCalledTimes(0);

    const spy7 = spyOn<any>(controller, 'updateScaleState');
    controller.update('emptyEvent');
    expect(spy7).toBeCalledTimes(0);

    const spy8 = spyOn<any>(controller, 'updatePopUpsState');
    controller.update('emptyEvent');
    expect(spy8).toBeCalledTimes(0);
  });
});

describe('Метод updateView класса SimpleSliderController', () => {
  test('Метод updateThumbsState из класса SimpleSliderModel должен быть вызван один раз', () => {
    const spy = jest.spyOn(model, 'updateThumbsState');
    controller.update('minIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод enableScale из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'enableScale');
    controller.update('maxIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод addScalePoints из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'addScalePoints');
    controller.update('stepIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод disableScale из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'disableScale');
    settings.isScale = false;
    model = new SimpleSliderModel(settings);
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(2);
  });
});

describe('Метод updateThumbsPositions класса SimpleSliderController', () => {
  test('Метод updateThumbs из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'updateThumbs');
    controller.update('thumbsPositionsIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод updatePopUps из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'updatePopUps');
    controller.update('thumbsPositionsIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод updateProgressBar из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'updateProgressBar');
    controller.update('thumbsPositionsIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updateSliderOrientation класса SimpleSliderController', () => {
  test('Метод switchToHorizontal из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'switchToHorizontal');
    controller.update('orientationIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод switchToVertical из класса SimpleSliderView не должен быть вызван', () => {
    const spy = jest.spyOn(view, 'switchToVertical');
    controller.update('orientationIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('Метод switchToHorizontal из класса SimpleSliderView не должен быть вызван', () => {
    model['orientation'] = 'vertical';
    const spy = jest.spyOn(view, 'switchToHorizontal');
    controller.update('orientationIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('Метод switchToVertical из класса SimpleSliderView должен быть вызван один раз', () => {
    model['orientation'] = 'vertical';
    const spy = jest.spyOn(view, 'switchToVertical');
    controller.update('orientationIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updateSliderType класса SimpleSliderController', () => {
  test('Метод switchToRange method from the SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'switchToRange');
    controller.update('typeIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод switchToSingle из класса SimpleSliderView не должен быть вызван', () => {
    const spy = jest.spyOn(view, 'switchToSingle');
    controller.update('typeIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('Метод switchToRange из класса SimpleSliderView не должен быть вызван', () => {
    model['type'] = 'single';
    const spy = jest.spyOn(view, 'switchToRange');
    controller.update('typeIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('Метод switchToSingle из класса SimpleSliderView должен быть вызван один раз', () => {
    model['type'] = 'single';
    const spy = jest.spyOn(view, 'switchToSingle');
    controller.update('typeIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updateScaleState класса SimpleSliderController', () => {
  test('Метод enableScale из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'enableScale');
    controller.update('scaleStateIsUpdated');
    expect(spy).toBeCalledTimes(2);
  });
  test('Метод disableScale из класса SimpleSliderView не должен быть вызван', () => {
    const spy = jest.spyOn(view, 'disableScale');
    controller.update('scaleStateIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('Метод enableScale из класса SimpleSliderView не должен быть вызван', () => {
    model['isScale'] = false;
    const spy = jest.spyOn(view, 'enableScale');
    controller.update('scaleStateIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('Метод disableScale из класса SimpleSliderView должен быть вызван один раз', () => {
    model['isScale'] = false;
    const spy = jest.spyOn(view, 'disableScale');
    controller.update('scaleStateIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updatePopUpsState класса SimpleSliderController', () => {
  test('Метод enablePopUps из класса SimpleSliderView должен быть вызван один раз', () => {
    const spy = jest.spyOn(view, 'enablePopUps');
    controller.update('popUpsStateIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('Метод disablePopUps из класса SimpleSliderView не должен быть вызван', () => {
    const spy = jest.spyOn(view, 'disablePopUps');
    controller.update('popUpsStateIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('Метод enablePopUps из класса SimpleSliderView не должен быть вызван', () => {
    model['isPopUps'] = false;
    const spy = jest.spyOn(view, 'enablePopUps');
    controller.update('popUpsStateIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('Метод disablePopUps из класса SimpleSliderView должен быть вызван один раз', () => {
    model['isPopUps'] = false;
    const spy = jest.spyOn(view, 'disablePopUps');
    controller.update('popUpsStateIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});
