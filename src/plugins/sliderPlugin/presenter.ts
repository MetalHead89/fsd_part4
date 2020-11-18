import { IThumbPosition } from './interfaces';
import { IScalePointSettings } from './interfaces';
import { ICursorPsition } from './interfaces';
import { IScalePointSize } from './interfaces';
import { IProgressBarPosition } from './interfaces';

import Observable from './observable';
import Model from './model';
import View from './view';

class Presenter {
    view: View;
    model: Model;
    observer: Observable;

    constructor(view: View, model: Model, observer: Observable) {
        this.view = view;
        this.model = model;
        this.observer = observer;

        this.addObserverListeners();
        this.init();
    }

    private init() {
        this.model.setSliderSize(this.view.getSliderSize());
        this.model.setThumbSize(this.view.getThumbSize());
        this.model.calculateStepsCount();
        this.model.calculateStepSize();
        this.model.setPixelsPerValue();
        this.model.changeThumbTwoDisplay();
        this.view.scaleRemove();
        this.view.createScale(this.model.getScaleFlag());
        this.model.setScalePointSize(this.getScalePointMaxSize());
        this.model.generateScale();


        const thumbOnePos: IThumbPosition = this.model.getThumbOnePosition();
        const thumbTwoPos: IThumbPosition = this.model.getThumbTwoPosition();

        if (thumbTwoPos.left === -1 && thumbTwoPos.top === -1) {
            this.model.setThumbTwoToStartingPosition();
        } else {
            this.model.thumbOneDrag(this.model.getThumbOnePosition())
        }

        if (thumbOnePos.left === -1 && thumbOnePos.top === -1) {
            this.model.setThumbOneToStartingPosition();
        } else {
            this.model.thumbTwoDrag(this.model.getThumbTwoPosition())
        }
    }


    private addObserverListeners() {

        this.observer.subscribe('startDragThumbOne',
            (thumbPosition: IThumbPosition) => { this.model.thumbOneDrag(thumbPosition) });

        this.observer.subscribe('startDragThumbTwo',
            (thumbPosition: IThumbPosition) => { this.model.thumbTwoDrag(thumbPosition) });

        this.observer.subscribe('thumbOneDraged',
            (value: number) => { this.view.moveThumbOne(value) });

        this.observer.subscribe('thumbTwoDraged',
            (value: number) => { this.view.moveThumbTwo(value) });

        this.observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => { this.view.setProgressBarPosition(progressBarPosition) });

        this.observer.subscribe('addScalePoint',
            (pointSettings: IScalePointSettings) => { this.view.addScalePoint(pointSettings) });

        this.observer.subscribe('clickOnTheScale',
            (cursorPosition: ICursorPsition) => { this.model.moveThumb(cursorPosition) });

        this.observer.subscribe('clickOnTheTrack',
            (cursorPosition: ICursorPsition) => { this.model.moveThumb(cursorPosition) });

        this.observer.subscribe('scaleCreated',
            (value: number) => { this.view.setScaleHeight(value) });

        this.observer.subscribe('showThumbTwo', () => { this.view.showThumb() });

        this.observer.subscribe('hideThumbTwo', () => { this.view.hideThumb() });

        this.observer.subscribe('tooltipOneDraged', (value: number) => { this.view.setTooltipOneText(value) });

        this.observer.subscribe('tooltipTwoDraged', (value: number) => { this.view.setTooltipTwoText(value) });

        this.observer.subscribe('updatedMinValue', () => { this.init() });

        this.observer.subscribe('updatedMaxValue', () => { this.init() });

        this.observer.subscribe('updatedStep', () => { this.init() });

        this.observer.subscribe('updatedScaleFlag', () => { this.view.showHideScale(this.model.getScaleFlag()) });

        this.observer.subscribe('updatedTooltipFlag', () => { this.view.showHideTooltips(this.model.getTooltipFlag()) });

        this.observer.subscribe('updatedSliderType', () => { this.init() });

    }

    private getScalePointMaxSize(): IScalePointSize {
        const sliderMaxValue: number = this.model.getMaxValue();
        return this.view.getScalePointMaxSize(sliderMaxValue);
    }
}

export default Presenter;











// import { Observable } from './observable';
// import { Model } from './model';
// import { View } from './view';
// import { INewSliderOptions } from './interfaces';
// // import { INewSliderOptions } from '../slider/interfaces';

// export class Presenter {
//     view: View;
//     model: Model;
//     observer: Observable;

//     constructor(view: View, model: Model, observer: Observable) {
//         this.view = view;
//         this.model = model;
//         this.observer = observer;

//         this.observer.subscribe('addedNewSliderConfiguration', 
//             (sliderOptions: INewSliderOptions) => 
//                 this.view.createSlider(sliderOptions));

//         this.observer.subscribe('updatedMinValue', 
//             (value: number) => this.view.changeMinValue(value));

//         this.observer.subscribe('updatedMaxValue', 
//             (value: number) => this.view.changeMaxValue(value));

//         this.observer.subscribe('updatedStepValue', 
//             (value: number) => this.view.changeStepValue(value))


//     }
// }












// // export class Presenter {
// //     view: View;
// //     model: Model;
// //     observer: Observable;

// //     constructor(view: View, model: Model, observer: Observable) {
// //         this.view = view;
// //         this.model = model;
// //         this.observer = observer;

// //         this.observer.subscribe('addedNewSliderToDOM',
// //             (sliderComponents: { [index: string]: HTMLElement }) => this.sliderInit(sliderComponents));

// //         this.observer.subscribe('dragStarted', (args: { [index: string]: HTMLElement }) => {
// //             const onMouseMoveHandler: Function = this.onDocumentMouseMove.bind(this, args.sliderElem);
// //             const onMouseUpHandler: Function = this.onDocumentMouseUp.bind(this, args.sliderElem);

// //             this.model.setOnMouseMoveHadler(args.sliderElem, onMouseMoveHandler);
// //             this.model.setOnMouseUpHadler(args.sliderElem, onMouseUpHandler);

// //             document.addEventListener('mousemove', onMouseMoveHandler as EventListenerOrEventListenerObject);/////////////////////////////////////////////
// //             document.addEventListener('mouseup', onMouseUpHandler as EventListenerOrEventListenerObject);
// //         });

// //         this.observer.subscribe('moveTo',
// //             (args: IMoveToArgs) => {
// //                 this.view.moveTo(args.thumbElem, args.newLeft)
// //             });
// //     }

// //     // init(): void {
// //     //     this.view.searchSlidersPositions();
// //     // }

// //     init(sliderPosition: HTMLElement): void {
// //         this.view.createSlider(sliderPosition);
// //     }

// //     sliderInit(sliderComponents: { [index: string]: HTMLElement }): void {
// //         const sliderElem: HTMLElement = sliderComponents.sliderElem;

// //         sliderElem.ondragstart = function () {
// //             return false;
// //         };

// //         sliderElem.onmousedown = event => {

// //             if (this.view.targetIsThumb(event)) {
// //                 this.model.startDrag(sliderElem, event.clientX, event.clientY);
// //                 this.model.setPixelsPerValue(sliderElem);

// //                 return false; // disable selection start (cursor change)
// //             }

// //         }

// //         this.model.createSliderModel(sliderComponents);
// //     }

// //     onDocumentMouseMove(sliderElem: HTMLElement, event: MouseEvent): void {
// //         this.model.moveTo(sliderElem, event.clientX);
// //     }

// //     onDocumentMouseUp(sliderElem: HTMLElement): void {
// //         this.endDrag(sliderElem);
// //     }

// //     endDrag(sliderElem: HTMLElement): void {
// //         document.removeEventListener('mousemove', this.model.getOnMouseMoveHadler(sliderElem) as EventListenerOrEventListenerObject);
// //         document.removeEventListener('mouseup', this.model.getOnMouseUpHadler(sliderElem) as EventListenerOrEventListenerObject);
// //     }
// // }