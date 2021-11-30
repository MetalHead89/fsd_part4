/**
 * @jest-environment jsdom
 */
// @ts-nocheck

import SimpleJsSliderController from '../plugins/simple-js-slider/controller/SimpleJsSliderController';
import { ISliderSettings } from '../plugins/simple-js-slider/interfaces';
import SimpleJsSliderModel from '../plugins/simple-js-slider/model/SimpleJsSliderModel';
import Observer from '../plugins/simple-js-slider/observer/Observer';
import SimpleJsSliderView from '../plugins/simple-js-slider/view/SimpleJsSliderView';

let controller: SimpleJsSliderController;
let model: SimpleJsSliderModel;
let view: SimpleJsSliderView;
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
  view = new SimpleJsSliderView(wrapper);
  model = new SimpleJsSliderModel(settings);
  controller = new SimpleJsSliderController({ model, view });
});

describe('Метод init класса SimpleJsSliderController', () => {
  test('Метод fullViewUpdate должен быть вызван один раз', () => {
    const spy = spyOn(controller, 'fullViewUpdate');
    controller['init']();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод subscribeToEvents класса SimpleJsSliderController', () => {
  test('Controller должен быть подписан на события типа updateThumbsValues', () => {
    view.observer = new Observer();
    const spy = spyOn(model, 'updateThumbsValues');
    controller['subscribeToEvents']();
    view.observer.notify('thumbIsDragged');
    expect(spy).toBeCalledTimes(1);
  });

  test('Controller должен быть подписан на события типа modelIsUpdated', () => {
    model.observer = new Observer();
    const spy = spyOn(controller, 'updateView');
    controller['subscribeToEvents']();
    model.observer.notify('modelIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });

  test('Controller должен быть подписан на события типа settingsIsUpdated', () => {
    model.observer = new Observer();
    const spy = spyOn(controller, 'fullViewUpdate');
    controller['subscribeToEvents']();
    model.observer.notify('settingsIsUpdated');
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updateSliderOrientation класса SimpleJsSliderController', () => {
  test('Метод switchToVertical должен быть вызван один раз', () => {
    model['orientation'] = 'vertical';
    const spy = spyOn(view, 'switchToVertical');
    controller['updateSliderOrientation']();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updateSliderType класса SimpleJsSliderController', () => {
  test('Метод switchToSingle должен быть вызван один раз', () => {
    model['type'] = 'single';
    const spy = spyOn(view, 'switchToSingle');
    controller['updateSliderType']();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updateScaleState класса SimpleJsSliderController', () => {
  test('Метод disableScale должен быть вызван один раз', () => {
    model['isScale'] = false;
    const spy = spyOn(view, 'disableScale');
    controller['updateScaleState']();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updatePopUpsState класса SimpleJsSliderController', () => {
  test('Метод disablePopUps должен быть вызван один раз', () => {
    model['isPopUps'] = false;
    const spy = spyOn(view, 'disablePopUps');
    controller['updatePopUpsState']();
    expect(spy).toBeCalledTimes(1);
  });
});
