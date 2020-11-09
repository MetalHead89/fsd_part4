import { IProgressBarPosition } from './interfaces';

class ProgressBar {

    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element
    }

    // setWidth(value: number) {
    //     this.element.style.width = value + 'px';
    // }

    setPosition(progressPosition: IProgressBarPosition) {
        this.element.style.left = progressPosition.start.x + 'px';
        this.element.style.width = progressPosition.size.width + 'px';
    }

}

export default ProgressBar