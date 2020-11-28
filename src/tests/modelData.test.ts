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
    _this.setThumbSize({'width': 20, 'height': 20});
    _this.setSliderSize({'width': 450, 'height': 450});
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

    test('Should be {width: 450, height: 450}', () => {
        expect(_this.getSliderSize().width).toBe(450);
        expect(_this.getSliderSize().height).toBe(450);
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

    test('Should be {width: 20, height: 20}', () => {
        expect(_this.getThumbSize().width).toBe(20);
        expect(_this.getThumbSize().height).toBe(20);
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

describe('Get and set min value', () => {

    test('Should be 0', () => {
        expect(_this.getMin()).toBe(0);
    });

    test('Should be 6', () => {

        _this.setMin(6);
        expect(_this.getMin()).toBe(6);

    });

    test('Should be 0', () => {

        _this.setMin(264);
        expect(_this.getMin()).toBe(0);

    });

    test('Should be -26', () => {

        _this.setMin(-26);
        expect(_this.getMin()).toBe(-26);

    });

});

describe('Get and set max value', () => {

    test('Should be 100', () => {
        expect(_this.getMax()).toBe(100);
    });

    test('Should be 6', () => {

        _this.setMax(6);
        expect(_this.getMax()).toBe(6);

    });

    test('Should be 0', () => {

        _this.setMax(0);
        expect(_this.getMax()).toBe(0);

    });

    test('Should be 100', () => {

        _this.setMax(-26);
        expect(_this.getMax()).toBe(100);

    });

});

describe('Get and set step', () => {

    test('Should be 1', () => {
        expect(_this.getStep()).toBe(1);
    });

    test('Should be 6', () => {

        _this.setStep(6);
        expect(_this.getStep()).toBe(6);

    });

    test('Should be 1', () => {

        _this.setStep(0);
        expect(_this.getStep()).toBe(1);

    });

    test('Should be 1', () => {

        _this.setStep(-26);
        expect(_this.getStep()).toBe(1);

    });

});

describe('Get and set position of the first thumb', () => {

    test('Should be left: 25 and top: 58', () => {
        _this.setThumbTwoPosition({ 'left': 100, 'top': 100 });
        _this.setThumbOnePosition({ 'left': 25, 'top': 58 })

        expect(_this.getThumbOnePosition().left).toBe(25);
        expect(_this.getThumbOnePosition().top).toBe(58);
    });

    test('Should be left: 100 and top: 100', () => {
        _this.setThumbTwoPosition({ 'left': 100, 'top': 100 });
        _this.setThumbOnePosition({ 'left': 100, 'top': 100 })

        expect(_this.getThumbOnePosition().left).toBe(100);
        expect(_this.getThumbOnePosition().top).toBe(100);
    });

    test('Should be left: 0 and top: 50', () => {
        _this.setThumbTwoPosition({ 'left': 100, 'top': 100 });
        _this.setThumbOnePosition({ 'left': 101, 'top': 50 })

        expect(_this.getThumbOnePosition().left).toBe(0);
        expect(_this.getThumbOnePosition().top).toBe(50);
    });

    test('Should be left: 50 and top: 0', () => {
        _this.setThumbTwoPosition({ 'left': 100, 'top': 100 });
        _this.setThumbOnePosition({ 'left': 50, 'top': 101 })

        expect(_this.getThumbOnePosition().left).toBe(50);
        expect(_this.getThumbOnePosition().top).toBe(0);
    });

    test('Should be left: 0 and top: 50', () => {
        _this.setThumbTwoPosition({ 'left': 100, 'top': 100 });
        _this.setThumbOnePosition({ 'left': -1, 'top': 50 })

        expect(_this.getThumbOnePosition().left).toBe(0);
        expect(_this.getThumbOnePosition().top).toBe(50);
    });

    test('Should be left: 50 and top: 0', () => {
        _this.setThumbTwoPosition({ 'left': 100, 'top': 100 });
        _this.setThumbOnePosition({ 'left': 50, 'top': -8 })

        expect(_this.getThumbOnePosition().left).toBe(50);
        expect(_this.getThumbOnePosition().top).toBe(0);
    });

});

describe('Get and set position of the second thumb', () => {

    test('Should be left: 25 and top: 58', () => {
        _this.setThumbTwoPosition({ 'left': 25, 'top': 58 })

        expect(_this.getThumbTwoPosition().left).toBe(25);
        expect(_this.getThumbTwoPosition().top).toBe(58);
    });

    test('Should be left: 0 and top: 0', () => {
        _this.setThumbTwoPosition({ 'left': 0, 'top': 0 })

        expect(_this.getThumbTwoPosition().left).toBe(0);
        expect(_this.getThumbTwoPosition().top).toBe(0);
    });

    test('Should be left: 0 and top: 44', () => {
        _this.setThumbTwoPosition({ 'left': -1, 'top': 44 })

        expect(_this.getThumbTwoPosition().left).toBe(0);
        expect(_this.getThumbTwoPosition().top).toBe(44);
    });

    test('Should be left: 44 and top: 100', () => {
        _this.setThumbTwoPosition({ 'left': 44, 'top': -1 })

        expect(_this.getThumbTwoPosition().left).toBe(44);
        expect(_this.getThumbTwoPosition().top).toBe(0);
    });

    test('Should be left: 150 and top: 430', () => {
        _this.setThumbTwoPosition({ 'left': 150, 'top': 431 })

        expect(_this.getThumbTwoPosition().left).toBe(150);
        expect(_this.getThumbTwoPosition().top).toBe(430);
    });

    test('Should be left: 430 and top: 150', () => {
        _this.setThumbTwoPosition({ 'left': 431, 'top': 150 })

        expect(_this.getThumbTwoPosition().left).toBe(430);
        expect(_this.getThumbTwoPosition().top).toBe(150);
    });


    test('Should be left: 50 and top: 50', () => {
        _this.setThumbTwoPosition({ 'left': 100, 'top': 100 })
        _this.setThumbOnePosition({ 'left': 50, 'top': 50 })
        _this.setThumbTwoPosition({ 'left': 50, 'top': 50 })

        expect(_this.getThumbTwoPosition().left).toBe(50);
        expect(_this.getThumbTwoPosition().top).toBe(50);
    });

    test('Should be left: 100 and top: 100', () => {
        _this.setThumbTwoPosition({ 'left': 100, 'top': 100 })
        _this.setThumbOnePosition({ 'left': 50, 'top': 50 })
        _this.setThumbTwoPosition({ 'left': 49, 'top': 49 })

        expect(_this.getThumbTwoPosition().left).toBe(100);
        expect(_this.getThumbTwoPosition().top).toBe(100);
    });

});