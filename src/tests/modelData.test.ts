import { ISliderSettings } from '../plugins/sliderPlugin/interfaces';

import ModelData from '../plugins/sliderPlugin/model/modelData';
import Observer from '../plugins/sliderPlugin/observer/observer';

const observer = new Observer();
let settings: ISliderSettings = {
    'orienation': 'horizontal',
    'type': 'range',
    'scale': true,
    'tooltips': true,
    'min': 0,
    'max': 100,
    'step': 1
};
let _this: ModelData;

beforeEach(() => {
    settings = {
        'orienation': 'horizontal',
        'type': 'range',
        'scale': true,
        'tooltips': true,
        'min': 0,
        'max': 100,
        'step': 1
    };
    _this = new ModelData(settings);
});

describe('Get and set slider orientation', () => {

    test('Should be horizontal', () => {
        expect(_this.getOrientation()).toBe('horizontal');
    });

    test('Should be vertical', () => {
        settings.orienation = 'vertical';
        _this = new ModelData(settings);

        expect(_this.getOrientation()).toBe('vertical');
    });

    test('Should be vertical', () => {
        _this.setOrientation('vertical');
        expect(_this.getOrientation()).toBe('vertical');
    });

    test('Should be horizontal', () => {
        _this.setOrientation('someText');
        expect(_this.getOrientation()).toBe('horizontal');
    });

    test('Should be vertical', () => {
        _this.setOrientation('vertical');
        _this.setOrientation('someText');
        expect(_this.getOrientation()).toBe('vertical');
    });

});

describe('Get and set slider type', () => {

    test('Should be single', () => {
        settings.type = 'single';
        _this = new ModelData(settings);

        expect(_this.getSliderType()).toBe('single');
    });

    test('Should be range', () => {
        settings.type = 'range';
        _this = new ModelData(settings);

        expect(_this.getSliderType()).toBe('range');
    });

    test('Should be range', () => {
        _this.setSliderType('range');
        expect(_this.getSliderType()).toBe('range');
    });

    test('Should be single', () => {
        settings.type = 'single';
        _this = new ModelData(settings);
        _this.setOrientation('someText');

        expect(_this.getSliderType()).toBe('single');
    });

    test('Should be range', () => {
        _this.setSliderType('range');
        _this.setSliderType('someText');

        expect(_this.getSliderType()).toBe('range');
    });

});

describe('Get and set slider size', () => {

    test('Should be {width: 0, height: 0}', () => {
        expect(_this.getSliderSize().width).toBe(0);
        expect(_this.getSliderSize().height).toBe(0);
    });

    test('Should be {width: 500, height: 700}', () => {
        _this.setSliderSize({ 'width': 500, 'height': 700 });

        expect(_this.getSliderSize().width).toBe(500);
        expect(_this.getSliderSize().height).toBe(700);
    });

    test('Should be {width: 1508, height: 91888}', () => {
        _this.setSliderSize({ 'width': 1508, 'height': 91888 });

        expect(_this.getSliderSize().width).toBe(1508);
        expect(_this.getSliderSize().height).toBe(91888);
    });

    test('Should be {width: 0, height: 0}', () => {
        _this.setSliderSize({ 'width': 0, 'height': 0 });

        expect(_this.getSliderSize().width).toBe(0);
        expect(_this.getSliderSize().height).toBe(0);
    });

    test('Should be {width: 0, height: 89}', () => {
        _this.setSliderSize({ 'width': -1, 'height': 89 });

        expect(_this.getSliderSize().width).toBe(0);
        expect(_this.getSliderSize().height).toBe(89);
    });

    test('Should be {width: 69, height: 0}', () => {
        _this.setSliderSize({ 'width': 69, 'height': -1 });

        expect(_this.getSliderSize().width).toBe(69);
        expect(_this.getSliderSize().height).toBe(0);
    });

    test('Should be {width: 0, height: 0}', () => {
        _this.setSliderSize({ 'width': -911, 'height': -5 });

        expect(_this.getSliderSize().width).toBe(0);
        expect(_this.getSliderSize().height).toBe(0);
    });

});

describe('Get and set thumb size', () => {

    test('Should be {width: 0, height: 0}', () => {
        expect(_this.getThumbSize().width).toBe(0);
        expect(_this.getThumbSize().height).toBe(0);
    });

    test('Should be {width: 500, height: 700}', () => {
        _this.setThumbSize({ 'width': 500, 'height': 700 });

        expect(_this.getThumbSize().width).toBe(500);
        expect(_this.getThumbSize().height).toBe(700);
    });

    test('Should be {width: 1508, height: 91888}', () => {
        _this.setThumbSize({ 'width': 1508, 'height': 91888 });

        expect(_this.getThumbSize().width).toBe(1508);
        expect(_this.getThumbSize().height).toBe(91888);
    });

    test('Should be {width: 0, height: 0}', () => {
        _this.setThumbSize({ 'width': 0, 'height': 0 });

        expect(_this.getThumbSize().width).toBe(0);
        expect(_this.getThumbSize().height).toBe(0);
    });

    test('Should be {width: 0, height: 89}', () => {
        _this.setThumbSize({ 'width': -1, 'height': 89 });

        expect(_this.getThumbSize().width).toBe(0);
        expect(_this.getThumbSize().height).toBe(89);
    });

    test('Should be {width: 69, height: 0}', () => {
        _this.setThumbSize({ 'width': 69, 'height': -1 });

        expect(_this.getThumbSize().width).toBe(69);
        expect(_this.getThumbSize().height).toBe(0);
    });

    test('Should be {width: 0, height: 0}', () => {
        _this.setThumbSize({ 'width': -911, 'height': -5 });

        expect(_this.getThumbSize().width).toBe(0);
        expect(_this.getThumbSize().height).toBe(0);
    });

});

describe('Get and set tooltips visible', () => {

    test('Should be true', () => {
        expect(_this.getTooltipsVisible()).toBe(true);

    });

    test('Should be false', () => {

        _this.setTooltipsVisible(false);
        expect(_this.getTooltipsVisible()).toBe(false);

    });

    test('Should be false', () => {

        _this.setTooltipsVisible(true);
        _this.setTooltipsVisible(false);

        expect(_this.getTooltipsVisible()).toBe(false);

    });

});