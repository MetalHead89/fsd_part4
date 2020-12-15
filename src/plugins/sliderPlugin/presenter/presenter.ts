import { ISliderSettings } from '../interfaces';
import { ISliderSize } from '../interfaces'
import { IThumbSize } from '../interfaces'
import { IThumbPosition } from '../interfaces'
import { IDragThumbArgs } from '../interfaces'
import { IProgressBarPosition } from '../interfaces';
import { IScalePointSize } from '../interfaces';
import { IScalePointSettings } from '../interfaces';
import { ICursorPosition } from '../interfaces';
import { IScaleSize } from '../interfaces';

import Observer from '../observer/observer';
import Model from '../model/model';
import View from '../view/view';


/**
 * Реализует взаимодействие между Моделью и Видом. Выполняет следующие действия:
 * Реагирует на уведомления от Вида о новых событиях связанных с пользовательским вводом и передаёт данные в Модель;
 * Реагирует на уведомления от Модели о новых изменениях и передаёт данные в Вид, для изменения отображения слайдера;
 * Предоставляет методы API для внешнего управления слайдером
 */
class Presenter {
    private observer: Observer;
    private model: Model;
    private view: View;


    constructor(settings: ISliderSettings, sliderWrapper: HTMLElement) {
        this.observer = new Observer();
        this.model = new Model(this.observer, settings);
        this.view = new View(this.observer, sliderWrapper);

        this.addObserverListeners();
        this.createNewSlider();
    }


    /**
     * Подписывает наблюдателя на прослушивание уведомлений от Model и View
     */
    private addObserverListeners(): void {
        this.observer.subscribe('sliderElementIsCreated',
            (sliderSize: ISliderSize) => { this.model.setSliderSize(sliderSize) });
        this.observer.subscribe('thumbOneIsCreated',
            (thumbSize: IThumbSize) => { this.model.setThumbSize(thumbSize); });
        this.observer.subscribe('thumbOneIsDragged',
            (thumbPosition: IThumbPosition) => { this.model.dragthumbOne(thumbPosition) });
        this.observer.subscribe('thumbTwoIsDragged',
            (thumbPosition: IThumbPosition) => { this.model.dragThumbTwo(thumbPosition) });
        this.observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                this.view.moveThumbOne(args.thumbPosition);
                this.view.tooltipOneSetValue(args.tooltipValue);
            });
        this.observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                this.view.moveThumbTwo(args.thumbPosition);
                this.view.tooltipTwoSetValue(args.tooltipValue);
            });
        this.observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => { this.view.setProgressBarPosition(progressBarPosition) });
        this.observer.subscribe('scaleIsCreated', () => {
            this.model.setScalePointSize(this.getScalePointMaxSize());
            this.model.generateScale()
        });
        this.observer.subscribe('addScalePoint',
            (pointSettings: IScalePointSettings) => { this.view.addScalePoint(pointSettings) });
        this.observer.subscribe('clickOnTheScale',
            (cursorPosition: ICursorPosition) => { this.model.moveThumbToClickPosition(cursorPosition) });
        this.observer.subscribe('clickOnTheTrack',
            (cursorPosition: ICursorPosition) => { this.model.moveThumbToClickPosition(cursorPosition) });
        this.observer.subscribe('scaleCreated',
            (scaleSize: IScaleSize) => { this.view.setScaleSize(scaleSize) });
    }


    /**
     * Создаёт новый слайдер исходя из настроек, хранящихся в Model
     */
    createNewSlider(): void {
        const orientation = this.model.getSliderOrientation();

        this.view.createSlider(`slider slider_${orientation}`);
        this.view.createTrack(`slider__track slider__track_${orientation}`);
        this.view.createProgressBar(`slider__progress-bar slider__progress-bar_${orientation}`)
        this.createThumbs(orientation);
        if (this.model.getScaleVisiblity()) {
            this.view.createScale(`slider__scale slider__scale_${orientation}`);
        }
    }


    /**
     * Создаёт бегунки и устанавливает их на позиции
     * @param {string} orientation - ориентация слайдера 'horizontal или 'vertical'
     * @param {boolean} isStartPosition - флаг расстановки бегунков на стартовые позиции. Если true - бегунки устанавливаются на стартовые позиции.
     * Если false - на позиции сохранённые в Модели
     */
    private createThumbs(orientation: string, isStartPosition = true): void {
        const sliderType: string = this.model.getSliderType();
        const tooltipsVisible: boolean = this.model.getTooltipsVisiblity();

        this.view.createThumbOne(`slider__thumb slider__thumb-one slider__thumb_${orientation}`);
        if (tooltipsVisible) {
            this.view.createTooltipOne(`slider__tooltip slider__tooltip_${orientation}`);
        }

        if (sliderType === 'range') {
            this.view.createThumbTwo(`slider__thumb slider__thumb-two slider__thumb_${orientation}`);
            if (tooltipsVisible) {
                this.view.createTooltipTwo(`slider__tooltip slider__tooltip_${orientation}`);
            }
            if (isStartPosition) {
                this.model.setThumbTwoToStartingPosition();
            } else {
                this.model.dragThumbTwo(this.model.getThumbTwoPosition());
            }
        }

        if (isStartPosition) {
            this.model.setThumbOneToStartingPosition();
        } else {
            this.model.dragthumbOne(this.model.getThumbOnePosition());
        }
    }


    /**
     * Возвращает размер последней точки шкалы, который является максимальным.
     * Максимальный размер точки шкалы необходим для того, чтобы все точки были одинаковыми и для избежания их наложения
     * друг на друга во время формирования шкалы
     * 
     * @returns {IScalePointSize} - объект с максимальной шириной и высотой точки шкалы
     */
    private getScalePointMaxSize(): IScalePointSize {
        const sliderMaxValue: number = this.model.getMax();
        return this.view.getScalePointMaxSize(sliderMaxValue);
    }


    /**
     * Возвращает флаг видимости шкалы
     * 
     * @returns {boolean} - флаг видимости шкалы. true - шкала видна, false - нет
     */
    getScaleVisiblity(): boolean {
        return this.model.getScaleVisiblity();
    }


    /**
     * Возвращает флаг видимости бегунков
     * 
     * @returns {boolean} - флаг видимости значений бегунков. true - значение отображается, false - нет
     */
    getTooltipsVisiblity(): boolean {
        return this.model.getTooltipsVisiblity();
    }


    /**
     * Возвращает тип слайдера
     * 
     * @returns {string} - тип слайдера single или range
     */
    getSliderType(): string {
        return this.model.getSliderType();
    }


    /**
     * Возвращает ориентацию слайдера
     * 
     * @returns {string} - ориентация слайдера horizontal или vertical
     */
    getSliderOrientation(): string {
        return this.model.getSliderOrientation();
    }


    /**
     * Изменяет ориентацию слайдера
     * 
     * @param orienation - ориентация слайдера horizontal или vertical
     */
    changeSliderOrientation(orienation: string): void {
        if (orienation !== this.model.getSliderOrientation()) {
            this.model.setSliderOrientation(orienation);
            const thumbOnePosition = this.model.getThumbOnePosition();
            const thumbTwoPosition = this.model.getThumbTwoPosition();
            this.model.setThumbOnePosition({ 'left': thumbOnePosition.top, 'top': thumbOnePosition.left });
            this.model.setThumbTwoPosition({ 'left': thumbTwoPosition.top, 'top': thumbTwoPosition.left });
            this.view.removeSlider();
            this.createNewSlider();
        }
    }


    /**
     * Изменяет тип слайдера
     * 
     * @param {string} type - тип слайдера single или range
     */
    changeSliderType(type: string) {
        this.view.removeThumbOne();
        this.view.removeThumbTwo();
        this.model.setSliderType(type);
        this.createThumbs(this.model.getSliderOrientation(), false);
    }


    /**
     * Изменяет минимальное значение слайдера
     * 
     * @param {number} newMin - минимальное значение 
     */
    changeMinValue(newMin: number) {
        const valueIsSet: boolean = this.model.setMin(newMin);

        if (valueIsSet) {
            this.view.removeSlider();
            this.createNewSlider();
        }
    }


    /**
     * Изменяет максимальное значение слайдера
     * 
     * @param {number} newMin - максимальное значение 
     */
    changeMaxValue(newMax: number) {
        const valueIsSet: boolean = this.model.setMax(newMax);

        if (valueIsSet) {
            this.view.removeSlider();
            this.createNewSlider();
        }
    }


    /**
     * Изменяет величину шага бегунка
     * 
     * @param {number} newStep - величина с которой перемещается бегунок 
     */
    changeStep(newStep: number) {
        const valueIsSet: boolean = this.model.setStep(newStep);

        if (valueIsSet) {
            this.view.removeSlider();
            this.createNewSlider();
        }
    }


    /**
     * Изменяет флаг видимости шкалы
     * 
     * @param {boolean} scaleVisible - флаг видимости шкалы. true - шкала видна, false - нет
     */
    changeScaleVisibility(scaleVisible: boolean) {
        this.model.setScaleVisibility(scaleVisible);

        if (scaleVisible) {
            this.view.createScale(`slider__scale slider__scale_${this.model.getSliderOrientation()}`);
        } else {
            this.view.removeScale();
        }
    }


    /**
     * Изменяет флаг видимости значений бегунков
     * 
     * @param {boolean} tooltipsVisible - флаг видимости значений бегунков. true - значение отображается, false - нет
     */
    changeTooltipsVisibility(tooltipsVisible: boolean) {
        this.model.setTooltipsVisible(tooltipsVisible);

        if (tooltipsVisible) {
            this.view.removeThumbOne();
            this.view.removeThumbTwo();
            this.createThumbs(this.model.getSliderOrientation(), false);
        } else {
            this.view.removeTooltipOne();
            this.view.removeTooltipTwo();
        }
    }


    // /**
    //  * Метод для тестирования. Необходим для доступа к приватному полю observer
    //  * @param {string} notification - уведомление при получении которого вызывается функция func
    //  * @param {Function} func - функция, которая вызывается после получения наблюдателем уведомления notification
    //  */
    // subscribeToNotifications(notification: string, func: Function) {
    //     this.observer.subscribe(notification, func);
    // }

}

export default Presenter;


















// import { IThumbPosition } from './interfaces';
// import { IScalePointSettings } from './interfaces';
// import { ICursorPosition } from './interfaces';
// import { IScalePointSize } from './interfaces';
// import { IProgressBarPosition } from './interfaces';
// import { IScaleSize } from './interfaces';

// import Observable from './observable';
// import Model from './model';
// import View from './view';

// class Presenter {
//     view: View;
//     model: Model;
//     observer: Observable;

//     constructor(view: View, model: Model, observer: Observable) {
//         this.view = view;
//         this.model = model;
//         this.observer = observer;

//         this.addObserverListeners();
//         this.init();
//     }

//     private init() {
//         this.view.setSliderOrientation(this.model.getSliderOrientation());
//         this.model.setSliderSize(this.view.getSliderSize());
//         this.model.setThumbSize(this.view.getThumbSize());
//         this.model.calculateStepsCount();
//         this.model.calculateStepSize();
//         this.model.setPixelsPerValue();
//         this.model.changeThumbTwoDisplay();
//         this.view.scaleRemove();
//         this.view.createScale(this.model.getScaleVisiblity(), this.model.getSliderOrientation());
//         this.model.setScalePointSize(this.getScalePointMaxSize());
//         this.model.generateScale();


//         const thumbOnePos: IThumbPosition = this.model.getThumbOnePosition();
//         const thumbTwoPos: IThumbPosition = this.model.getThumbTwoPosition();

//         if (thumbTwoPos.left === -1 && thumbTwoPos.top === -1) {
//             this.model.setThumbTwoToStartingPosition();
//         } else {
//             this.model.thumbTwoDrag(this.model.getThumbTwoPosition())
//         }

//         if (thumbOnePos.left === -1 && thumbOnePos.top === -1) {
//             this.model.setThumbOneToStartingPosition();
//         } else {
//             this.model.thumbOneDrag(this.model.getThumbOnePosition())
//         }
//     }


//     private addObserverListeners() {

//         this.observer.subscribe('startDragThumbOne',
//             (thumbPosition: IThumbPosition) => { this.model.thumbOneDrag(thumbPosition) });

//         this.observer.subscribe('startDragThumbTwo',
//             (thumbPosition: IThumbPosition) => { this.model.thumbTwoDrag(thumbPosition) });

//         this.observer.subscribe('thumbOneDraged',
//             (position: IThumbPosition) => { this.view.moveThumbOne(position) });

//         this.observer.subscribe('thumbTwoDraged',
//             (position: IThumbPosition) => { this.view.moveThumbTwo(position) });

//         this.observer.subscribe('progressBarDraged',
//             (progressBarPosition: IProgressBarPosition) => { this.view.setProgressBarPosition(progressBarPosition) });

        // this.observer.subscribe('addScalePoint',
        //     (pointSettings: IScalePointSettings) => { this.view.addScalePoint(pointSettings) });

        // this.observer.subscribe('clickOnTheScale',
        //     (cursorPosition: ICursorPosition) => { this.model.moveThumb(cursorPosition) });

//         this.observer.subscribe('clickOnTheTrack',
//             (cursorPosition: ICursorPosition) => { this.model.moveThumb(cursorPosition) });

        // this.observer.subscribe('scaleCreated',
        //     (scaleSize: IScaleSize) => { this.view.setScaleSize(scaleSize) });

//         this.observer.subscribe('showThumbTwo', () => { this.view.showThumb() });

//         this.observer.subscribe('hideThumbTwo', () => { this.view.hideThumb() });

//         this.observer.subscribe('tooltipOneDraged', (value: number) => { this.view.setTooltipOneText(value) });

//         this.observer.subscribe('tooltipTwoDraged', (value: number) => { this.view.setTooltipTwoText(value) });

//         this.observer.subscribe('updatedMinValue', () => { this.init() });

//         this.observer.subscribe('updatedMaxValue', () => { this.init() });

//         this.observer.subscribe('updatedStep', () => { this.init() });

//         this.observer.subscribe('updatedScaleFlag', () => { this.init() });

//         this.observer.subscribe('updatedTooltipFlag', () => { this.view.showHideTooltips(this.model.getTooltipsVisiblity()) });

//         this.observer.subscribe('updatedSliderType', () => { this.init() });

//         this.observer.subscribe('updatedSliderOrientation', (orientation: string) => { 
//             this.view.setProgressBarOrientation(orientation);
//             this.init(); 
//         });

//     }

    // private getScalePointMaxSize(): IScalePointSize {
    //     const sliderMaxValue: number = this.model.getMaxValue();
    //     return this.view.getScalePointMaxSize(sliderMaxValue);
    // }
// }

// export default Presenter;











// // import { Observable } from './observable';
// // import { Model } from './model';
// // import { View } from './view';
// // import { INewSliderOptions } from './interfaces';
// // // import { INewSliderOptions } from '../slider/interfaces';

// // export class Presenter {
// //     view: View;
// //     model: Model;
// //     observer: Observable;

// //     constructor(view: View, model: Model, observer: Observable) {
// //         this.view = view;
// //         this.model = model;
// //         this.observer = observer;

// //         this.observer.subscribe('addedNewSliderConfiguration', 
// //             (sliderOptions: INewSliderOptions) => 
// //                 this.view.createSlider(sliderOptions));

// //         this.observer.subscribe('updatedMinValue', 
// //             (value: number) => this.view.changeMinValue(value));

// //         this.observer.subscribe('updatedMaxValue', 
// //             (value: number) => this.view.changeMaxValue(value));

// //         this.observer.subscribe('updatedStepValue', 
// //             (value: number) => this.view.changeStepValue(value))


// //     }
// // }












// // // export class Presenter {
// // //     view: View;
// // //     model: Model;
// // //     observer: Observable;

// // //     constructor(view: View, model: Model, observer: Observable) {
// // //         this.view = view;
// // //         this.model = model;
// // //         this.observer = observer;

// // //         this.observer.subscribe('addedNewSliderToDOM',
// // //             (sliderComponents: { [index: string]: HTMLElement }) => this.sliderInit(sliderComponents));

// // //         this.observer.subscribe('dragStarted', (args: { [index: string]: HTMLElement }) => {
// // //             const onMouseMoveHandler: Function = this.onDocumentMouseMove.bind(this, args.sliderElem);
// // //             const onMouseUpHandler: Function = this.onDocumentMouseUp.bind(this, args.sliderElem);

// // //             this.model.setOnMouseMoveHadler(args.sliderElem, onMouseMoveHandler);
// // //             this.model.setOnMouseUpHadler(args.sliderElem, onMouseUpHandler);

// // //             document.addEventListener('mousemove', onMouseMoveHandler as EventListenerOrEventListenerObject);/////////////////////////////////////////////
// // //             document.addEventListener('mouseup', onMouseUpHandler as EventListenerOrEventListenerObject);
// // //         });

// // //         this.observer.subscribe('moveTo',
// // //             (args: IMoveToArgs) => {
// // //                 this.view.moveTo(args.thumbElem, args.newLeft)
// // //             });
// // //     }

// // //     // init(): void {
// // //     //     this.view.searchSlidersPositions();
// // //     // }

// // //     init(sliderPosition: HTMLElement): void {
// // //         this.view.createSlider(sliderPosition);
// // //     }

// // //     sliderInit(sliderComponents: { [index: string]: HTMLElement }): void {
// // //         const sliderElem: HTMLElement = sliderComponents.sliderElem;

// // //         sliderElem.ondragstart = function () {
// // //             return false;
// // //         };

// // //         sliderElem.onmousedown = event => {

// // //             if (this.view.targetIsThumb(event)) {
// // //                 this.model.startDrag(sliderElem, event.clientX, event.clientY);
// // //                 this.model.setPixelsPerValue(sliderElem);

// // //                 return false; // disable selection start (cursor change)
// // //             }

// // //         }

// // //         this.model.createSliderModel(sliderComponents);
// // //     }

// // //     onDocumentMouseMove(sliderElem: HTMLElement, event: MouseEvent): void {
// // //         this.model.moveTo(sliderElem, event.clientX);
// // //     }

// // //     onDocumentMouseUp(sliderElem: HTMLElement): void {
// // //         this.endDrag(sliderElem);
// // //     }

// // //     endDrag(sliderElem: HTMLElement): void {
// // //         document.removeEventListener('mousemove', this.model.getOnMouseMoveHadler(sliderElem) as EventListenerOrEventListenerObject);
// // //         document.removeEventListener('mouseup', this.model.getOnMouseUpHadler(sliderElem) as EventListenerOrEventListenerObject);
// // //     }
// // // }