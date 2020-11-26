/**
 * @jest-environment jsdom
 */

import Slider from '../plugins/sliderPlugin/view/slider';

const sliderElem: HTMLDivElement = document.createElement('div');
sliderElem.classList.add('slider', 'slider_horizontal');

const slider = new Slider(sliderElem);

describe('Get and set slider size values', () => {

    test('Should be width: 590 and height: 250', () => {

        slider.setSize({ 'width': 590, 'height': 250 });
        console.dir(slider);
        
        expect(slider.getSize().width).toBe(590);
        expect(slider.getSize().height).toBe(250);

    });

    test('Should be width: -1 and height: -597', () => {

        slider.setSize({ 'width': -1, 'height': -597 });
        expect(slider.getSize().width).toBe(-1);
        expect(slider.getSize().height).toBe(-597);

    });

    test('Should be width: 0 and height: 74', () => {

        slider.setSize({ 'width': 0, 'height': 74 });
        expect(slider.getSize().width).toBe(0);
        expect(slider.getSize().height).toBe(74);

    });

});