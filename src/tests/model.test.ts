import { ISliderSettings } from '../plugins/sliderPlugin/interfaces';

import Model from '../plugins/sliderPlugin/model';
import Observable from '../plugins/sliderPlugin/observable';

// const Model = require('../plugins/sliderPlugin/model');
const observer = new Observable();
const settings: ISliderSettings = {
    'orienation': 'horizontal',
    'type': 'range',
    'scale': true,
    'tooltip': true,
    'minValue': 0,
    'maxValue': 100,
    'step': 1
};

describe(`Setting the slider's minimum value`, () => {

    const _this = new Model(observer, settings);

    test('Should be true', () => {
        expect(_this.isScale()).toBe(true);
    });

})