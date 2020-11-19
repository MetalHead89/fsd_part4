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

// describe(`Setting the slider's minimum value`, () => {

//     const _this = new Model(observer, settings);

//     test('Should be true', () => {
//         expect(_this.isScale()).toBe(true);
//     });

// })