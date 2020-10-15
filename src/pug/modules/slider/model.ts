import { Observable } from '../slider/observable';
import { Slider } from '../slider/slider';
import { Thumb } from './thumb';



export class Model {
    observer: Observable;
    sliders: Map<HTMLElement, Slider>;

    constructor(observer: Observable) {
        this.observer = observer;
        this.sliders = new Map;
    }

    createSliderModel(sliderComponents: { [index: string]: HTMLElement }) {
        const slider: Slider = new Slider(sliderComponents);
        this.sliders.set(sliderComponents.sliderElem, slider);
    }

    getSlider(sliderElem: HTMLElement): Slider | undefined {
        return this.sliders.get(sliderElem);
    }

    startDrag(sliderElem: HTMLElement, startClientX: number, startClientY: number) {
        const slider = this.getSlider(sliderElem);
        if (slider) {
            const thumb: Thumb = slider.thumb;
            if (thumb.element) {
                thumb.coords = thumb.element.getBoundingClientRect();
                thumb.shiftX = startClientX - thumb.coords.left;
                thumb.shiftY = startClientY - thumb.coords.top;

                slider.coords = sliderElem.getBoundingClientRect();
                this.observer.notify('dragStarted', {
                    'sliderElem': slider.element, 'thumbElem': thumb.element
                });
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

                console.log(this.positionToValue(thumb, newLeft))////////////////////////////////////

                this.observer.notify('moveTo', { 'thumbElem': thumb.element, 'newLeft': newLeft });

            }
        }
    }

    setOnMouseMoveHadler(sliderElem: HTMLElement, handler: Function) {
        const slider: Slider | undefined = this.getSlider(sliderElem);

        if (slider) {
            slider.onMouseMoveHadler = handler;
        }
    }

    getOnMouseMoveHadler(sliderElem: HTMLElement) {
        const slider: Slider | undefined = this.getSlider(sliderElem);

        if (slider) {
            return slider.onMouseMoveHadler;
        }
    }

    setOnMouseUpHadler(sliderElem: HTMLElement, handler: Function) {
        const slider: Slider | undefined = this.getSlider(sliderElem);

        if (slider) {
            slider.onMouseUpHadler = handler;
        }
    }

    getOnMouseUpHadler(sliderElem: HTMLElement) {
        const slider: Slider | undefined = this.getSlider(sliderElem);

        if (slider) {
            return slider.onMouseUpHadler;
        }
    }

    setPixelsPerValue(sliderElem: HTMLElement) {
        const slider: Slider | undefined = this.getSlider(sliderElem);

        if (slider && slider.thumb.element) {
            slider.thumb.pixelsPerValue = (sliderElem.clientWidth -
                slider.thumb.element.clientWidth) / 100;
        }
    }

    // valueToPosition(value: number) {
    //     return pixelsPerValue * value;
    //   }

    positionToValue(thumb: Thumb, left: number) {
        // return (Math.round(left / thumb.pixelsPerValue));
        return Math.round(thumb.getMinValue() + ((thumb.getMaxValue() - 
            thumb.getMinValue()) / 100 * Math.round(left / thumb.pixelsPerValue)));
    }

    // setPixelsPerValue(sliderElem: HTMLElement) {
    //     const slider: Slider | undefined = this.getSlider(sliderElem);

    //     if (slider && slider.thumb.element) {
    //         slider.thumb.pixelsPerValue = (sliderElem.clientWidth -
    //             slider.thumb.element.clientWidth) / slider.thumb.getMaxValue();
    //     }
    // }

    // // valueToPosition(value: number) {
    // //     return pixelsPerValue * value;
    // //   }

    // positionToValue(thumb: Thumb, left: number) {
    //     return (Math.round(left / thumb.pixelsPerValue));
    // }


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