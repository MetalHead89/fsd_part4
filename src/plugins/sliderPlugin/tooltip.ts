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

    hide() {
        this.element.classList.add('slider__tooltip_hide');
    }

    show() {
        this.element.classList.remove('slider__tooltip_hide');
    }

}

export default Tooltip;