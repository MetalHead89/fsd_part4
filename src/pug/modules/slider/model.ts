import {Observable} from '../slider/observable';

export class Model {
    observer: Observable;

    constructor(observer: Observable) {
        this.observer = observer;
    }

    createSlider(sliderHTMLElement: HTMLElement) {
        // const slider: Slider = new Slider(sliderHTMLElement);
        this.observer.notify('sliderCreated', null)
    }
}