import { Observable } from './observable';
import { Model } from './model';
import { View } from './view';
import { INewSliderOptions } from './interfaces';
// import { INewSliderOptions } from '../slider/interfaces';

export class Presenter {
    view: View;
    model: Model;
    observer: Observable;

    constructor(view: View, model: Model, observer: Observable) {
        this.view = view;
        this.model = model;
        this.observer = observer;

        this.observer.subscribe('addedNewSliderConfiguration', 
            (sliderOptions: INewSliderOptions) => 
                this.view.createSlider(sliderOptions));

        this.observer.subscribe('updatedMinValue', 
            (value: number) => this.view.changeMinValue(value));

        this.observer.subscribe('updatedMaxValue', 
            (value: number) => this.view.changeMaxValue(value));
        
                
    }
}

// export class Presenter {
//     view: View;
//     model: Model;
//     observer: Observable;

//     constructor(view: View, model: Model, observer: Observable) {
//         this.view = view;
//         this.model = model;
//         this.observer = observer;

//         this.observer.subscribe('addedNewSliderToDOM',
//             (sliderComponents: { [index: string]: HTMLElement }) => this.sliderInit(sliderComponents));

//         this.observer.subscribe('dragStarted', (args: { [index: string]: HTMLElement }) => {
//             const onMouseMoveHandler: Function = this.onDocumentMouseMove.bind(this, args.sliderElem);
//             const onMouseUpHandler: Function = this.onDocumentMouseUp.bind(this, args.sliderElem);

//             this.model.setOnMouseMoveHadler(args.sliderElem, onMouseMoveHandler);
//             this.model.setOnMouseUpHadler(args.sliderElem, onMouseUpHandler);

//             document.addEventListener('mousemove', onMouseMoveHandler as EventListenerOrEventListenerObject);/////////////////////////////////////////////
//             document.addEventListener('mouseup', onMouseUpHandler as EventListenerOrEventListenerObject);
//         });

//         this.observer.subscribe('moveTo',
//             (args: IMoveToArgs) => {
//                 this.view.moveTo(args.thumbElem, args.newLeft)
//             });
//     }

//     // init(): void {
//     //     this.view.searchSlidersPositions();
//     // }

//     init(sliderPosition: HTMLElement): void {
//         this.view.createSlider(sliderPosition);
//     }

//     sliderInit(sliderComponents: { [index: string]: HTMLElement }): void {
//         const sliderElem: HTMLElement = sliderComponents.sliderElem;

//         sliderElem.ondragstart = function () {
//             return false;
//         };

//         sliderElem.onmousedown = event => {

//             if (this.view.targetIsThumb(event)) {
//                 this.model.startDrag(sliderElem, event.clientX, event.clientY);
//                 this.model.setPixelsPerValue(sliderElem);

//                 return false; // disable selection start (cursor change)
//             }

//         }

//         this.model.createSliderModel(sliderComponents);
//     }

//     onDocumentMouseMove(sliderElem: HTMLElement, event: MouseEvent): void {
//         this.model.moveTo(sliderElem, event.clientX);
//     }

//     onDocumentMouseUp(sliderElem: HTMLElement): void {
//         this.endDrag(sliderElem);
//     }

//     endDrag(sliderElem: HTMLElement): void {
//         document.removeEventListener('mousemove', this.model.getOnMouseMoveHadler(sliderElem) as EventListenerOrEventListenerObject);
//         document.removeEventListener('mouseup', this.model.getOnMouseUpHadler(sliderElem) as EventListenerOrEventListenerObject);
//     }
// }