import { ISliderSize } from '../interfaces'

class Slider {

    private element: HTMLDivElement;

    constructor(sliderElement: HTMLDivElement) {
        this.element = sliderElement;
    }

    getElement(): HTMLDivElement {

        /**
         * Возвращает div контейнер для элементов слайдера
         * 
         * @returns {HTMLDivElement} - div контейнер для элементов слайдера
         */

        return this.element
    }

    setSize(size: ISliderSize): void {

        /**
         * Устанавливает ширину и высоту контейнера для элементов слайдера
         * 
         * @param {ISliderSize} size - объект со значениями ширины и высоты
         */

        this.element.style.width = `${size.width}px`;
        this.element.style.height = `${size.height}px`;

    }

    getSize(): ISliderSize {

        /**
         * Возвращает ширину и высоту контейнера для элементов слайдера
         * 
         * @returns {ISliderSize} - ширина и высота контейнера для элементов слайдера
         */

        const sliderSize: ISliderSize = {
            'width': this.element.offsetWidth,
            'height': this.element.offsetHeight
        }

        return sliderSize;

    }

    remove() {
        this.element.remove();
    }

}

export default Slider;





// import {ISliderSize} from './interfaces'

// class Slider {
//     private element: HTMLElement;

//     constructor(sliderElem: HTMLElement) {
//         this.element = sliderElem;
//     }

//     setHorizontalOrientation() {
//         this.element.classList.remove('slider_vertical');
//         this.element.classList.add('slider_horizontal');
//     }

//     setVerticalOrientation() {
//         this.element.classList.remove('slider_horizontal');
//         this.element.classList.add('slider_vertical');
//     }

//     getElement(): HTMLElement {
//         return this.element;
//     }

//     getSize(): ISliderSize {
//         return {
//             'width': this.element.offsetWidth,
//             'height': this.element.offsetHeight
//         };
//     }
// }

// export default Slider;











// // import { ISliderSettings } from './interfaces';

// // export class Slider {
// //     private element: HTMLElement;
// //     private orienation: String;
// //     private type: String; 
// //     private coords: DOMRect = new DOMRect;

// //     constructor(sliderElem: HTMLElement, sliderSettings: ISliderSettings) {
// //         this.element = sliderElem;
// //         this.orienation = sliderSettings.orientation;
// //         this.type = sliderSettings.type;
// //     }

// //     // setCoords(coords: DOMRect) {
// //     //     this.coords = coords;
// //     // }

// //     // getCoords(): DOMRect {
// //     //     return this.coords;
// //     // }

// //     getElement(): HTMLElement {
// //         return this.element;
// //     }
// // }





// // import {Track} from '../slider/track';
// // import {Thumb} from '../slider/thumb';

// // export class Slider {
// //     element: HTMLElement;
// //     track: Track;
// //     thumb: Thumb;
// //     coords: DOMRect | null = null;
// //     onMouseMoveHadler: Function | null = null;
// //     onMouseUpHadler: Function | null = null;


// //     constructor(sliderComponents: {[index: string]: HTMLElement}) {
// //         this.element = sliderComponents.sliderElem;
// //         this.track = new Track(sliderComponents.trackElem);
// //         this.thumb = new Thumb(sliderComponents.thumbElem);
// //     }
// // }