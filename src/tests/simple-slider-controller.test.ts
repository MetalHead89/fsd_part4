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

// describe('Update method', () => {
//   test('The updateThumbsState method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view });
//     controller.update('thumbIsDragged');
//     expect(
//       SimpleSliderModel.mock.instances[0].updateThumbsState
//     ).toBeCalledTimes(1);
//   });
//   test('The getThumbsPos method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view });
//     controller.update('thumbIsDragged');
//     expect(SimpleSliderView.mock.instances[0].getThumbsPos).toBeCalledTimes(1);
//   });
//   test('The updateThumbs method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view });
//     controller.update('thumbsPosIsUpdated');
//     expect(SimpleSliderView.mock.instances[0].updateThumbs).toBeCalledTimes(1);
//   });
//   test('The updatePopUps method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view });
//     controller.update('thumbsPosIsUpdated');
//     expect(SimpleSliderView.mock.instances[0].updatePopUps).toBeCalledTimes(1);
//   });
//   test('The updateProgressBar method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view });
//     controller.update('thumbsPosIsUpdated');
//     expect(
//       SimpleSliderView.mock.instances[0].updateProgressBar
//     ).toBeCalledTimes(1);
//   });
//   test('The getThumbsPos method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view });
//     controller.update('thumbsPosIsUpdated');
//     expect(SimpleSliderModel.mock.instances[0].getThumbsPos).toBeCalledTimes(1);
//   });
//   test('The getPopUpsParams method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view });
//     controller.update('thumbsPosIsUpdated');
//     expect(SimpleSliderModel.mock.instances[0].getPopUpsParams).toBeCalledTimes(
//       1
//     );
//   });
//   test('The getProgressBarParams method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view });
//     controller.update('thumbsPosIsUpdated');
//     expect(
//       SimpleSliderModel.mock.instances[0].getProgressBarParams
//     ).toBeCalledTimes(1);
//   });
// });
