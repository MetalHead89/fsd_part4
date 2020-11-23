import { IProgressBarPosition } from './interfaces';

class ProgressBar {

    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element
    }

    setHorizontalOrientation() {
        this.element.removeAttribute('style');
        this.element.classList.remove('slider__progress-bar_vertical')
        this.element.classList.add('slider__progress-bar_horizontal')
    }

    setVerticalOrientation() {
        this.element.removeAttribute('style');
        this.element.classList.remove('slider__progress-bar_horizontal')
        this.element.classList.add('slider__progress-bar_vertical')
    }

    setPosition(progressPosition: IProgressBarPosition) {
        if (progressPosition.orientation === 'horizontal') {
            this.setHorizontalOrientation();
            this.element.style.left = progressPosition.start + 'px';
            this.element.style.width = progressPosition.end + 'px';
        } else if (progressPosition.orientation === 'vertical') {
            this.setVerticalOrientation();
            this.element.style.top = progressPosition.start + 'px';
            this.element.style.height = progressPosition.end + 'px';
        }
        
    }

}

export default ProgressBar