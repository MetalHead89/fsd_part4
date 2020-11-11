import { ISliderSettings } from './interfaces';
import { ISliderSize } from './interfaces';
import { IThumbSize } from './interfaces';
import { IThumbPosition } from './interfaces'
import { ICursorPsition } from './interfaces'
import { IScalePointSize } from './interfaces'
import { IProgressBarPosition } from './interfaces'

import Observable from './observable';
// import Slider from './slider';
// import Track from './track';
// import ProgressBar from './progressBar';
// import Thumb from './thumb';
// import Scale from './scale';
// import { IThumbSettings } from './interfaces';
// import { ISliderSettings } from './interfaces';
// import { INewSliderOptions } from './interfaces';
// import { IGroupedSettings } from './interfaces';
// import { IScaleSettings } from './interfaces';

class Model {
    private observer: Observable;
    private orienation: string;
    private type: string;
    private scale: boolean;
    private minValue: number;
    private maxValue: number;
    private step: number
    private sliderWidth: number = 340;
    private sliderHeight: number = 20;
    private thumbWidth: number = 20;
    private thumbHeight: number = 20;
    private stepsCount: number = 0;
    private stepSize: number = 0;
    private pixelsPerValue: number = 0;
    private thumbOnePosition: IThumbPosition = {'left': -1, 'top': -1}
    private thumbTwoPosition: IThumbPosition = {'left': -1, 'top': -1}

    private scalePointSize: IScalePointSize = { 'width': 0, 'height': 0 }

    constructor(observer: Observable, settings: ISliderSettings) {
        this.observer = observer;
        this.orienation = settings.orienation;
        this.type = settings.type;
        this.scale = settings.scale;
        this.minValue = settings.minValue;
        this.maxValue = settings.maxValue
        this.step = settings.step;
        this.stepsCount = 0;
        this.stepSize = 0;
    }

    //////////////////// Методы API ////////////////////

    setMinValue(newValue: number): void {
        this.minValue = newValue;
        this.observer.notify('updatedMinValue', null);
    }

    setMaxValue(newValue: number): void {
        this.maxValue = newValue;
        this.observer.notify('updatedMaxValue', null);
    }

    setStep(newValue: number): void {
        this.step = newValue;
        this.observer.notify('updatedStep', null);
    }





    calculateStepsCount(): void {
        this.stepsCount = (this.maxValue - this.minValue) / this.step;
    }

    calculateStepSize(): void {
        this.stepSize = (this.sliderWidth - this.thumbWidth) / this.stepsCount;
    }

    setThumbOneToStartingPosition() {
        if (this.orienation === 'horizontal') {
            if (this.type === 'single') {
                this.thumbOneDrag({
                    'left': this.sliderWidth / 2,
                    'top': 0
                });
            } else if (this.type === 'range') {
                this.thumbOneDrag({
                    'left': this.sliderWidth * 0.3,
                    'top': 0
                });
            }
        }
    }

    setThumbTwoToStartingPosition() {
        if (this.orienation === 'horizontal') {
            this.thumbTwoDrag({
                'left': this.sliderWidth * 0.7,
                'top': 0
            });
        }
    }

    setSliderSize(size: ISliderSize): void {
        this.sliderWidth = size.width;
        this.sliderHeight = size.height;
    }

    setThumbSize(size: IThumbSize) {
        this.thumbWidth = size.width;
        this.thumbHeight = size.height;
    }

    setScalePointSize(scalePointSize: IScalePointSize) {
        this.scalePointSize = scalePointSize;
    }

    setPixelsPerValue() {
        this.pixelsPerValue = (this.sliderWidth - this.thumbWidth) / 100;
    }

    getMaxValue() {
        return this.maxValue;
    }

    getThumbOnePosition(): IThumbPosition {
        return this.thumbOnePosition;
    }

    getThumbTwoPosition(): IThumbPosition {
        return this.thumbTwoPosition;
    }

    moveThumb(cursorPosition: ICursorPsition): void {

        const position: IThumbPosition = {
            'left': cursorPosition.x,
            'top': cursorPosition.y
        }

        if (this.type === 'range' && 
            Math.abs(position.left - this.thumbOnePosition.left) > 
            Math.abs(position.left - this.thumbTwoPosition.left)) {
                this.thumbTwoDrag(position)
            } else (
                this.thumbOneDrag(position)
            )
    }

    thumbOneDrag(thumbPosition: IThumbPosition) {
        if (this.type == 'range' && thumbPosition.left >= this.thumbTwoPosition.left) {
            thumbPosition = this.thumbOnePosition;
        }

        this.thumbOnePosition.left = this.thumbDrag(thumbPosition, 'thumbOneDraged');
        this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
        this.observer.notify('tooltipOneDraged', this.positionToValue(this.thumbOnePosition.left));
    }

    thumbTwoDrag(thumbPosition: IThumbPosition) {
        if (this.type == 'range' && thumbPosition.left <= this.thumbOnePosition.left) {
            thumbPosition = this.thumbTwoPosition;
        }
        this.thumbTwoPosition.left = this.thumbDrag(thumbPosition, 'thumbTwoDraged');
        this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
        this.observer.notify('tooltipTwoDraged', this.positionToValue(this.thumbTwoPosition.left));
    }

    private thumbDrag(thumbPosition: IThumbPosition, notyfyMessage: string): number {

        let left: number = thumbPosition.left;

        // курсор ушёл вне слайдера
        if (left < 0) {
            left = 0;
        }

        let rightEdge: number = this.sliderWidth - this.thumbWidth;

        left = this.calculateNewThumbPosition(left);

        if (left >= rightEdge) {
            left = rightEdge;
        }

        this.observer.notify(notyfyMessage, left);

        return left;

    }

    changeThumbTwoDisplay(): void {
        if (this.type === 'single') {
            this.observer.notify('hideThumbTwo', null);
        } else if (this.type === 'range'){
            this.observer.notify('showThumbTwo', null);
        }
    }

    private calculateNewThumbPosition(value: number) {
        return Math.round(value / this.stepSize) * this.stepSize
    }

    generateScale() {
        let scalePointPosition: number = this.thumbWidth / 2 - this.scalePointSize.width / 2;
        let prevScalePointPosition: number = 0;
        const scalePointsCount = this.stepsCount + 1;

        for (let i = 0; i <= Math.round(scalePointsCount - 1); i++) {
            let pointValue: number = this.positionToValue(scalePointPosition - this.thumbWidth / 2 + this.scalePointSize.width / 2);

            if (i === 0 || this.isPointFits(scalePointPosition, prevScalePointPosition) || i === Math.round(scalePointsCount - 1)) {

                this.observer.notify('addScalePoint',
                    { 'position': scalePointPosition, 'scalePointWidth': this.scalePointSize.width, 'scalePointValue': pointValue });

                prevScalePointPosition = scalePointPosition;

            }

            scalePointPosition += this.stepSize;

            if (i === Math.round(scalePointsCount - 2)) {
                scalePointPosition = this.sliderWidth - this.thumbWidth / 2 - this.scalePointSize.width / 2;
                this.observer.notify('scaleCreated', this.scalePointSize.height);
            }
        }

    }

    private positionToValue(position: number): number {
        return Math.round(this.minValue + ((this.maxValue - this.minValue) / 100 * Math.round(position / this.pixelsPerValue)));
    }

    private isPointFits(scalePointPosition: number, prevScalePointPosition: number): boolean {

        return (
            (scalePointPosition - prevScalePointPosition - 2 > this.scalePointSize.width) &&
            (this.sliderWidth - this.thumbWidth / 2 - this.scalePointSize.width / 2 - scalePointPosition - 2 > this.scalePointSize.width)
        );

    }

    private calcProgressBarPosition(): IProgressBarPosition {

        const progress: IProgressBarPosition = {
            'start': {'x': 0, 'y': 0}, 
            'size': {'width': 0, 'height': 0}};
        
        if (this.type === 'single') {
            progress.start.x = 0;
            progress.start.y = 0;
            progress.size.width = this.thumbOnePosition.left + this.thumbWidth;
            progress.size.height = this.thumbOnePosition.top + this.thumbHeight;
        } else if (this.type === 'range') {
            progress.start.x = this.thumbOnePosition.left;
            progress.start.y = this.thumbOnePosition.top;
            progress.size.width = this.thumbTwoPosition.left - this.thumbOnePosition.left + this.thumbWidth;
            progress.size.height = this.thumbTwoPosition.top - this.thumbOnePosition.top + this.thumbHeight;
        }

        return progress;
    }













    // setMinValue(newValue: number) {
    //     this.observer.notify('updatedMinValue', newValue);
    // }

    // setMaxValue(newValue: number) {
    //     this.observer.notify('updatedMaxValue', newValue);
    // }

    // setStepValue(newValue: number) {
    //     this.observer.notify('updatedStepValue', newValue);
    // }

    // createNewSlider(sliderPosition: HTMLElement, settings: IPluginSettings): void {
    //     this.settings = settings;
    //     const groupedSettings: IGroupedSettings = this.splitSettingsIntoGroups(settings);        

    //     const newSliderOptions: INewSliderOptions = {
    //         'sliderPosition': sliderPosition,
    //         'settings': groupedSettings
    //     }

    //     this.observer.notify('addedNewSliderConfiguration', newSliderOptions);
    // }

    // splitSettingsIntoGroups(settings: IPluginSettings): IGroupedSettings {
    //     const thumbSettings: IThumbSettings = {
    //         'minValue': settings.minValue,
    //         'maxValue': settings.maxValue,
    //         'step': settings.step
    //     }

    //     const sliderSettings: ISliderSettings = {
    //         'orientation': settings.orienation,
    //         'type': settings.type,
    //     }

    //     const scaleSettings: IScaleSettings = {
    //         'displayed': settings.scale,
    //         'minValue': settings.minValue,
    //         'maxValue': settings.maxValue,
    //     }

    //     return {'sliderSettings': sliderSettings, 'thumbSettings': thumbSettings, 'scaleSettings': scaleSettings}
    // }
}

export default Model;






// export class Model {
//     observer: Observable;
//     sliders: Map<HTMLElement, Slider>;

//     constructor(observer: Observable) {
//         this.observer = observer;
//         this.sliders = new Map;
//     }

//     createSliderModel(sliderComponents: { [index: string]: HTMLElement }) {
//         const slider: Slider = new Slider(sliderComponents);
//         this.sliders.set(sliderComponents.sliderElem, slider);
//     }

//     getSlider(sliderElem: HTMLElement): Slider | undefined {
//         return this.sliders.get(sliderElem);
//     }

//     startDrag(sliderElem: HTMLElement, startClientX: number, startClientY: number) {
//         const slider = this.getSlider(sliderElem);
//         if (slider) {
//             const thumb: Thumb = slider.thumb;
//             if (thumb.element) {
//                 thumb.coords = thumb.element.getBoundingClientRect();
//                 thumb.shiftX = startClientX - thumb.coords.left;
//                 thumb.shiftY = startClientY - thumb.coords.top;

//                 slider.coords = sliderElem.getBoundingClientRect();
//                 this.observer.notify('dragStarted', {
//                     'sliderElem': slider.element, 'thumbElem': thumb.element
//                 });
//             }
//         }
//     }

//     moveTo(sliderElem: HTMLElement, clientX: number) {
//         const slider = this.getSlider(sliderElem);
//         if (slider) {
//             const thumb: Thumb = slider.thumb;
//             if (thumb.element && slider.coords) {
//                 // вычесть координату родителя, т.к. position: relative
//                 let newLeft: number = clientX - thumb.shiftX - slider.coords.left;
//                 // курсор ушёл вне слайдера
//                 if (newLeft < 0) {
//                     newLeft = 0;
//                 }

//                 let rightEdge: number = 0;
//                 rightEdge = sliderElem.offsetWidth - thumb.element.offsetWidth;

//                 if (newLeft > rightEdge) {
//                     newLeft = rightEdge;
//                 } else {
//                     let stepCount = (thumb.getMaxValue() - thumb.getMinValue()) / thumb.step;
//                     let stepSize = (sliderElem.offsetWidth - thumb.element.offsetWidth) / stepCount;
//                     newLeft = Math.round(newLeft / stepSize) * stepSize;
//                 }

//                 console.log(this.positionToValue(thumb, newLeft))////////////////////////////////////

//                 this.observer.notify('moveTo', { 'thumbElem': thumb.element, 'newLeft': newLeft });

//             }
//         }
//     }

//     setOnMouseMoveHadler(sliderElem: HTMLElement, handler: Function) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider) {
//             slider.onMouseMoveHadler = handler;
//         }
//     }

//     getOnMouseMoveHadler(sliderElem: HTMLElement) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider) {
//             return slider.onMouseMoveHadler;
//         }
//     }

//     setOnMouseUpHadler(sliderElem: HTMLElement, handler: Function) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider) {
//             slider.onMouseUpHadler = handler;
//         }
//     }

//     getOnMouseUpHadler(sliderElem: HTMLElement) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider) {
//             return slider.onMouseUpHadler;
//         }
//     }

//     setPixelsPerValue(sliderElem: HTMLElement) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider && slider.thumb.element) {
//             slider.thumb.pixelsPerValue = (sliderElem.clientWidth -
//                 slider.thumb.element.clientWidth) / 100;
//         }
//     }

//     // valueToPosition(value: number) {
//     //     return pixelsPerValue * value;
//     //   }

//     positionToValue(thumb: Thumb, left: number) {
//         // return (Math.round(left / thumb.pixelsPerValue));
//         return Math.round(thumb.getMinValue() + ((thumb.getMaxValue() - 
//             thumb.getMinValue()) / 100 * Math.round(left / thumb.pixelsPerValue)));
//     }
// }