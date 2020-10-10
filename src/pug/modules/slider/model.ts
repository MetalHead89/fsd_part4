import {Observable} from '../slider/observable';
import {Slider} from '../slider/slider';



export class Model {
    observer: Observable;
    sliders: Map<HTMLElement, Slider>;

    constructor(observer: Observable) {
        this.observer = observer;
        this.sliders = new Map;
    }

    createSliderModel(sliderComponents: {[index: string]: HTMLElement}) {

        const slider: Slider = new Slider(sliderComponents);
        this.sliders.set(sliderComponents.slider, slider);
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