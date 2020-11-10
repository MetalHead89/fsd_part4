class Tooltip {

    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    getElement(): HTMLElement {
        return this.element;
    }

    setText(text: string): void {
        this.element.innerText = text;
    }

    moveTo(value: number) {
        this.element.style.left = value + 'px';
    }

}

export default Tooltip;