/**
 * @jest-environment jsdom
 */

 import { IProgressBarPosition } from '../plugins/sliderPlugin/interfaces';
import ProgressBar from '../plugins/sliderPlugin/view/progressBar'

const progressBarElem: HTMLDivElement = document.createElement('div');
const progressBar: ProgressBar = new ProgressBar(progressBarElem);

beforeEach( () => {
    const progressBarElem: HTMLDivElement = document.createElement('div');
    const progressBar: ProgressBar = new ProgressBar(progressBarElem);
});

describe('Progress Bar', () => {
    test('Checking for a notification about the creation of a slider', () => {
        expect(progressBar.getElement()).toBe(progressBarElem);
    });
});