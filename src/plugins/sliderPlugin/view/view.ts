import { IThumbPosition } from '../interfaces';
import { IProgressBarPosition } from '../interfaces';
import { IScalePointSize } from '../interfaces';
import { IScalePointSettings } from '../interfaces';
import { IScaleSize } from '../interfaces';

import Observer from '../observer/observer';
import Slider from './slider';
import Track from './track';
import Thumb from './thumb';
import Tooltip from './tooltip';
import ProgressBar from './progressBar';
import Scale from './scale';
import ElementFactory from './elementFactory';

class View {

    private observer: Observer;
    private orientation: string;
    private slider: Slider | null = null;
    private track: Track | null = null;
    private thumbOne: Thumb | null = null;
    private thumbTwo: Thumb | null = null;
    private tooltipOne: Tooltip | null = null;
    private tooltipTwo: Tooltip | null = null;
    private progressBar: ProgressBar | null = null;
    private scale: Scale | null = null;
    private elementFactory: ElementFactory;
    private sliderWrapper: HTMLDivElement;

    constructor(observer: Observer, sliderWrapper: HTMLElement, orientation: string) {

        this.observer = observer;
        this.orientation = orientation;
        this.sliderWrapper = sliderWrapper as HTMLDivElement;
        this.elementFactory = new ElementFactory();

        this.observer.subscribe('changeZIndexToAnotherThumb', (thumbElem: HTMLElement) => {

            if (this.thumbOne !== null && this.thumbTwo !== null) {
                if (thumbElem.isEqualNode(this.thumbOne.getElement())) {
                    this.thumbTwo.setZIndex('2')
                } else {
                    this.thumbOne.setZIndex('2');
                }
            }

        });
    }

    createSlider(styleClasses: string) {

        /**
         * Метод выполняет следующие действия:
         * 1. Создаёт объект класса Slider
         * 2. Создаёт div контейнер с классами styleClasses для компоновки элементов слайдера и размещает его в DOM
         * 3. Уведомляет своих слушателей о том, что создан контейнер слайдера и передаёт в сообщении его размеры
         * 
         * @param {string} styleClasses - классы для контейнера элементов слайдера
         */

        this.slider = this.elementFactory.createSlider(this.sliderWrapper, styleClasses);
        this.observer.notify('sliderElementIsCreated', this.slider.getSize());

    }

    createTrack(styleClasses: string) {

        /**
         * Метод выполняет следующие действия:
         * 1. Создаёт объект класса Track
         * 2. Создаёт дорожку слайдера в виде div контейнера с классами styleClasses
         * 
         * @param {string} styleClasses - классы для контейнера элементов слайдера
         */

        if (this.slider != null) {
            this.track = this.elementFactory.createTrack(this.slider.getElement(), styleClasses, this.observer);
        }

    }

    createThumbOne(styleClasses: string) {

        /**
         * Метод выполняет следующие действия:
         * 1. Создаёт объект класса Thumb
         * 2. Создаёт бегунок в виде div контейнера с классами styleClasses
         * 3. Уведомляет своих слушателей о том, что создан бегунок и передаёт в сообщении его размеры
         * 
         * @param {string} styleClasses - классы для бегунка
         */

        if (this.slider != null) {
            this.thumbOne = this.elementFactory.createThumb(this.slider.getElement(), styleClasses, this.observer);
            this.observer.notify('thumbOneIsCreated', this.thumbOne.getSize());
        }

    }

    createThumbTwo(styleClasses: string) {

        /**
         * Метод выполняет следующие действия:
         * 1. Создаёт объект класса Thumb
         * 2. Создаёт бегунок в виде div контейнера с классами styleClasses
         * 
         * @param {string} styleClasses - классы для бегунка
         */

        if (this.slider != null) {
            this.thumbTwo = this.elementFactory.createThumb(this.slider.getElement(), styleClasses, this.observer);
        }

    }

    createTooltipOne(styleClasses: string) {

        /**
         * Метод выполняет следующие действия:
         * 1. Создаёт объект класса Tooltip
         * 2. Создаёт div контейнер с классами styleClasses для оображения значений над бегунками
         * 
         * @param {string} styleClasses - классы для создаваемого элемента
         */

        if (this.slider != null && this.thumbOne != null) {
            this.tooltipOne = this.elementFactory.createTooltip(this.thumbOne.getElement(), styleClasses);
        }

    }

    createTooltipTwo(styleClasses: string) {

        /**
         * Метод выполняет следующие действия:
         * 1. Создаёт объект класса Tooltip
         * 2. Создаёт div контейнер с классами styleClasses для оображения значений над бегунками
         * 
         * @param {string} styleClasses - классы для создаваемого элемента
         */

        if (this.slider != null && this.thumbTwo != null) {
            this.tooltipTwo = this.elementFactory.createTooltip(this.thumbTwo.getElement(), styleClasses);
        }

    }

    createProgressBar(styleClasses: string) {

        if (this.slider != null) {
            this.progressBar = this.elementFactory.createProgressBar(this.slider.getElement(), styleClasses);
        }

    }

    createScale(styleClasses: string) {
        if (this.slider != null) {
            this.scale = this.elementFactory.createScale(this.slider.getElement(), styleClasses, this.observer);
            this.observer.notify('scaleIsCreated', null);
        }

    }

    moveThumbOne(position: IThumbPosition): void {
        if (this.thumbOne !== null) {
            this.thumbOne.moveTo(position);
        }
    }

    tooltipOneSetValue(newValue: number) {
        if (this.tooltipOne !== null) {
            this.tooltipOne.setValue(newValue)
        }
    }

    moveThumbTwo(position: IThumbPosition): void {
        if (this.thumbTwo != null) {
            this.thumbTwo.moveTo(position);
        }
    }

    tooltipTwoSetValue(newValue: number) {
        if (this.tooltipTwo !== null) {
            this.tooltipTwo.setValue(newValue)
        }
    }

    setProgressBarPosition(progressPosition: IProgressBarPosition) {
        if (this.progressBar !== null) {
            this.progressBar.setPosition(progressPosition);
        }
    }

    getScalePointMaxSize(value: number): IScalePointSize {
        if (this.scale !== null) {
            return this.scale.getScalePointMaxSize(value);
        }

        return { 'width': 20, 'height': 20 };
    }

    addScalePoint(pointSettings: IScalePointSettings) {
        if (this.scale !== null) {
            this.scale.addScalePoint(pointSettings.position, pointSettings.scalePointSize, pointSettings.scalePointValue);
        }
    }

    removeSlider(): void {
        if (this.slider !== null) {
            this.slider.remove();
        }
    }

    removeThumbOne(): void {
        if (this.thumbOne !== null) {
            this.thumbOne.remove();
        }
    }

    removeThumbTwo(): void {
        if (this.thumbTwo !== null) {
            this.thumbTwo.remove();
        }
    }

    removeScale(): void {
        if (this.scale !== null) {
            this.scale.remove();
        }
    }

    removeTooltipOne(): void {
        if (this.tooltipOne !== null) {
            this.tooltipOne.remove();
        }
    }

    removeTooltipTwo(): void {
        if (this.tooltipTwo !== null) {
            this.tooltipTwo.remove();
        }
    }

    setScaleSize(scaleSize: IScaleSize): void {
        if (this.scale !== null) {
            this.scale.setScaleSize(scaleSize.width, scaleSize.height);
        }
    }

}

export default View;
















// import { IThumbPosition, IViewSliderOptions } from './interfaces';
// import { ISliderSize } from './interfaces';
// import { IScaleSize } from './interfaces';
// import { IScalePointSettings } from './interfaces';
// import { IScalePointSize } from './interfaces';
// import { IProgressBarPosition } from './interfaces';
// import { IThumbSize } from './interfaces';

// import Observable from './observable';
// import Slider from './slider';
// import Track from './track';
// import Thumb from './thumb';
// import ProgressBar from './progressBar'
// import Scale from './scale';
// import Tooltip from './tooltip';

// class View {

//     private observer: Observable;
//     private slider: Slider;
//     private track: Track;
//     private tooltipOne: Tooltip;
//     private tooltipTwo: Tooltip;
//     private thumbOne: Thumb;
//     private thumbTwo: Thumb;
//     private progressBar: ProgressBar;
//     private scale: Scale;

//     constructor(observer: Observable, sliderWrapper: HTMLElement,
//         sliderOptions: IViewSliderOptions) {

//         this.observer = observer;
//         this.slider = this.sliderInit(sliderWrapper, 'slider ' +
//             `slider_${sliderOptions.orientation} slider_${sliderOptions.type}`);
//         this.track = this.trackInit(this.slider.getElement(), 'slider__track');
//         this.thumbOne = this.thumbInit(this.slider.getElement(), 'slider__thumb slider__thumb-one', 3);
//         this.thumbTwo = this.thumbInit(this.slider.getElement(), 'slider__thumb slider__thumb-two', 2);
//         this.tooltipOne = this.tooltipInit(this.thumbOne.getElement(), 
//             'slider__tooltip slider__tooltip-one', 2);
//         this.tooltipTwo = this.tooltipInit(this.thumbTwo.getElement(), 
//             'slider__tooltip slider__tooltip-two', 2);
//         this.progressBar = this.progressBarInit(this.slider.getElement(), 'slider__progress-bar');
//         this.scale = this.scaleInit(this.slider.getElement(), 'slider__scale', 'horizontal');

        // this.observer.subscribe('changeZIndexToAnotherThumb', (thumbElem: HTMLElement) => { 

        //     if (thumbElem.isEqualNode(this.thumbOne.getElement())) {
        //         this.thumbTwo.setZIndex(2)
        //     } else {
        //         this.thumbOne.setZIndex(2);
        //     }

        //  });
//     }

//     createScale(scaleVisible: boolean, orientation: string) {
//         let scaleStyle = `slider__scale slider__scale_${orientation}`;
//         if (!scaleVisible) {
//             scaleStyle += ' slider__scale_hide';
//         }

//         this.scale = this.scaleInit(this.slider.getElement(), scaleStyle, orientation);
//     }

//     //////////////////// Инициализация элементов ////////////////////

//     private init(parrent: HTMLElement, styles: string, createObj: Function): any {  ///////////////////////////////////////////// ТИП ANY /////////////////////////////////////////////

//         const elem: HTMLElement = document.createElement('div');
//         elem.className = styles;
//         const obj = createObj(elem);
//         parrent.append(elem);

//         return obj;

//     }

//     private sliderInit(parrent: HTMLElement, styles: string): Slider {

//         const createObj = (obj: HTMLElement) => { return new Slider(obj) }
//         const slider: Slider = this.init(parrent, styles, createObj);
//         this.observer.notify('sliderInitialized', slider.getSize());

//         return slider;

//     }

//     private trackInit(parrent: HTMLElement, styles: string): Track {

//         const createObj = (obj: HTMLElement) => { return new Track(obj, this.observer) }
//         const track: Track = this.init(parrent, styles, createObj);

//         return track;

//     }

//     private thumbInit(parrent: HTMLElement, styles: string, zIndex: number): Thumb {

//         const createObj = (obj: HTMLElement) => { return new Thumb(obj, this.observer, zIndex) }
//         const thumb: Thumb = this.init(parrent, styles, createObj);
//         const thumbElem: HTMLElement = thumb.getElement();

//         return thumb;

//     }

//     private tooltipInit(parrent: HTMLElement, styles: string, zIndex: number): Tooltip {

//         const createObj = (obj: HTMLElement) => { return new Tooltip(obj) }
//         const tooltip: Tooltip = this.init(parrent, styles, createObj);

//         return tooltip;

//     }


//     private progressBarInit(parrent: HTMLElement, styles: string): ProgressBar {

//         const createObj = (obj: HTMLElement) => { return new ProgressBar(obj) }
//         const progressBar: ProgressBar = this.init(parrent, styles, createObj);

//         return progressBar;

//     }

//     private scaleInit(parrent: HTMLElement, styles: string, orientation: string): Scale {

//         const createObj = (obj: HTMLElement) => { return new Scale(obj, this.observer, orientation) }
//         const scale: Scale = this.init(parrent, styles, createObj);

//         return scale;

//     }

//     //////////////////// Set/Get ////////////////////

//     setSliderOrientation(orientation: string) {
//         if (orientation === 'horizontal') {
//             this.slider.setHorizontalOrientation();
//             this.track.setHorizontalOrientation();
//             // this.progressBar.setHorizontalOrientation();
//             this.thumbOne.setHorizontalOrientation();
//             this.thumbTwo.setHorizontalOrientation();
//             this.tooltipOne.setHorizontalOrientation();
//             this.tooltipTwo.setHorizontalOrientation();
//         } else if (orientation === 'vertical') {
//             this.slider.setVerticalOrientation();
//             this.track.setVerticalOrientation();
//             // this.progressBar.setVerticalOrientation();
//             this.thumbOne.setVerticalOrientation();
//             this.thumbTwo.setVerticalOrientation();
//             this.tooltipOne.setVerticalOrientation();
//             this.tooltipTwo.setVerticalOrientation();
//         }

//     }

//     setProgressBarOrientation(orientation: string) {
//         if (orientation === 'horizontal') {
//             this.progressBar.setHorizontalOrientation();
//         } else if (orientation === 'vertical') {
//             this.progressBar.setVerticalOrientation();
//         }
//     }

//     getSliderSize(): ISliderSize {
//         return this.slider.getSize();
//     }

//     getThumbSize(): ISliderSize {
//         return this.thumbOne.getSize();
//     }

//     setProgressBarPosition(progressPosition: IProgressBarPosition) {
//         this.progressBar.setPosition(progressPosition);
//     }

//     getScalePointMaxSize(value: number): IScalePointSize {
//         return this.scale.getScalePointMaxSize(value);
//     }

    // setScaleSize(scaleSize: IScaleSize): void {
    //     this.scale.setScaleSize(scaleSize.width, scaleSize.height);
    // }

    // addScalePoint(pointSettings: IScalePointSettings) {
    //     this.scale.addScalePoint(pointSettings.position, pointSettings.scalePointSize, pointSettings.scalePointValue);
    // }

//     moveThumbOne(position: IThumbPosition): void {
//         this.thumbOne.moveTo(position);
//     }

//     moveThumbTwo(position: IThumbPosition): void {
//         this.thumbTwo.moveTo(position);
//     }

//     showThumb() {
//         this.thumbTwo.show();
//     }

//     hideThumb() {
//         this.thumbTwo.hide();
//     }

//     setTooltipOneText(value: number): void {
//         this.tooltipOne.setText(value.toString());
//     }

//     setTooltipTwoText(value: number): void {
//         this.tooltipTwo.setText(value.toString());
//     }

//     scaleRemove() {
//         this.scale.remove();
//     }

//     showHideScale(flag: boolean): void {
//         if (flag) {
//             this.scale.show();
//         } else {
//             this.scale.hide();
//         }
//     }

//     showHideTooltips(flag: boolean): void {
//         if (flag) {
//             this.tooltipOne.show();
//             this.tooltipTwo.show();
//         } else {
//             this.tooltipOne.hide();
//             this.tooltipTwo.hide();
//         }
//     }
// }

// export default View;


































// //     private thumbInit(startPosition: number = 0, width: number = 20, height: number = 20): HTMLElement {
// //         const thumb: HTMLElement = this.createSliderElement('div', 'slider__thumb');
// //         thumb.style.left = `${startPosition}px`;
// //         thumb.style.width = `${width}px`;
// //         thumb.style.height = `${height}px`;
// //         this.slider.append(thumb);

// //         thumb.ondragstart = function () {
// //             return false;
// //         };

// //         thumb.onmousedown = event => {

// //             let cursorPosition: number = 0;

// //             if (this.slider.classList.contains('horizontal')) {
// //                 cursorPosition = event.clientX;
// //             } else if (this.slider.classList.contains('vertical')) {
// //                 cursorPosition = event.clientY;
// //             }
// //             this.startDrag(event.target as HTMLElement, cursorPosition);

// //             return false; // disable selection start (cursor change)
// //         }

// //         return thumb;
// //     }



// //     private createSliderElement(elem: string, className: string): HTMLElement {
// //         const newElem: HTMLElement = document.createElement(elem);
// //         newElem.className = className;

// //         return newElem;
// //     }

// //     private progressBarSetWidth(newWidth: number): void {
// //         this.progressBar.style.width = newWidth + 'px';
// //     }

// //     private startDrag(thumb: HTMLElement, cursorPosition: number) {

// //         let thumbCoords: DOMRect = thumb.getBoundingClientRect();
// //         let shift: number = 0;

// //         if (this.slider.classList.contains('horizontal')) {
// //             this.thumbShift = cursorPosition - thumbCoords.left;
// //         } else if (this.slider.classList.contains('vertical')) {
// //             this.thumbShift = cursorPosition - thumbCoords.top;
// //         }

// //         this.onMouseMoveHandler = this.moveTo.bind(this);
// //         this.onMouseUpHandler = this.endDrag.bind(this);

// //         document.addEventListener('mousemove',
// //             this.onMouseMoveHandler as EventListenerOrEventListenerObject);
// //         document.addEventListener('mouseup',
// //             this.onMouseUpHandler as EventListenerOrEventListenerObject);

// //     }



// //     private moveTo(event: MouseEvent) {

// //             const sliderCoords: DOMRect = this.slider.getBoundingClientRect();

// //             // вычесть координату родителя, т.к. position: relative
// //             let newLeft: number = event.clientX - this.thumb.getShiftX() - sliderCoords.left;

// //             // курсор ушёл вне слайдера
// //             if (newLeft < 0) {
// //                 newLeft = 0;
// //             }

// //             let rightEdge: number = this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth;

// //             newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;

// //             if (newLeft >= rightEdge) {
// //                 newLeft = rightEdge;
// //             } else {
// //                 // this.stepsCount = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
// //                 // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
// //                 newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;


// //                 // let stepCount: number = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
// //                 // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / stepCount;
// //                 // newLeft = Math.round(newLeft / stepSize) * stepSize;
// //             }

// //             this.progressBar?.setWidth(newLeft + this.thumb.getElement().offsetWidth);
// //             this.thumb.moveTo(newLeft);

// //             // console.log(this.positionToValue(this.thumb, newLeft))////////////////////////////////////

// //     }






//     // createSlider(sliderOptions: INewSliderOptions) {
//     //     const sliderComponents: ISliderComponents = this.addSliderToPage(sliderOptions.sliderPosition);

//     //     this.addSlider(sliderComponents.sliderElem, sliderOptions.settings.sliderSettings);
//     //     this.addTrack(sliderComponents.trackElem);
//     //     this.addProgressBar(sliderComponents.progressBar);
//     //     this.addThumb(sliderComponents.thumbElem, sliderOptions.settings.thumbSettings);

//     //     this.stepsCount = this.calculateStepsNumber();
//     //     this.stepSize = this.calculateStepSize();

//     //     if (this.slider && this.thumb) {
//     //         this.pixelsPerValue = (this.slider.getElement().clientWidth -
//     //                     this.thumb.getElement().clientWidth) / 100;
//     //     }

//     //     this.addScale(sliderComponents.scaleElem, sliderOptions.settings.scaleSettings);
//     // }

//     // private calculateStepsNumber(): number{
//     //     if (this.thumb) {
//     //         return (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
//     //     }

//     //     return 0;
//     // }

//     // private calculateStepSize(): number{
//     //     if (this.thumb && this.slider) {
//     //         return (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
//     //     }

//     //     return 0;
//     // }

//     // private addTrack(trackElem: HTMLElement) {
//     //     this.track = new Track(trackElem);

//     //     trackElem.addEventListener('click', (event) => {
//     //         this.moveTo(event);
//     //     })
//     // }

//     // private addProgressBar(progressBarElem: HTMLElement) {
//     //     this.progressBar = new ProgressBar(progressBarElem, 0);
//     // }

//     // private addSlider(sliderElem: HTMLElement, sliderSettings: ISliderSettings) {
//     //     this.slider = new Slider(sliderElem, sliderSettings);
//     // }

//     // private addThumb(thumbElem: HTMLElement, thumbSettings: IThumbSettings) {

//     //     this.thumb = new Thumb(thumbElem, thumbSettings);

//     //     // const thumbElem: HTMLElement = this.thumb.getElement();

//     //     thumbElem.ondragstart = function () {
//     //         return false;
//     //     };

//     //     thumbElem.onmousedown = event => {
//     //         if (this.slider && this.thumb) {
//     //             // this.pixelsPerValue = (this.slider.getElement().clientWidth -
//     //             //     this.thumb.getElement().clientWidth) / 100;

//     //             this.startDrag(event.clientX, event.clientY);
//     //         }            

//     //         return false; // disable selection start (cursor change)
//     //     }
//     // }

//     // private addScale(scaleElem: HTMLElement, scaleSettings: IScaleSettings) {
//     //     if (this.thumb) {
//     //         this.scale = new Scale(scaleElem, scaleSettings, Math.round(this.stepsCount + 1), this.stepSize, this.thumb.getElement().clientWidth, this.pixelsPerValue);
//     //         scaleElem.addEventListener('click', (event) => {
//     //             this.moveTo(event)
//     //         })
//     //     }
//     // }

//     // private addSliderToPage(sliderPosition: HTMLElement): ISliderComponents {
//     //     const sliderElem: HTMLElement = document.createElement('div');
//     //     sliderElem.className = 'slider';

//     //     const trackElem: HTMLElement = document.createElement('div');
//     //     trackElem.className = 'slider__track';

//     //     const progressBarElem: HTMLElement = document.createElement('div');
//     //     progressBarElem.className = 'slider__progress-bar';

//     //     const thumbElem: HTMLElement = document.createElement('div');
//     //     thumbElem.className = 'slider__thumb';

//     //     const scaleElem: HTMLElement = document.createElement('div');
//     //     scaleElem.className = 'slider__scale';

//     //     sliderElem.append(trackElem);
//     //     sliderElem.append(progressBarElem);
//     //     sliderElem.append(thumbElem);
//     //     sliderElem.append(scaleElem);
//     //     sliderPosition.append(sliderElem);

//     //     return {'sliderElem': sliderElem, 'trackElem': trackElem, 'progressBar': progressBarElem, 'thumbElem': thumbElem, 'scaleElem': scaleElem}
//     // }

//     // private startDrag(startClientX: number, startClientY: number) {
//     //     if (this.thumb && this.slider) {

//     //         const thumbCoords: DOMRect = this.thumb.getElement().getBoundingClientRect();

//     //         this.thumb.setShiftX(startClientX - thumbCoords.left);
//     //         this.thumb.setShiftY(startClientY - thumbCoords.top);

//     //         this.onMouseMoveHandler = this.moveTo.bind(this);
//     //         this.onMouseUpHandler = this.endDrag.bind(this);

//     //         document.addEventListener('mousemove',
//     //             this.onMouseMoveHandler as EventListenerOrEventListenerObject);
//     //         document.addEventListener('mouseup',
//     //             this.onMouseUpHandler as EventListenerOrEventListenerObject);
//     //     }
//     // }

//     // private moveTo(event: MouseEvent) {
//     //     if (this.slider && this.thumb) {

//     //         const sliderCoords: DOMRect = this.slider.getElement().getBoundingClientRect();

//     //         // вычесть координату родителя, т.к. position: relative
//     //         let newLeft: number = event.clientX - this.thumb.getShiftX() - sliderCoords.left;

//     //         // курсор ушёл вне слайдера
//     //         if (newLeft < 0) {
//     //             newLeft = 0;
//     //         }

//     //         let rightEdge: number = this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth;

//     //         newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;

//     //         if (newLeft >= rightEdge) {
//     //             newLeft = rightEdge;
//     //         } else {
//     //             // this.stepsCount = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
//     //             // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
//     //             newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;


//     //             // let stepCount: number = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
//     //             // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / stepCount;
//     //             // newLeft = Math.round(newLeft / stepSize) * stepSize;
//     //         }

//     //         this.progressBar?.setWidth(newLeft + this.thumb.getElement().offsetWidth);
//     //         this.thumb.moveTo(newLeft);

//     //         // console.log(this.positionToValue(this.thumb, newLeft))////////////////////////////////////
//     //     }
//     // }

//     // private endDrag(): void {
//     //     document.removeEventListener('mousemove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
//     //     document.removeEventListener('mouseup', this.onMouseUpHandler as EventListenerOrEventListenerObject);
//     // }

//     // changeMinValue(value: number) {
//     //     if (this.thumb) {
//     //         this.thumb.setMinValue(value);
//     //     }
//     // }

//     // changeMaxValue(value: number) {
//     //     if (this.thumb) {
//     //         this.thumb.setMaxValue(value);
//     //     }
//     // }

//     // changeStepValue(value: number) {
//     //     if (this.thumb) {
//     //         this.thumb.setStepValue(value);
//     //     }
//     // }

//     // private positionToValue(thumb: Thumb, left: number) {
//     //     // return (Math.round(left / thumb.pixelsPerValue));
//     //     return Math.round(thumb.getMinValue() + ((thumb.getMaxValue() - 
//     //         thumb.getMinValue()) / 100 * Math.round(left / this.pixelsPerValue)));
//     // }
















// // import { Observable } from './observable';
// // import { INewSliderOptions } from './interfaces';
// // import { ISliderComponents } from './interfaces';
// // import { ISliderSettings } from './interfaces';
// // import { IThumbSettings } from './interfaces';
// // import { IScaleSettings } from './interfaces';
// // import { Slider } from './slider';
// // import { Track } from './track';
// // import { ProgressBar } from './progressBar';
// // import { Thumb } from './thumb';
// // import { Scale } from './scale';

// // export class View {

// //     private observer: Observable;
// //     private slider: Slider | null = null;
// //     private track: Track | null = null;
// //     private progressBar: ProgressBar | null = null;
// //     private thumb: Thumb | null = null;
// //     private scale: Scale | null = null;
// //     private pixelsPerValue: number = 0;
// //     private onMouseMoveHandler: Function | null = null;
// //     private onMouseUpHandler: Function | null = null;
// //     private stepsCount: number = 0;
// //     private stepSize: number = 0;

// //     constructor(observer: Observable) {
// //         this.observer = observer;
// //     }

// //     createSlider(sliderOptions: INewSliderOptions) {
// //         const sliderComponents: ISliderComponents = this.addSliderToPage(sliderOptions.sliderPosition);

// //         this.addSlider(sliderComponents.sliderElem, sliderOptions.settings.sliderSettings);
// //         this.addTrack(sliderComponents.trackElem);
// //         this.addProgressBar(sliderComponents.progressBar);
// //         this.addThumb(sliderComponents.thumbElem, sliderOptions.settings.thumbSettings);

// //         this.stepsCount = this.calculateStepsNumber();
// //         this.stepSize = this.calculateStepSize();

// //         if (this.slider && this.thumb) {
// //             this.pixelsPerValue = (this.slider.getElement().clientWidth -
// //                         this.thumb.getElement().clientWidth) / 100;
// //         }

// //         this.addScale(sliderComponents.scaleElem, sliderOptions.settings.scaleSettings);
// //     }

// //     private calculateStepsNumber(): number{
// //         if (this.thumb) {
// //             return (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
// //         }

// //         return 0;
// //     }

// //     private calculateStepSize(): number{
// //         if (this.thumb && this.slider) {
// //             return (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
// //         }

// //         return 0;
// //     }

// //     private addTrack(trackElem: HTMLElement) {
// //         this.track = new Track(trackElem);

// //         trackElem.addEventListener('click', (event) => {
// //             this.moveTo(event);
// //         })
// //     }

// //     private addProgressBar(progressBarElem: HTMLElement) {
// //         this.progressBar = new ProgressBar(progressBarElem, 0);
// //     }

// //     private addSlider(sliderElem: HTMLElement, sliderSettings: ISliderSettings) {
// //         this.slider = new Slider(sliderElem, sliderSettings);
// //     }

// //     private addThumb(thumbElem: HTMLElement, thumbSettings: IThumbSettings) {

// //         this.thumb = new Thumb(thumbElem, thumbSettings);

// //         // const thumbElem: HTMLElement = this.thumb.getElement();

// //         thumbElem.ondragstart = function () {
// //             return false;
// //         };

// //         thumbElem.onmousedown = event => {
// //             if (this.slider && this.thumb) {
// //                 // this.pixelsPerValue = (this.slider.getElement().clientWidth -
// //                 //     this.thumb.getElement().clientWidth) / 100;

// //                 this.startDrag(event.clientX, event.clientY);
// //             }            

// //             return false; // disable selection start (cursor change)
// //         }
// //     }

// //     private addScale(scaleElem: HTMLElement, scaleSettings: IScaleSettings) {
// //         if (this.thumb) {
// //             this.scale = new Scale(scaleElem, scaleSettings, Math.round(this.stepsCount + 1), this.stepSize, this.thumb.getElement().clientWidth, this.pixelsPerValue);
// //             scaleElem.addEventListener('click', (event) => {
// //                 this.moveTo(event)
// //             })
// //         }
// //     }

// //     private addSliderToPage(sliderPosition: HTMLElement): ISliderComponents {
// //         const sliderElem: HTMLElement = document.createElement('div');
// //         sliderElem.className = 'slider';

// //         const trackElem: HTMLElement = document.createElement('div');
// //         trackElem.className = 'slider__track';

// //         const progressBarElem: HTMLElement = document.createElement('div');
// //         progressBarElem.className = 'slider__progress-bar';

// //         const thumbElem: HTMLElement = document.createElement('div');
// //         thumbElem.className = 'slider__thumb';

// //         const scaleElem: HTMLElement = document.createElement('div');
// //         scaleElem.className = 'slider__scale';

// //         sliderElem.append(trackElem);
// //         sliderElem.append(progressBarElem);
// //         sliderElem.append(thumbElem);
// //         sliderElem.append(scaleElem);
// //         sliderPosition.append(sliderElem);

// //         return {'sliderElem': sliderElem, 'trackElem': trackElem, 'progressBar': progressBarElem, 'thumbElem': thumbElem, 'scaleElem': scaleElem}
// //     }

// //     private startDrag(startClientX: number, startClientY: number) {
// //         if (this.thumb && this.slider) {

// //             const thumbCoords: DOMRect = this.thumb.getElement().getBoundingClientRect();

// //             this.thumb.setShiftX(startClientX - thumbCoords.left);
// //             this.thumb.setShiftY(startClientY - thumbCoords.top);

// //             this.onMouseMoveHandler = this.moveTo.bind(this);
// //             this.onMouseUpHandler = this.endDrag.bind(this);

// //             document.addEventListener('mousemove',
// //                 this.onMouseMoveHandler as EventListenerOrEventListenerObject);
// //             document.addEventListener('mouseup',
// //                 this.onMouseUpHandler as EventListenerOrEventListenerObject);
// //         }
// //     }

// //     private moveTo(event: MouseEvent) {
// //         if (this.slider && this.thumb) {

// //             const sliderCoords: DOMRect = this.slider.getElement().getBoundingClientRect();

// //             // вычесть координату родителя, т.к. position: relative
// //             let newLeft: number = event.clientX - this.thumb.getShiftX() - sliderCoords.left;

// //             // курсор ушёл вне слайдера
// //             if (newLeft < 0) {
// //                 newLeft = 0;
// //             }

// //             let rightEdge: number = this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth;

// //             newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;

// //             if (newLeft >= rightEdge) {
// //                 newLeft = rightEdge;
// //             } else {
// //                 // this.stepsCount = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
// //                 // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
// //                 newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;


// //                 // let stepCount: number = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
// //                 // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / stepCount;
// //                 // newLeft = Math.round(newLeft / stepSize) * stepSize;
// //             }

// //             this.progressBar?.setWidth(newLeft + this.thumb.getElement().offsetWidth);
// //             this.thumb.moveTo(newLeft);

// //             // console.log(this.positionToValue(this.thumb, newLeft))////////////////////////////////////
// //         }
// //     }

// //     private endDrag(): void {
// //         document.removeEventListener('mousemove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
// //         document.removeEventListener('mouseup', this.onMouseUpHandler as EventListenerOrEventListenerObject);
// //     }

// //     changeMinValue(value: number) {
// //         if (this.thumb) {
// //             this.thumb.setMinValue(value);
// //         }
// //     }

// //     changeMaxValue(value: number) {
// //         if (this.thumb) {
// //             this.thumb.setMaxValue(value);
// //         }
// //     }

// //     changeStepValue(value: number) {
// //         if (this.thumb) {
// //             this.thumb.setStepValue(value);
// //         }
// //     }

// //     private positionToValue(thumb: Thumb, left: number) {
// //         // return (Math.round(left / thumb.pixelsPerValue));
// //         return Math.round(thumb.getMinValue() + ((thumb.getMaxValue() - 
// //             thumb.getMinValue()) / 100 * Math.round(left / this.pixelsPerValue)));
// //     }
// // }









// // export class View {

// //     observer: Observable;

// //     constructor(observer: Observable) {
// //         this.observer = observer;
// //     }

// //     searchSlidersPositions(): void {
// //         let slidersPositions: NodeListOf<HTMLElement> =
// //             document.querySelectorAll('.incredible-slider-plugin');

// //         for (let sliderPosition of slidersPositions) {
// //             this.createSlider(sliderPosition)
// //         }
// //     }

// //     createSlider(sliderPosition: HTMLElement) {
// //         let slider: HTMLElement = document.createElement('div');
// //         slider.className = 'slider';

// //         let track: HTMLElement = document.createElement('div');
// //         track.className = 'slider__track';

// //         let thumb: HTMLElement = document.createElement('div');
// //         thumb.className = 'slider__thumb';

// //         slider.append(track);
// //         slider.append(thumb);
// //         document.body.append(slider);
// //         sliderPosition.replaceWith(slider);

// //         // const sliderFunc = this.Slider(slider);

// //         this.observer.notify('addedNewSliderToDOM',
// //             { 'sliderElem': slider, 'trackElem': track, 'thumbElem': thumb });
// //     }

// //     targetIsThumb(event: MouseEvent): boolean {
// //         const target: HTMLElement = event.target as HTMLElement;

// //         if (target.classList.contains('slider__thumb')) {
// //             return true;
// //         }

// //         return false;
// //     }

// //     moveTo(thumbElem: HTMLElement, newLeft: number): void {
// //         thumbElem.style.left = newLeft + 'px';
// //     }
// // }