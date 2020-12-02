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
    data.setThumbSize({'width': 20, 'height': 20});
    data.setSliderSize({'width': 450, 'height': 450});
    data.setThumbTwoPosition({'left': 100, 'top': 400});
    data.setThumbOnePosition({'left': 86, 'top': 330});
});


describe('Drag thumb one', () => {

    test('thumbOneDragged notify. Should be width left: 30, top: 0 and tooltipValue: 7', () => {
        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(30);
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

    test('thumbOneDragged notify. Should be width left: 0, top: 205 and tooltipValue: 48', () => {
        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBe(205);
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

    test('thumbOneDragged notify. Should be width left: 0, top: 400 and tooltipValue: 93', () => {
        
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(0);
                expect(args.thumbPosition.top).toBe(0);
                expect(args.tooltipValue).toBe(0);
            });

        data.setOrientation('vertical');
        _this.dragThumbOne({'left': -94, 'top': -85});
    });

});