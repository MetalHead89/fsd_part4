import { ISliderSettings, IThumbPosition } from '../plugins/sliderPlugin/interfaces';
import { IDragThumbArgs } from '../plugins/sliderPlugin/interfaces';

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


describe('Drag thumb one', () => {

    test('thumbOneDragged notify. Should be width left: 30, top: 0 and tooltipValue: 7', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBeCloseTo(30, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(7);
            });

        _this.dragThumbOne({'left': 30, 'top': 430});
    });

    test('thumbOneDragged notify. Should be width left: 100, top: 0 and tooltipValue: 23', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(100);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(23);
            });

        _this.dragThumbOne({'left': 105, 'top': 431});
    });

    test('thumbOneDragged notify. Should be width left: 0, top: 0 and tooltipValue: 0', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(0);
            });

        _this.dragThumbOne({'left': -88, 'top': 514848});
    });

    test('thumbOneDragged notify. Should be width left: 348, top: 0 and tooltipValue: 81', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBeCloseTo(348, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(81);
            });

        data.setSliderType('single');
        _this.dragThumbOne({'left': 350, 'top': 250});
    });

    test('thumbOneDragged notify. Should be width left: 430, top: 0 and tooltipValue: 100', () => {
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBeCloseTo(430, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(100);
            });

        data.setSliderType('single');
        _this.dragThumbOne({'left': 489, 'top': 350});
    });

    test('thumbOneDragged notify. Should be width left: 0, top: 0 and tooltipValue: 0', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBeCloseTo(0, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(0);
            });

        data.setSliderType('single');
        _this.dragThumbOne({'left': -156, 'top': 250});
    });

    test('thumbOneDragged notify. Should be width left: 0, top: 206 and tooltipValue: 48', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(206, 0);
                expect(args.tooltipValue).toBe(48);
            });

        data.setOrientation('vertical');
        _this.dragThumbOne({'left': 1565, 'top': 205});
    });

    test('thumbOneDragged notify. Should be width left: 0, top: 400 and tooltipValue: 93', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBe(400);
                expect(args.tooltipValue).toBe(93);
            });

        data.setOrientation('vertical');
        _this.dragThumbOne({'left': 30, 'top': 430});
    });

    test('thumbOneDragged notify. Should be width left: 0, top: 0 and tooltipValue: 0', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(0);
            });

        data.setOrientation('vertical');
        _this.dragThumbOne({'left': -94, 'top': -85});
    });

    test('thumbOneDragged notify. Should be width left: 0, top: 430 and tooltipValue: 100', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(430);
                expect(args.tooltipValue).toBe(100);
            });

        data.setOrientation('vertical');
        data.setSliderType('single');
        _this.dragThumbOne({'left': 289, 'top': 430});
    });

    test('thumbOneDragged notify. Should be width left: 0, top: 430 and tooltipValue: 100', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(430);
                expect(args.tooltipValue).toBe(100);
            });

        data.setOrientation('vertical');
        data.setSliderType('single');
        _this.dragThumbOne({'left': 289, 'top': 440});
    });

    test('thumbOneDragged notify. Should be width left: 0, top: 0 and tooltipValue: 0', () => {        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(0);
                expect(args.tooltipValue).toBe(0);
            });

        data.setOrientation('vertical');
        data.setSliderType('single');
        _this.dragThumbOne({'left': 289, 'top': -8});
    });

});


describe('Drag thumb two', () => {

    test('thumbTwoDragged notify. Should be width left: 90, top: 0 and tooltipValue: 21', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(90, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(21);
            });

        _this.dragThumbTwo({ 'left': 90, 'top': 200 });
    });

    test('thumbTwoDragged notify. Should be width left: 86, top: 0 and tooltipValue: 20', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(86, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(20);
            });

        _this.dragThumbTwo({ 'left': -458, 'top': 200 });
    });

    test('thumbTwoDragged notify. Should be width left: 430, top: 0 and tooltipValue: 100', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBeCloseTo(430, 0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(100);
            });

        _this.dragThumbTwo({ 'left': 987, 'top': 200 });
    });

    test('thumbTwoDragged notify. Should be width left: 0, top: 330 and tooltipValue: 77', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(330, 0);
                expect(args.tooltipValue).toBe(77);
            });

        data.setOrientation('vertical');
        _this.dragThumbTwo({ 'left': 90, 'top': -586 });
    });


    test('thumbTwoDragged notify. Should be width left: 0, top: 430 and tooltipValue: 100', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(430, 0);
                expect(args.tooltipValue).toBe(100);
            });

        data.setOrientation('vertical');
        _this.dragThumbTwo({ 'left': 90, 'top': 1005 });
    });

    test('thumbTwoDragged notify. Should be width left: 0, top: 400 and tooltipValue: 93', () => {
        observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBeCloseTo(400, 0);
                expect(args.tooltipValue).toBe(93);
            });

        data.setOrientation('vertical');
        _this.dragThumbTwo({ 'left': 90, 'top': 400 });
    });

});