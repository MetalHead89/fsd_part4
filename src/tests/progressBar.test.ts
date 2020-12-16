/**
 * @jest-environment jsdom
 */

import { IProgressBarPosition } from '../plugins/sliderPlugin/interfaces';
import ProgressBar from '../plugins/sliderPlugin/view/progressBar'

const progressBarElem: HTMLDivElement = document.createElement('div');
const progressBar: ProgressBar = new ProgressBar(progressBarElem);

beforeEach(() => {
    const progressBarElem: HTMLDivElement = document.createElement('div');
    const progressBar: ProgressBar = new ProgressBar(progressBarElem);
});


describe('Get element', () => {
    test('Should return HTML slider element', () => {
        expect(progressBar.getElement()).toBe(progressBarElem);
    });
});


describe('Set Position', () => {
    test('Should be horisontal orientaton', () => {
        const position: IProgressBarPosition = { 'orientation': 'horizontal', 'start': 20, 'end': 20 }
        progressBar.setPosition(position);

        expect(progressBarElem.classList.contains('slider__progress-bar_horizontal')).toBe(true);
    });

    test('Should be vertical orientaton', () => {
        const position: IProgressBarPosition = { 'orientation': 'vertical', 'start': 20, 'end': 20 }
        progressBar.setPosition(position);
        expect(progressBarElem.classList.contains('slider__progress-bar_vertical')).toBe(true);
    });
});