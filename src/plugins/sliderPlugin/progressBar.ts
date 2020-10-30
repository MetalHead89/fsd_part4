export class ProgressBar {

    element: HTMLElement;

    constructor(element: HTMLElement, startWidth: number) {
        this.element = element

        this.setWidth(startWidth)
    }

    setWidth(width: number) {
        this.element.style.width = width + 'px';
    }

}