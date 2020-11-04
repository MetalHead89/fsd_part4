import { ISliderSettings } from './interfaces';
import { ISliderSize } from './interfaces';
import { IThumbSize } from './interfaces';

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
    private sliderWidth: number = 0;
    private sliderHeight: number = 0;
    private thumbWidth: number = 0;
    private thumbHeight: number = 0;

    constructor(observer: Observable, settings: ISliderSettings) {
        this.observer = observer;
        this.orienation = settings.orienation;
        this.type = settings.type;
        this.scale = settings.scale;
        this.minValue = settings.minValue;
        this.maxValue = settings.maxValue
        this.step = settings.step;
    }

    setSliderSize(size: ISliderSize): void {
        this.sliderWidth = size.width;
        this.sliderHeight = size.height;
    }

    setThumbSize(size: IThumbSize) {
        this.thumbWidth = size.width;
        this.thumbHeight = size.height;
    }

//     // вычесть координату родителя, т.к. position: relative
//     let newLeft: number = event.clientX - this.thumb.getShiftX() - sliderCoords.left;
        
//     // курсор ушёл вне слайдера
//     if (newLeft < 0) {
//         newLeft = 0;
//     }

//     let rightEdge: number = this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth;
    
//     newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;

//     if (newLeft >= rightEdge) {
//         newLeft = rightEdge;
//     } else {
//         // this.stepsCount = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
//         // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
//         newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;


//         // let stepCount: number = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
//         // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / stepCount;
//         // newLeft = Math.round(newLeft / stepSize) * stepSize;
//     }

// //     this.progressBar?.setWidth(newLeft + this.thumb.getElement().offsetWidth);
// //     this.thumb.moveTo(newLeft);

// //     // console.log(this.positionToValue(this.thumb, newLeft))////////////////////////////////////











    

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