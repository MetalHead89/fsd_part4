import {Observable} from '../slider/observable';
import {Slider} from '../slider/slider';
import { Thumb } from './thumb';



export class Model {
    observer: Observable;
    sliders: Map<HTMLElement, Slider>;

    constructor(observer: Observable) {
        this.observer = observer;
        this.sliders = new Map;
    }

    createSliderModel(sliderComponents: {[index: string]: HTMLElement}) {        
        const slider: Slider = new Slider(sliderComponents);
        this.sliders.set(sliderComponents.sliderElem, slider);
    }

    getSlider(sliderElem:HTMLElement): Slider | undefined {
        return this.sliders.get(sliderElem);
    }

    startDrag(sliderElem:HTMLElement, startClientX: number, startClientY: number) {
        const slider = this.getSlider(sliderElem);
        if (slider) {
            const thumb: Thumb = slider.thumb;
            if (thumb.element) {
                thumb.coords = thumb.element.getBoundingClientRect();
                thumb.shiftX = startClientX - thumb.coords.left;
                thumb.shiftY = startClientY - thumb.coords.top;

                slider.coords = sliderElem.getBoundingClientRect();
                this.observer.notify('dragStarted', {'thumbElem': thumb.element});
            }
        }        
    }

    moveTo(sliderElem: HTMLElement, clientX: number) {
        const slider = this.getSlider(sliderElem);
        if (slider) {
            const thumb: Thumb = slider.thumb;
            if (thumb.element && slider.coords) {
                // вычесть координату родителя, т.к. position: relative
                let newLeft: number = clientX - thumb.shiftX - slider.coords.left;
                // курсор ушёл вне слайдера
                if (newLeft < 0) {
                    newLeft = 0;
                }

                let rightEdge: number = 0;
                rightEdge = sliderElem.offsetWidth - thumb.element.offsetWidth;

                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                this.observer.notify('moveTo', {'thumbElem': thumb.element, 'newLeft': newLeft});
                
                // thumbElem.style.left = newLeft + 'px';
                    
            }
        }
    }


}





// export class Model {
//     observer: Observable;

//     constructor(observer: Observable) {
//         this.observer = observer;
//     }

//     createSlider(sliderHTMLElement: HTMLElement) {
//         // const slider: Slider = new Slider(sliderHTMLElement);
//         this.observer.notify('sliderCreated', null)
//     }
// }