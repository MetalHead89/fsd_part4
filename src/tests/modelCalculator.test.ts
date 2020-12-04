import { ISliderSettings } from '../plugins/sliderPlugin/interfaces';
import { IDragThumbArgs } from '../plugins/sliderPlugin/interfaces';
import { IProgressBarPosition } from '../plugins/sliderPlugin/interfaces';
import { IScalePointSettings } from '../plugins/sliderPlugin/interfaces';

import ModelData from '../plugins/sliderPlugin/model/modelData';
import ModelCalculator from '../plugins/sliderPlugin/model/modelCalculator';
import Observer from '../plugins/sliderPlugin/observer/observer';

let observer = new Observer();
let settings: ISliderSettings = {
    'orienation': 'horizontal',
    'type': 'range',
    'scale': true,
    'tooltips': true,
    'min': 0,
    'max': 100,
    'step': 1
};

let data = new ModelData(settings);
let _this = new ModelCalculator(observer, data);

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
    observer = new Observer();
    data = new ModelData(settings);
    _this = new ModelCalculator(observer, data);
    data.setThumbSize({ 'width': 20, 'height': 20 });
    data.setSliderSize({ 'width': 450, 'height': 450 });
    data.setThumbTwoPosition({ 'left': 100, 'top': 400 });
    data.setThumbOnePosition({ 'left': 86, 'top': 330 });
});


describe('DragThumbOne, thumbDrag, calcProgressBarPosition and others helpers methods', () => {

    test('Should be left: 30, top: 0, tooltipValue: 7, orientation: horizontal, start: 30 and end: 90', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(30, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(7);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(30, 0);
                expect(progressBarPosition.end).toBeCloseTo(90, 0);
            });

        _this.dragThumbOne({ 'left': 30, 'top': 430 });
    });

    test('thumbOneDragged notify. Should be left: 100, top: 0, tooltipValue: 23, orientation: horizontal, start: 100 and end: 20', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(100);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(23);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(100, 0);
                expect(progressBarPosition.end).toBeCloseTo(20, 0);
            });

        _this.dragThumbOne({ 'left': 105, 'top': 431 });
    });

    test('thumbOneDragged notify. Should be left: 0, top: 0, tooltipValue: 0, tooltipValue: 23, orientation: horizontal, start: 0 and end: 120', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(0);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(120, 0);
            });

        _this.dragThumbOne({ 'left': -88, 'top': 514848 });
    });

    test('thumbOneDragged notify. Should be left: 348, top: 0, tooltipValue: 81, tooltipValue: 23, orientation: horizontal, start: 0 and end: 368', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(348, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(81);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(368, 0);
            });

        data.setSliderType('single');
        _this.dragThumbOne({ 'left': 350, 'top': 250 });
    });

    test('thumbOneDragged notify. Should be left: 430, top: 0, tooltipValue: 100, tooltipValue: 23, orientation: horizontal, start: 0 and end: 450', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(430, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(100);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(450, 0);
            });

        data.setSliderType('single');
        _this.dragThumbOne({ 'left': 489, 'top': 350 });
    });

    test('thumbOneDragged notify. Should be left: 0, top: 0, tooltipValue: 0, tooltipValue: 0, orientation: horizontal, start: 0 and end: 20', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(0, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(0);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(20, 0);
            });

        data.setSliderType('single');
        _this.dragThumbOne({ 'left': -156, 'top': 250 });
    });

    test('thumbOneDragged notify. Should be left: 0, top: 206, tooltipValue: 48, orientation: vertical, start: 206 and end: 214', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(206, 0);
                expect(args.tooltipValue).toBe(48);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(206, 0);
                expect(progressBarPosition.end).toBeCloseTo(214, 0);
            });

        data.setOrientation('vertical');
        _this.dragThumbOne({ 'left': 1565, 'top': 205 });
    });

    test('thumbOneDragged notify. Should be left: 0, top: 400, tooltipValue: 93, orientation: vertical, start: 400 and end: 20', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBe(400);
                expect(args.tooltipValue).toBe(93);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(400, 0);
                expect(progressBarPosition.end).toBeCloseTo(20, 0);
            });

        data.setOrientation('vertical');
        _this.dragThumbOne({ 'left': 30, 'top': 430 });
    });

    test('thumbOneDragged notify. Should be left: 0, top: 0, tooltipValue: 0, orientation: vertical, start: 0 and end: 420', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(0);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(420, 0);
            });

        data.setOrientation('vertical');
        _this.dragThumbOne({ 'left': -94, 'top': -85 });
    });

    test('thumbOneDragged notify. Should be left: 0, top: 430, tooltipValue: 100, orientation: vertical, start: 0 and end: 450', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(430);
                expect(args.tooltipValue).toBe(100);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(450, 0);
            });

        data.setOrientation('vertical');
        data.setSliderType('single');
        _this.dragThumbOne({ 'left': 289, 'top': 430 });
    });

    test('thumbOneDragged notify. Should be left: 0, top: 430, tooltipValue: 100, orientation: vertical, start: 0 and end: 450', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(430);
                expect(args.tooltipValue).toBe(100);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(450, 0);
            });

        data.setOrientation('vertical');
        data.setSliderType('single');
        _this.dragThumbOne({ 'left': 289, 'top': 440 });
    });

    test('thumbOneDragged notify. Should be left: 0, top: 0, tooltipValue: 0, orientation: vertical, start: 0 and end: 20', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(0);
                expect(args.tooltipValue).toBe(0);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(20, 0);
            });

        data.setOrientation('vertical');
        data.setSliderType('single');
        _this.dragThumbOne({ 'left': 289, 'top': -8 });
    });

});


describe('DragThumbTwo, thumbDrag, calcProgressBarPosition and others helpers methods', () => {

    test('thumbTwoDragged notify. Should be left: 90, top: 0, tooltipValue: 21, orientation: horizontal, start: 86 and end: 24', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(90, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(21);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(86, 0);
                expect(progressBarPosition.end).toBeCloseTo(24, 0);
            });

        _this.dragThumbTwo({ 'left': 90, 'top': 200 });
    });

    test('thumbTwoDragged notify. Should be left: 86, top: 0, tooltipValue: 20, orientation: horizontal, start: 86 and end: 20', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(86, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(20);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(86, 0);
                expect(progressBarPosition.end).toBeCloseTo(20, 0);
            });

        _this.dragThumbTwo({ 'left': -458, 'top': 200 });
    });

    test('thumbTwoDragged notify. Should be left: 430, top: 0, tooltipValue: 100, orientation: horizontal, start: 86 and end: 364', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(430, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(100);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(86, 0);
                expect(progressBarPosition.end).toBeCloseTo(364, 0);
            });

        _this.dragThumbTwo({ 'left': 987, 'top': 200 });
    });

    test('thumbTwoDragged notify. Should be left: 0, top: 330, tooltipValue: 77, orientation: vertical, start: 330 and end: 20', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(330, 0);
                expect(args.tooltipValue).toBe(77);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(330, 0);
                expect(progressBarPosition.end).toBeCloseTo(20, 0);
            });

        data.setOrientation('vertical');
        _this.dragThumbTwo({ 'left': 90, 'top': -586 });
    });


    test('thumbTwoDragged notify. Should be left: 0, top: 430, tooltipValue: 100, orientation: horizontal, start: 330 and end: 120', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(430, 0);
                expect(args.tooltipValue).toBe(100);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(330, 0);
                expect(progressBarPosition.end).toBeCloseTo(120, 0);
            });

        data.setOrientation('vertical');
        _this.dragThumbTwo({ 'left': 90, 'top': 1005 });
    });

    test('thumbTwoDragged notify. Should be left: 0, top: 400, tooltipValue: 93, orientation: horizontal, start: 330 and end: 90', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(400, 0);
                expect(args.tooltipValue).toBe(93);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(330, 0);
                expect(progressBarPosition.end).toBeCloseTo(90, 0);
            });

        data.setOrientation('vertical');
        _this.dragThumbTwo({ 'left': 90, 'top': 400 });
    });

});


describe('Set thumb one to starting position', () => {

    test('Should be left: 125, top: 0, tooltipValue: 29, orientation: horizontal, start: 125 and end: 225', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(125, 0);
                expect(args.thumbPosition.top).toBeCloseTo(0);
                expect(args.tooltipValue).toBe(29);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(125, 0);
                expect(progressBarPosition.end).toBeCloseTo(225, 0);
            });

        data.setThumbTwoPosition({ 'left': 330, 'top': 330 });
        _this.setThumbOneToStartingPosition();
    });

    test('Should be left: 0, top: 125, tooltipValue: 29, orientation: vertical, start: 125 and end: 225', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(0);
                expect(args.thumbPosition.top).toBeCloseTo(125, 0);
                expect(args.tooltipValue).toBe(29);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(125, 0);
                expect(progressBarPosition.end).toBeCloseTo(225, 0);
            });

        data.setOrientation('vertical');
        data.setThumbTwoPosition({ 'left': 330, 'top': 330 });
        _this.setThumbOneToStartingPosition();
    });

    test('Should be left: 215, top: 0, tooltipValue: 50, orientation: horizontal, start: 0 and end: 235', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(215);
                expect(args.thumbPosition.top).toBeCloseTo(0, 0);
                expect(args.tooltipValue).toBe(50);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(235, 0);
            });

        data.setSliderType('single');
        data.setThumbTwoPosition({ 'left': 330, 'top': 330 });
        _this.setThumbOneToStartingPosition();
    });

    test('Should be left: 0, top: 215, tooltipValue: 50, orientation: vertical, start: 0 and end: 235', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(0);
                expect(args.thumbPosition.top).toBeCloseTo(215, 0);
                expect(args.tooltipValue).toBe(50);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(235, 0);
            });

        data.setSliderType('single');
        data.setOrientation('vertical');
        data.setThumbTwoPosition({ 'left': 330, 'top': 330 });
        _this.setThumbOneToStartingPosition();
    });



    test('Should be left: 294, top: 0, tooltipValue: 30, orientation: horizontal, start: 294 and end: 526', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(294, 0);
                expect(args.thumbPosition.top).toBeCloseTo(0);
                expect(args.tooltipValue).toBe(30);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(294, 0);
                expect(progressBarPosition.end).toBeCloseTo(526, 0);
            });
        data.setSliderSize({'width': 1000, 'height': 1000});
        data.setThumbTwoPosition({ 'left': 800, 'top': 800 });
        _this.setThumbOneToStartingPosition();
    });

    test('Should be left: 0, top: 294, tooltipValue: 30, orientation: vertical, start: 294 and end: 526', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(0);
                expect(args.thumbPosition.top).toBeCloseTo(294, 0);
                expect(args.tooltipValue).toBe(30);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(294, 0);
                expect(progressBarPosition.end).toBeCloseTo(526, 0);
            });

        data.setOrientation('vertical');
        data.setSliderSize({'width': 1000, 'height': 1000});
        data.setThumbTwoPosition({ 'left': 800, 'top': 800 });
        _this.setThumbOneToStartingPosition();
    });

    test('Should be left: 490, top: 0, tooltipValue: 50, orientation: horizontal, start: 0 and end: 510', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(490);
                expect(args.thumbPosition.top).toBeCloseTo(0, 0);
                expect(args.tooltipValue).toBe(50);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(510, 0);
            });

        data.setSliderType('single');
        data.setSliderSize({'width': 1000, 'height': 1000});
        data.setThumbTwoPosition({ 'left': 800, 'top': 800 });
        _this.setThumbOneToStartingPosition();
    });

    test('Should be left: 0, top: 490, tooltipValue: 50, orientation: vertical, start: 0 and end: 510', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(0);
                expect(args.thumbPosition.top).toBeCloseTo(490, 0);
                expect(args.tooltipValue).toBe(50);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(0, 0);
                expect(progressBarPosition.end).toBeCloseTo(510, 0);
            });

        data.setSliderType('single');
        data.setOrientation('vertical');
        data.setSliderSize({'width': 1000, 'height': 1000});
        data.setThumbTwoPosition({ 'left': 800, 'top': 800 });
        _this.setThumbOneToStartingPosition();
    });

});


describe('Set thumb two to starting position', () => {

    test('Should be left: 125, top: 0, tooltipValue: 29, orientation: horizontal, start: 125 and end: 225', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(305, 0);
                expect(args.thumbPosition.top).toBeCloseTo(0);
                expect(args.tooltipValue).toBe(71);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(30, 0);
                expect(progressBarPosition.end).toBeCloseTo(295, 0);
            });

        data.setThumbOnePosition({ 'left': 30, 'top': 30 });
        _this.setThumbTwoToStartingPosition();
    });

    test('Should be left: 0, top: 305, tooltipValue: 71, orientation: vertical, start: 30 and end: 295', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(0);
                expect(args.thumbPosition.top).toBeCloseTo(305, 0);
                expect(args.tooltipValue).toBe(71);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(30, 0);
                expect(progressBarPosition.end).toBeCloseTo(295, 0);
            });

        data.setOrientation('vertical');
        data.setThumbOnePosition({ 'left': 30, 'top': 30 });
        _this.setThumbTwoToStartingPosition();
    });

    test('Should be left: 686, top: 0, tooltipValue: 70, orientation: horizontal, start: 30 and end: 676', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(686, 0);
                expect(args.thumbPosition.top).toBeCloseTo(0);
                expect(args.tooltipValue).toBe(70);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('horizontal');
                expect(progressBarPosition.start).toBeCloseTo(30, 0);
                expect(progressBarPosition.end).toBeCloseTo(676, 0);
            });

        data.setThumbOnePosition({ 'left': 30, 'top': 30 });
        data.setSliderSize({'width': 1000, 'height': 1000});
        _this.setThumbTwoToStartingPosition();
    });

    test('Should be left: 0, top: 686, tooltipValue: 70, orientation: vertical, start: 30 and end: 676', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(0);
                expect(args.thumbPosition.top).toBeCloseTo(686, 0);
                expect(args.tooltipValue).toBe(70);
            });
        observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => {
                expect(progressBarPosition.orientation).toBe('vertical');
                expect(progressBarPosition.start).toBeCloseTo(30, 0);
                expect(progressBarPosition.end).toBeCloseTo(676, 0);
            });

        data.setOrientation('vertical');
        data.setSliderSize({'width': 1000, 'height': 1000});
        data.setThumbOnePosition({ 'left': 30, 'top': 30 });
        _this.setThumbTwoToStartingPosition();
    });

});


describe('Generate scale', () => {

    test('Checking the generation of a scale from 0 to 10 with a step equal to 1, with a slider width of 450', () => {
        const scalePointSettings: IScalePointSettings[] = [];
        const correctSettings: IScalePointSettings[] = [
            { 'position': -15, 'scalePointSize': 50, 'scalePointValue': 0 },
            { 'position': 71, 'scalePointSize': 50, 'scalePointValue': 2 },
            { 'position': 157, 'scalePointSize': 50, 'scalePointValue': 4 },
            { 'position': 243, 'scalePointSize': 50, 'scalePointValue': 6 },
            { 'position': 329, 'scalePointSize': 50, 'scalePointValue': 8 },
            { 'position': 415, 'scalePointSize': 50, 'scalePointValue': 10 }
        ];

        observer.subscribe('addScalePoint',
            (settings: IScalePointSettings) => {
                scalePointSettings.push(settings);
            });

        data.setMax(10);
        data.setScalePointSize({ 'width': 50, 'height': 50 });
        _this.generateScale();

        for (let scalePoint = 0; scalePoint < scalePointSettings.length; scalePoint++) {
            expect(scalePointSettings[scalePoint].position).toBe(correctSettings[scalePoint].position);
            expect(scalePointSettings[scalePoint].scalePointSize).toBe(correctSettings[scalePoint].scalePointSize);
            expect(scalePointSettings[scalePoint].scalePointValue).toBe(correctSettings[scalePoint].scalePointValue);
        }
    });

    test('Checking the generation of a scale from 0 to 10 with a step equal to 1, with a slider width of 1000', () => {
        const scalePointSettings: IScalePointSettings[] = [];
        const correctSettings: IScalePointSettings[] = [
            { 'position': -15, 'scalePointSize': 50, 'scalePointValue': 0 },
            { 'position': 83, 'scalePointSize': 50, 'scalePointValue': 1 },
            { 'position': 181, 'scalePointSize': 50, 'scalePointValue': 2 },
            { 'position': 279, 'scalePointSize': 50, 'scalePointValue': 3 },
            { 'position': 377, 'scalePointSize': 50, 'scalePointValue': 4 },
            { 'position': 475, 'scalePointSize': 50, 'scalePointValue': 5 },
            { 'position': 573, 'scalePointSize': 50, 'scalePointValue': 6 },
            { 'position': 671, 'scalePointSize': 50, 'scalePointValue': 7 },
            { 'position': 769, 'scalePointSize': 50, 'scalePointValue': 8 },
            { 'position': 867, 'scalePointSize': 50, 'scalePointValue': 9 },
            { 'position': 965, 'scalePointSize': 50, 'scalePointValue': 10 }
        ];

        observer.subscribe('addScalePoint',
            (settings: IScalePointSettings) => {
                scalePointSettings.push(settings);
            });

        data.setMax(10);
        data.setSliderSize({ 'width': 1000, 'height': 1000 });
        data.setScalePointSize({ 'width': 50, 'height': 50 });
        _this.generateScale();

        for (let scalePoint = 0; scalePoint < scalePointSettings.length; scalePoint++) {
            expect(scalePointSettings[scalePoint].position).toBe(correctSettings[scalePoint].position);
            expect(scalePointSettings[scalePoint].scalePointSize).toBe(correctSettings[scalePoint].scalePointSize);
            expect(scalePointSettings[scalePoint].scalePointValue).toBe(correctSettings[scalePoint].scalePointValue);
        }
    });

    test('Checking the generation of a scale from 0 to 10 with a step equal to 2, with a slider width of 1000', () => {
        const scalePointSettings: IScalePointSettings[] = [];
        const correctSettings: IScalePointSettings[] = [
            { 'position': -15, 'scalePointSize': 50, 'scalePointValue': 0 },
            { 'position': 181, 'scalePointSize': 50, 'scalePointValue': 2 },
            { 'position': 377, 'scalePointSize': 50, 'scalePointValue': 4 },
            { 'position': 573, 'scalePointSize': 50, 'scalePointValue': 6 },
            { 'position': 769, 'scalePointSize': 50, 'scalePointValue': 8 },
            { 'position': 965, 'scalePointSize': 50, 'scalePointValue': 10 }
        ];

        observer.subscribe('addScalePoint',
            (settings: IScalePointSettings) => {
                scalePointSettings.push(settings);
            });

        data.setStep(2)
        data.setMax(10);
        data.setSliderSize({ 'width': 1000, 'height': 1000 });
        data.setScalePointSize({ 'width': 50, 'height': 50 });
        _this.generateScale();

        for (let scalePoint = 0; scalePoint < scalePointSettings.length; scalePoint++) {
            expect(scalePointSettings[scalePoint].position).toBe(correctSettings[scalePoint].position);
            expect(scalePointSettings[scalePoint].scalePointSize).toBe(correctSettings[scalePoint].scalePointSize);
            expect(scalePointSettings[scalePoint].scalePointValue).toBe(correctSettings[scalePoint].scalePointValue);
        }
    });

    test('Checking the generation of a scale from 0 to 10 with a step equal to 2, with a vertical slider height of 1000', () => {
        const scalePointSettings: IScalePointSettings[] = [];
        const correctSettings: IScalePointSettings[] = [
            { 'position': -15, 'scalePointSize': 50, 'scalePointValue': 0 },
            { 'position': 181, 'scalePointSize': 50, 'scalePointValue': 2 },
            { 'position': 377, 'scalePointSize': 50, 'scalePointValue': 4 },
            { 'position': 573, 'scalePointSize': 50, 'scalePointValue': 6 },
            { 'position': 769, 'scalePointSize': 50, 'scalePointValue': 8 },
            { 'position': 965, 'scalePointSize': 50, 'scalePointValue': 10 }
        ];

        observer.subscribe('addScalePoint',
            (settings: IScalePointSettings) => {
                scalePointSettings.push(settings);
            });

            data.setOrientation('vertical')
        data.setStep(2)
        data.setMax(10);
        data.setSliderSize({ 'width': 1000, 'height': 1000 });
        data.setScalePointSize({ 'width': 50, 'height': 50 });
        _this.generateScale();

        for (let scalePoint = 0; scalePoint < scalePointSettings.length; scalePoint++) {
            expect(scalePointSettings[scalePoint].position).toBe(correctSettings[scalePoint].position);
            expect(scalePointSettings[scalePoint].scalePointSize).toBe(correctSettings[scalePoint].scalePointSize);
            expect(scalePointSettings[scalePoint].scalePointValue).toBe(correctSettings[scalePoint].scalePointValue);
        }
    });
});