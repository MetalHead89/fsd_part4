/**
 * @jest-environment jsdom
 */

/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable dot-notation */

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
    scale: true,
    popUps: true,
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

describe('Init method', () => {
  test('The setSliderSize method from the SimpleSliderModel class should be called once', () => {
    const spy = jest.spyOn(model, 'setSliderSize');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The setThumbSize method from the SimpleSliderModel class should be called once', () => {
    const spy = jest.spyOn(model, 'setThumbSize');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The switchToHorizontal method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'switchToHorizontal');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The switchToVertical method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'switchToVertical');
    settings.orientation = 'vertical';
    model = new SimpleSliderModel(settings);
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The switchToSingle method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'switchToSingle');
    settings.type = 'single';
    model = new SimpleSliderModel(settings);
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The switchToRange method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'switchToRange');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The enablePopUps method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'enablePopUps');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The disablePopUps method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'disablePopUps');
    settings.popUps = false;
    model = new SimpleSliderModel(settings);
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Update view method', () => {
  test('The updateThumbsState method from the SimpleSliderModel class should be called once', () => {
    const spy = jest.spyOn(model, 'updateThumbsState');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The enableScale method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'enableScale');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The addScalePoints method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'addScalePoints');
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
  test('The disableScale method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'disableScale');
    settings.scale = false;
    model = new SimpleSliderModel(settings);
    controller = new SimpleSliderController({ model, view });
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Update method', () => {
  test('The updateThumbsState method from the SimpleSliderModel class should be called once', () => {
    const spy = jest.spyOn(model, 'updateThumbsState');
    controller.update('thumbIsDragged');
    expect(spy).toBeCalledTimes(1);
  });
  test('The setThumbPosOnClickPos method from the SimpleSliderModel class should be called once', () => {
    const spy = jest.spyOn(model, 'setThumbPosOnClickPos');
    controller.update('clickToTrack');
    expect(spy).toBeCalledTimes(1);
  });
  test('The setThumbPosOnClickPos method from the SimpleSliderModel class should be called once', () => {
    const spy = jest.spyOn(model, 'setThumbPosOnClickPos');
    controller.update('clickToScale');
    expect(spy).toBeCalledTimes(1);
  });
  test('Other methods should not be called', () => {
    const spy1 = jest.spyOn(model, 'updateThumbsState');
    controller.update('emptyEvent');
    expect(spy1).toBeCalledTimes(0);

    const spy2 = jest.spyOn(model, 'setThumbPosOnClickPos');
    controller.update('emptyEvent');
    expect(spy2).toBeCalledTimes(0);

    const spy3 = spyOn<any>(controller, 'updateThumbsPos');
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

    const spy8 = spyOn<any>(controller, 'updatePopUpsSate');
    controller.update('emptyEvent');
    expect(spy8).toBeCalledTimes(0);
  });
});

describe('Update thumbs pos', () => {
  test('The updateThumbs method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'updateThumbs');
    controller.update('thumbsPosIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('The updatePopUps method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'updatePopUps');
    controller.update('thumbsPosIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('The updateProgressBar method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'updateProgressBar');
    controller.update('thumbsPosIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Update slider orientation', () => {
  test('The switchToHorizontal method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'switchToHorizontal');
    controller.update('orientationIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('The switchToVertical method from the SimpleSliderView class should not be called', () => {
    const spy = jest.spyOn(view, 'switchToVertical');
    controller.update('orientationIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('The switchToHorizontal method from the SimpleSliderView class should not be called', () => {
    model['settings'].orientation = 'vertical';
    const spy = jest.spyOn(view, 'switchToHorizontal');
    controller.update('orientationIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('The switchToVertical method from the SimpleSliderView class should be called once', () => {
    model['settings'].orientation = 'vertical';
    const spy = jest.spyOn(view, 'switchToVertical');
    controller.update('orientationIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Update slider type', () => {
  test('The switchToRange method from the SimpleSliderView class should be called once', () => {
    const spy = jest.spyOn(view, 'switchToRange');
    controller.update('typeIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
  test('The switchToSingle method from the SimpleSliderView class should not be called', () => {
    const spy = jest.spyOn(view, 'switchToSingle');
    controller.update('typeIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('The switchToRange method from the SimpleSliderView class should not be called', () => {
    model['settings'].type = 'single';
    const spy = jest.spyOn(view, 'switchToRange');
    controller.update('typeIsUpdated');
    expect(spy).toBeCalledTimes(0);
  });
  test('The switchToSingle method from the SimpleSliderView class should be called once', () => {
    model['settings'].type = 'single';
    const spy = jest.spyOn(view, 'switchToSingle');
    controller.update('typeIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});
