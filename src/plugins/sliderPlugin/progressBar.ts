class ProgressBar {

    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element
    }

    setWidth(value: number) {
        this.element.style.width = value + 'px';
    }

}

export default ProgressBar