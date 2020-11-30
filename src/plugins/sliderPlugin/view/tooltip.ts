import { timers } from "jquery";

class Tooltip {

    private element: HTMLDivElement;

    constructor(tooltipElement: HTMLDivElement) {
        this.element = tooltipElement;
    }

    setValue(newValue: number): void {
        this.element.innerText = newValue.toString();
    }

    remove() {
        this.element.remove();
    }
}

export default Tooltip;








// class Tooltip {

//     private element: HTMLElement;

//     constructor(element: HTMLElement) {
//         this.element = element;
//     }

//     getElement(): HTMLElement {
//         return this.element;
//     }

//     setText(text: string): void {
//         this.element.innerText = text;
//     }

//     hide() {
//         this.element.classList.add('slider__tooltip_hide');
//     }

//     show() {
//         this.element.classList.remove('slider__tooltip_hide');
//     }

//     setHorizontalOrientation() {
//         this.element.classList.remove('slider__tooltip_vertical')
//         this.element.classList.add('slider__tooltip_horizontal')
//     }

//     setVerticalOrientation() {
//         this.element.classList.remove('slider__tooltip_horizontal')
//         this.element.classList.add('slider__tooltip_vertical')
//     }

// }

// export default Tooltip;