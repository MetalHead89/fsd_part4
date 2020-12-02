import { ISliderSettings, IThumbPosition } from '../plugins/sliderPlugin/interfaces';
import { IDragThumbArgs } from '../plugins/sliderPlugin/interfaces';

import ModelData from '../plugins/sliderPlugin/model/modelData';
import ModelCalculator from '../plugins/sliderPlugin/model/modelCalculator';
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
    data = new ModelData(settings);
    _this = new ModelCalculator(observer, data);
    data.setThumbSize({'width': 20, 'height': 20});
    data.setSliderSize({'width': 450, 'height': 450});
    data.setThumbOnePosition({'left': 86, 'top': 330});
    data.setThumbTwoPosition({'left': 100, 'top': 430});
});


describe('Drag thumb one', () => {

    test('Should be width left: 30, top: 430 and tooltipValue: 30', () => {
        console.log(data.getThumbOnePosition())
        observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => { 
                expect(args.thumbPosition.left).toBe(30);
                expect(args.thumbPosition.top).toBe(430);
                expect(args.tooltipValue).toBe(30);
            });
        // _this.dragThumbOne({'left': 30, 'top': 430});
    });

});