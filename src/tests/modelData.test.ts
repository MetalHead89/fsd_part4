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