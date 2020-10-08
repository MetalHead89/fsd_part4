import {Observable} from '../slider/observable';
import {Model} from '../slider/model';
import {View} from '../slider/view';

export class Presenter {
    view: View;
    model: Model;
    observer: Observable;

    constructor(view: View, model: Model, observer: Observable) {
        this.view = view;
        this.model = model;
        this.observer = observer;

        // this.observer.subscribe('newSliderFound', (data:HTMLElement) => {console.log(data)});
    }

    initialize(): void {
        this.observer.subscribe('newSliderFound',
            (sliderHTMLElement: HTMLElement) => { this.model.createSlider(sliderHTMLElement) });
        this.observer.subscribe('sliderCreated', () => { });

        this.view.searchSliders();
    }
}