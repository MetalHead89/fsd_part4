import { Observable } from '../slider/observable';
import { Model } from '../slider/model';
import { View } from '../slider/view';

export class Presenter {
    view: View;
    model: Model;
    observer: Observable;

    constructor(view: View, model: Model, observer: Observable) {
        this.view = view;
        this.model = model;
        this.observer = observer;

        this.observer.subscribe('addedNewSliderToDOM',
            (sliderComponents: { [index: string]: HTMLElement }) => this.sliderInit(sliderComponents));

        this.observer.subscribe('dragStarted', () => {
            document.addEventListener('mousemove', onDocumentMouseMove);
            document.addEventListener('mouseup', onDocumentMouseUp);
        });

        this.observer.subscribe('moveTo',
            (args: { [index: string]: HTMLElement, [index: string]: number}) => {
                this.view.moveThumb(args.thumbElem, args.newLeft)
            });
    }

    init(): void {
        this.view.searchSlidersPositions();
    }

    sliderInit(sliderComponents: { [index: string]: HTMLElement }): void {
        const sliderElem: HTMLElement = sliderComponents.sliderElem;

        sliderElem.ondragstart = function () {
            return false;
        };

        sliderElem.onmousedown = event => {
            
            if (this.view.targetIsThumb(event)) {
                this.model.startDrag(sliderElem, event.clientX, event.clientY);
                return false; // disable selection start (cursor change)
            }

        }

        this.model.createSliderModel(sliderComponents);
    }








    // view: View;
    // model: Model;
    // observer: Observable;

    // constructor(view: View, model: Model, observer: Observable) {
    //     this.view = view;
    //     this.model = model;
    //     this.observer = observer;

    //     // this.observer.subscribe('newSliderFound', (data:HTMLElement) => {console.log(data)});
    // }

    // initialize(): void {
    //     this.observer.subscribe('newSliderFound',
    //         (sliderHTMLElement: HTMLElement) => { this.model.createSlider(sliderHTMLElement) });
    //     this.observer.subscribe('sliderCreated', () => { });

    //     this.view.searchSliders();
    // }
}