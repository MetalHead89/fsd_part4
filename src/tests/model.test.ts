import { ISliderSettings } from '../plugins/sliderPlugin/interfaces';

import Model from '../plugins/sliderPlugin/model';
import Observable from '../plugins/sliderPlugin/observable';

const observer = new Observable();
let settings: ISliderSettings = {
    'orienation': 'horizontal',
    'type': 'range',
    'scale': true,
    'tooltip': true,
    'minValue': 0,
    'maxValue': 100,
    'step': 1
};
let _this: Model;

beforeEach( () => {
    settings = {
        'orienation': 'horizontal',
        'type': 'range',
        'scale': true,
        'tooltip': true,
        'minValue': 0,
        'maxValue': 100,
        'step': 1
    };
    _this = new Model(observer, settings);
});

describe('Get slider minimum value', () => {

    test('Should be 0', () => {
        expect(_this.getMinValue()).toBe(0);
    });
    test('Should be 13', () => {
        settings.minValue = 13;
        _this = new Model(observer, settings);

        expect(_this.getMinValue()).toBe(13);
    });
    test('Should be 100000', () => {
        settings.minValue = 100000;
        _this = new Model(observer, settings);

        expect(_this.getMinValue()).toBe(100000);
    });

});

describe(`Set slider minimum value`, () => {

    test('Should be 97', () => {
        _this.setMinValue(97);
        expect(_this.getMinValue()).toBe(97);
    });
    test('Should be 32', () => {
        _this.setMinValue(32);
        expect(_this.getMinValue()).toBe(32);
    });
    test('Should be 0', () => {
        _this.setMinValue(159);
        expect(_this.getMinValue()).toBe(0);
    });
    test('Should be 0', () => {
        _this.setMinValue(100);
        expect(_this.getMinValue()).toBe(0);
    });
    test('Should be 99', () => {
        _this.setMinValue(99);
        expect(_this.getMinValue()).toBe(99);
    });

});

describe('Get slider maximum value', () => {

    test('Should be 100', () => {
        expect(_this.getMaxValue()).toBe(100);
    });
    test('Should be 15', () => {
        settings.maxValue = 15;
        _this = new Model(observer, settings);

        expect(_this.getMaxValue()).toBe(15);
    });
    test('Should be 59486484', () => {
        settings.maxValue = 59486484;
        _this = new Model(observer, settings);

        expect(_this.getMaxValue()).toBe(59486484);
    });

});

describe(`Set slider maximum value`, () => {

    test('Should be 541', () => {
        _this.setMaxValue(541);
        expect(_this.getMaxValue()).toBe(541);
    });
    test('Should be 100', () => {
        _this.setMaxValue(0);
        expect(_this.getMaxValue()).toBe(100);
    });
    test('Should be 100', () => {
        _this.setMaxValue(-1);
        expect(_this.getMaxValue()).toBe(100);
    });
    test('Should be 100', () => {
        _this.setMaxValue(-108);
        expect(_this.getMaxValue()).toBe(100);
    });
    test('Should be 1', () => {
        _this.setMaxValue(1);
        expect(_this.getMaxValue()).toBe(1);
    });

});

describe('Get slider step', () => {

    test('Should be 1', () => {
        expect(_this.getStep()).toBe(1);
    });
    test('Should be 50', () => {
        settings.step = 50;
        _this = new Model(observer, settings);

        expect(_this.getStep()).toBe(50);
    });
    test('Should be 59840', () => {
        settings.step = 59840;
        _this = new Model(observer, settings);

        expect(_this.getStep()).toBe(59840);
    });

});

describe('Get slider scale visiblity', () => {

    test('Should be true', () => {
        expect(_this.getScaleVisiblity()).toBe(true);
    });
    test('Should be not false', () => {
        expect(_this.getScaleVisiblity()).not.toBe(false);
    });
    test('Should be false', () => {
        settings.scale = false;
        _this = new Model(observer, settings);

        expect(_this.getScaleVisiblity()).toBe(false);
    });

});

describe(`Set slider step`, () => {

    test('Should be 6', () => {
        _this.setStep(6);
        expect(_this.getStep()).toBe(6);
    });
    test('Should be 3', () => {
        _this.setStep(3);
        expect(_this.getStep()).toBe(3);
    });
    test('Should be 1', () => {
        _this.setStep(500);
        expect(_this.getStep()).toBe(1);
    });
    test('Should be 500', () => {
        _this.setMaxValue(501);
        _this.setStep(500);
        expect(_this.getStep()).toBe(500);
    });
    test('Should be 1', () => {
        _this.setStep(100);
        expect(_this.getStep()).toBe(1);
    });
    test('Should be 1', () => {
        _this.setStep(0);
        expect(_this.getStep()).toBe(1);
    });
    test('Should be 1', () => {
        _this.setStep(-8);
        expect(_this.getStep()).toBe(1);
    });

});

describe(`Set slider scale visiblity`, () => {

    test('Should be false', () => {
        _this.setScaleVisibility(false);
        expect(_this.getScaleVisiblity()).toBe(false);
    });test('Should be true', () => {
        _this.setScaleVisibility(true);
        expect(_this.getScaleVisiblity()).toBe(true);
    });

});

describe('Get slider tooltips visiblity', () => {

    test('Should be true', () => {
        expect(_this.getTooltipsVisiblity()).toBe(true);
    });
    test('Should be not false', () => {
        expect(_this.getTooltipsVisiblity()).not.toBe(false);
    });
    test('Should be false', () => {
        settings.tooltip = false;
        _this = new Model(observer, settings);

        expect(_this.getTooltipsVisiblity()).toBe(false);
    });

});

describe(`Set slider tooltips visiblity`, () => {

    test('Should be false', () => {
        _this.setTooltipsVisibility(false);
        expect(_this.getTooltipsVisiblity()).toBe(false);
    });test('Should be true', () => {
        _this.setTooltipsVisibility(true);
        expect(_this.getTooltipsVisiblity()).toBe(true);
    });

});