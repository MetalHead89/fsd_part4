import { Observable } from '../slider/observable';
import { Model } from '../slider/model';
import { View } from '../slider/view';
import { IMoveToArgs } from '../slider/interfaces';

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

        this.observer.subscribe('dragStarted', (args: { [index: string]: HTMLElement }) => {
            const onMouseMoveHandler: Function = this.onDocumentMouseMove.bind(this, args.thumbElem);
            const onMouseUpHandler: Function = this.onDocumentMouseUp.bind(this, args.sliderElem);

            this.model.setOnMouseMoveHadler(args.sliderElem, onMouseMoveHandler);
            this.model.setOnMouseUpHadler(args.sliderElem, onMouseUpHandler);

            document.addEventListener('mousemove', onMouseMoveHandler as EventListenerOrEventListenerObject);/////////////////////////////////////////////
            document.addEventListener('mouseup', onMouseUpHandler as EventListenerOrEventListenerObject);
        });

        this.observer.subscribe('moveTo',
            (args: IMoveToArgs) => {
                this.view.moveTo(args.thumbElem, args.newLeft)
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

    onDocumentMouseMove(thumbElem: HTMLElement, event: MouseEvent): void {/////////////////////////////////////
        this.view.moveTo(thumbElem, event.clientX);
    }

    onDocumentMouseUp(sliderElem: HTMLElement): void {
        this.endDrag(sliderElem);
    }

    endDrag(sliderElem: HTMLElement): void {
        document.removeEventListener('mousemove', this.model.getOnMouseMoveHadler(sliderElem) as EventListenerOrEventListenerObject);
        document.removeEventListener('mouseup', this.model.getOnMouseUpHadler(sliderElem) as EventListenerOrEventListenerObject);
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