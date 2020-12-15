/**
 * @jest-environment jsdom
 */

import { ISliderSettings, ISliderSize } from '../plugins/sliderPlugin/interfaces';
import Presenter from '../plugins/sliderPlugin/presenter/presenter';

let sliderWrapper: HTMLElement = document.createElement('div');
let settings: ISliderSettings = {
    'orienation': 'horizontal',
    'type': 'range',
    'scale': true,
    'tooltips': true,
    'min': 0,
    'max': 100,
    'step': 1
};

let _this: Presenter = new Presenter(settings, sliderWrapper);

beforeEach( () => {
    let sliderWrapper: HTMLElement = document.createElement('div');
    settings = {
        'orienation': 'horizontal',
        'type': 'range',
        'scale': true,
        'tooltips': true,
        'min': 0,
        'max': 100,
        'step': 1
    };
    _this = new Presenter(settings, sliderWrapper);
});

describe('Create new slider', () => {
    test('Checking for a notification about the creation of a horizontal slider', () => {
        let sliderIsCreated: boolean = false;
        _this['observer'].subscribe('sliderElementIsCreated', (size: ISliderSize) => { sliderIsCreated = true });

        expect(sliderIsCreated).toBe(false);
        _this.createNewSlider();
        expect(sliderIsCreated).toBe(true);
    });

    test('Checking for a notification about the creation of a vertical slider', () => {
        settings.orienation = 'vertical';
        _this = new Presenter(settings, sliderWrapper);
        
        let sliderIsCreated: boolean = false;
        _this['observer'].subscribe('sliderElementIsCreated', (size: ISliderSize) => { sliderIsCreated = true });

        expect(sliderIsCreated).toBe(false);
        _this.createNewSlider();
        expect(sliderIsCreated).toBe(true);
    });

    test('Checking for a notification about the creation of a vertical slider', () => {
        settings.scale = false;
        _this = new Presenter(settings, sliderWrapper);
        
        let sliderIsCreated: boolean = false;
        
        _this['observer'].subscribe('sliderElementIsCreated', (size: ISliderSize) => { sliderIsCreated = true });

        expect(sliderIsCreated).toBe(false);
        _this.createNewSlider();
        expect(sliderIsCreated).toBe(true);
    });

    test('Tooltips do not have to be crafted', () => {
        settings.tooltips = false;
        _this = new Presenter(settings, sliderWrapper);
        _this.createNewSlider();

        const view = _this['view'];
        const tooltipOne = view['tooltipOne'];
        const tooltipTwo = view['tooltipTwo'];

        expect(tooltipOne).toBe(null);        
        expect(tooltipTwo).toBe(null);
    });

    test('Tooltips should be created', () => {
        _this = new Presenter(settings, sliderWrapper);
        _this.createNewSlider();

        const view = _this['view'];
        const tooltipOne = view['tooltipOne'];
        const tooltipTwo = view['tooltipTwo'];

        expect(tooltipOne).not.toBe(null);        
        expect(tooltipTwo).not.toBe(null);
    });

    test('Second thumb do not have to be crafted', () => {
        settings.type = 'single';
        _this = new Presenter(settings, sliderWrapper);
        _this.createNewSlider();

        const view = _this['view'];
        const thumbOne = view['thumbOne'];
        const thumbTwo = view['thumbTwo'];

        expect(thumbOne).not.toBe(null);        
        expect(thumbTwo).toBe(null);
    });

    test('Second thumb should be created', () => {
        settings.type = 'range';
        _this = new Presenter(settings, sliderWrapper);
        _this.createNewSlider();

        const view = _this['view'];
        const thumbOne = view['thumbOne'];
        const thumbTwo = view['thumbTwo'];

        expect(thumbOne).not.toBe(null);        
        expect(thumbTwo).not.toBe(null);
    });
});


describe('Create thumbs', () => {
    test('Thumbs should be in zero positions', () => {
        _this['createThumbs']('horizontal', false);
        const model = _this['model'];
        const thumbOnePosition = model.getThumbOnePosition();
        const thumbTwoPosition = model.getThumbTwoPosition();

        expect(thumbOnePosition.left).toBe(0);
        expect(thumbOnePosition.top).toBe(0);
        expect(thumbTwoPosition.left).toBe(0);
        expect(thumbTwoPosition.top).toBe(0);
    });
});


describe('Get scale visiblity', () => {
    test('Should be true', () => {
        expect(_this.getScaleVisiblity()).toBe(true);
    });

    test('Should be false', () => {
        settings.scale = false;
        _this = new Presenter(settings, sliderWrapper);
        _this.createNewSlider();

        expect(_this.getScaleVisiblity()).toBe(false);
    });
});


describe('Get tooltips visiblity', () => {
    test('Should be true', () => {
        expect(_this.getTooltipsVisiblity()).toBe(true);
    });
    
    test('Should be false', () => {
        settings.tooltips = false;
        _this = new Presenter(settings, sliderWrapper);
        _this.createNewSlider();

        expect(_this.getTooltipsVisiblity()).toBe(false);
    });
});


describe('Get slider type', () => {
    test('Should be range', () => {
        expect(_this.getSliderType()).toBe('range');
    });

    test('Should be single', () => {
        settings.type = 'single';
        _this = new Presenter(settings, sliderWrapper);
        _this.createNewSlider();

        expect(_this.getSliderType()).toBe('single');
    });
});


describe('Get slider orientation', () => {
    test('Should be horizontal', () => {
        expect(_this.getSliderOrientation()).toBe('horizontal');
    });

    test('Should be vertical', () => {
        settings.orienation = 'vertical';
        _this = new Presenter(settings, sliderWrapper);
        _this.createNewSlider();

        expect(_this.getSliderOrientation()).toBe('vertical');
    });
});


describe('Change slider orientation', () => {
    test('Should be horizontal', () => {
        _this.changeSliderOrientation('horizontal');
        expect(_this.getSliderOrientation()).toBe('horizontal');
    });

    test('Should be vertical', () => {
        _this.changeSliderOrientation('vertical');
        expect(_this.getSliderOrientation()).toBe('vertical');
    });
});


describe('Change slider type', () => {
    test('Should be single', () => {
        _this.changeSliderType('single');
        expect(_this.getSliderType()).toBe('single');
    });

    test('Should be range', () => {
        _this.changeSliderType('range');
        expect(_this.getSliderType()).toBe('range');
    });
});


describe('Change min value', () => {
    test('Should be 3', () => {
        _this.changeMinValue(3);        
        expect(_this['model']['data'].getMin()).toBe(3);
    });

    test('Should be 0', () => {
        _this.changeMinValue(101);        
        expect(_this['model']['data'].getMin()).toBe(0);
    });
});


describe('Change max value', () => {
    test('Should be 3', () => {
        _this.changeMaxValue(3);        
        expect(_this['model'].getMax()).toBe(3);
    });

    test('Should be 0', () => {
        _this.changeMaxValue(-1);        
        expect(_this['model'].getMax()).toBe(100);
    });
});


describe('Change step', () => {
    test('Should be 3', () => {
        _this.changeStep(3);        
        expect(_this['model']['data'].getStep()).toBe(3);
    });

    test('Should be 1', () => {
        _this.changeStep(-1);        
        expect(_this['model']['data'].getStep()).toBe(1);
    });
});