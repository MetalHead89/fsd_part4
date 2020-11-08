class Tooltip {

    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    moveTo(value: number) {
        this.element.style.left = value + 'px';
    }

}

export default Tooltip;