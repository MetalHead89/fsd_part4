import { IProgressBarPosition } from './interfaces';

class ProgressBar {

    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element
    }

    setHorizontalOrientation() {
        this.element.classList.remove('slider__progress-bar_vertical')
        this.element.classList.add('slider__progress-bar_horizontal')
    }

    setVerticalOrientation() {
        this.element.classList.remove('slider__progress-bar_horizontal')
        this.element.classList.add('slider__progress-bar_vertical')
    }

    setPosition(progressPosition: IProgressBarPosition) {
        this.element.style.left = progressPosition.start.x + 'px';
        this.element.style.width = progressPosition.size.width + 'px';
    }

}

export default ProgressBar