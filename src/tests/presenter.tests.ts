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
        _this.subscribeToNotifications('sliderElementIsCreated', (size: ISliderSize) => { sliderIsCreated = true });

        expect(sliderIsCreated).toBe(false);
        _this.createNewSlider();
        expect(sliderIsCreated).toBe(true);
    });

    test('Checking for a notification about the creation of a vertical slider', () => {
        settings.orienation = 'vertical';
        _this = new Presenter(settings, sliderWrapper);
        
        let sliderIsCreated: boolean = false;
        _this.subscribeToNotifications('sliderElementIsCreated', (size: ISliderSize) => { sliderIsCreated = true });

        expect(sliderIsCreated).toBe(false);
        _this.createNewSlider();
        expect(sliderIsCreated).toBe(true);
    });
});

// describe('Get Scale Point Max Size', () => {
//     test('Checking for a notification about the creation of a slider', () => {
//         let sliderIsCreated: boolean = false;
//         _this.subscribeToNotifications('sliderElementIsCreated', (size: ISliderSize) => { sliderIsCreated = true });

//         expect(sliderIsCreated).toBe(false);
//         _this.createNewSlider();
//         expect(sliderIsCreated).toBe(true);
//     });
// });