import { IThumbPosition } from '../interfaces'
import { ISliderSize } from '../interfaces';
import { IThumbSize } from '../interfaces'
import { IScalePointSize } from '../interfaces'
import { IProgressBarPosition } from '../interfaces';

import Observer from '../observer/observer';
import ModelData from './modelData';


/**
 * Класс обеспечивает расчёт бизнес-логики слайдера
 */
class ModelCalculator {
    private observer: Observer;
    private data: ModelData;

    constructor(observer: Observer, data: ModelData) {
        this.observer = observer;
        this.data = data;
    }


    /**
     * Получает объект с позицией первого бегунка, приравнивает его свойства к допустимым значениям и передаёт его в метод thumbDrag,
     * который осуществляет передвижение бегунка в соответствии с полученными данными
     * 
     * @param {IThumbPosition} thumbPosition - сырая позиция бегунка, может выходить за пределы слайдера или второго бегунка
     */
    dragThumbOne(thumbPosition: IThumbPosition) {
        this.data.setThumbOnePosition(this.changePositionAccordingToStep(thumbPosition));
        const correctThumOnePosition: IThumbPosition = this.data.getThumbOnePosition();
        const thumbValue: number = this.positionToValue(this.getElementPosByOrientation(this.data.getThumbOnePosition()));

        this.thumbDrag(correctThumOnePosition, 'thumbOneDragged', thumbValue);
    }


    /**
     * Получает объект с позицией вторго бегунка, приравнивает его свойства к допустимым значениям и передаёт его в метод thumbDrag,
     * который осуществляет передвижение бегунка в соответствии с полученными данными
     * 
     * @param {IThumbPosition} thumbPosition - сырая позиция бегунка, может выходить за пределы слайдера или первого бегунка
     */
    dragThumbTwo(thumbPosition: IThumbPosition) {
        this.data.setThumbTwoPosition(this.changePositionAccordingToStep(thumbPosition));
        const correctThumTwoPosition: IThumbPosition = this.data.getThumbTwoPosition();
        const thumbValue: number = this.positionToValue(this.getElementPosByOrientation(this.data.getThumbTwoPosition()));

        this.thumbDrag(correctThumTwoPosition, 'thumbTwoDragged', thumbValue);
    }


    




    

    


    

    

    setThumbOneToStartingPosition() {

        /** Устанавливает первый бегунок на стартовую позицию */

        // this.data.setThumbTwoPosition({ 'left': this.data.getSliderSize().width, 'top': this.data.getSliderSize().height })

        if (this.data.getOrientation() === 'horizontal') {
            if (this.data.getSliderType() === 'single') {
                this.dragThumbOne({
                    'left': this.data.getSliderSize().width / 2 - this.data.getThumbSize().width / 2,
                    'top': 0
                });
            } else if (this.data.getSliderType() === 'range') {
                this.dragThumbOne({
                    'left': this.data.getSliderSize().width * 0.3 - this.data.getThumbSize().width / 2,
                    'top': 0
                });
            }
        } else if (this.data.getOrientation() === 'vertical') {
            if (this.data.getSliderType() === 'single') {
                this.dragThumbOne({
                    'left': 0,
                    'top': this.data.getSliderSize().height / 2 - this.data.getThumbSize().height / 2
                });
            } else if (this.data.getSliderType() === 'range') {
                this.dragThumbOne({
                    'left': 0,
                    'top': this.data.getSliderSize().height * 0.3 - this.data.getThumbSize().height / 2
                });
            }
        }

    }

    setThumbTwoToStartingPosition() {

        /** Устанавливает второй бегунок на стартовую позицию */

        if (this.data.getOrientation() === 'horizontal') {
            this.dragThumbTwo({
                'left': this.data.getSliderSize().width * 0.7 - this.data.getThumbSize().width / 2,
                'top': 0
            });
        } else if (this.data.getOrientation() === 'vertical') {
            this.dragThumbTwo({
                'left': 0,
                'top': this.data.getSliderSize().height * 0.7 - this.data.getThumbSize().height / 2
            });
        }

    }

    private positionToValue(position: number): number {

        /**
         * Возвращает значение бегунка исходя из его позиции
         */
        const pixelsPerValue = this.calculatePixelsPerValue();

        return Math.round(this.data.getMin() + ((this.data.getMax() - this.data.getMin()) /
            100 * Math.round(position / pixelsPerValue)));
    }

    private calculatePixelsPerValue(): number {

        /** 
         * Устанавливает количество пикселей в единице ширины слайдера, с вычетом крайних 
         * (тупиковых) зон
         */

        return (this.getElementSizeByOrientation(this.data.getSliderSize()) - this.getElementSizeByOrientation(this.data.getThumbSize())) / 100;
    }

    private calcProgressBarPosition(): IProgressBarPosition {

        /**
         * Возвращает размер и точку начала прогрессбара в зависимости от текущего положения бегунков
         */

        const progress: IProgressBarPosition = {
            'orientation': this.data.getOrientation(),
            'start': 0,
            'end': 0
        };

        if (this.data.getSliderType() === 'single') {
            progress.start = 0;
            progress.end = this.getElementPosByOrientation(this.data.getThumbOnePosition()) + this.getElementSizeByOrientation(this.data.getThumbSize());
        } else if (this.data.getSliderType() === 'range') {
            progress.start = this.getElementPosByOrientation(this.data.getThumbOnePosition());
            progress.end = this.getElementPosByOrientation(this.data.getThumbTwoPosition()) -
                this.getElementPosByOrientation(this.data.getThumbOnePosition()) + this.getElementSizeByOrientation(this.data.getThumbSize());
        }

        return progress;
    }


    generateScale() {
        let scalePointPosition = this.getElementSizeByOrientation(this.data.getThumbSize()) / 2 - this.getElementSizeByOrientation(this.data.getScalePointSize()) / 2;
        const stepsCount: number = this.calculateStepsCount();
        const stepSize: number = this.calculateStepSize();

        let prevScalePointPosition: number = 0;
        const scalePointsCount = stepsCount + 1;

        for (let i = 0; i <= Math.round(scalePointsCount - 1); i++) {
            const pointValue = this.positionToValue(scalePointPosition - this.getElementSizeByOrientation(this.data.getThumbSize()) / 2
                + this.getElementSizeByOrientation(this.data.getScalePointSize()) / 2);

            // if (i === 0 || this.isPointFits(scalePointPosition, prevScalePointPosition) || i === Math.round(scalePointsCount - 1)) {
            if (i === 0 || this.isPointFits(scalePointPosition, prevScalePointPosition)) {

                this.observer.notify('addScalePoint',
                    {
                        'position': scalePointPosition, 'scalePointSize': this.getElementSizeByOrientation(this.data.getScalePointSize()),
                        'scalePointValue': pointValue
                    });

                prevScalePointPosition = scalePointPosition;

            }

            scalePointPosition += stepSize;

            // if (i === Math.round(scalePointsCount - 2)) {
            //     scalePointPosition = this.getElementSizeByOrientation(this.data.getSliderSize())
            //         - this.getElementSizeByOrientation(this.data.getThumbSize()) / 2 - this.getElementSizeByOrientation(this.data.getScalePointSize()) / 2;

            //     if (this.data.getOrientation() === 'horizontal') {
            //         this.observer.notify('scaleCreated', { 'width': this.data.getSliderSize().width, 'height': this.data.getScalePointSize().height });
            //     } else if (this.data.getOrientation() === 'vertical') {
            //         this.observer.notify('scaleCreated', { 'width': this.data.getScalePointSize().width, 'height': this.data.getSliderSize().height });
            //     }
            // }
        }

    }

    private isPointFits(scalePointPosition: number, prevScalePointPosition: number): boolean {

        return (scalePointPosition - prevScalePointPosition - 2 >
            this.getElementSizeByOrientation(this.data.getScalePointSize()));

    }




    /**
     * Посылает уведомления с новой позицией бегунка для его передвижения и положением прогрессбара
     * 
     * @param {IThumbPosition} thumbPosition - позиция на которую необходимо передвинуть бегунок 
     * @param {string} notyfyMessage - текст уведомления, по которому определяется бегунок, который необходимо передвинуть 
     * @param {number} thumbValue - значение позиции, на которой находиться бегунок
     */
    private thumbDrag(thumbPosition: IThumbPosition, notyfyMessage: string, thumbValue: number): void {
        const newThumbPosition = Object.assign({}, thumbPosition);

        // Зануление свойств, не учавствующих в передвижении бегунка
        if (this.data.getOrientation() === 'horizontal') {
            newThumbPosition.top = 0;
        } else {
            newThumbPosition.left = 0;
        }

        this.observer.notify(notyfyMessage, { 'thumbPosition': newThumbPosition, 'tooltipValue': thumbValue });
        this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
    }


    /**
     * Возвращает ширину или длину переданного объекта в зависимости от ориентации слайдера.
     * При горизонтальной ориентации возвращается ширина, при вертикальной - длина.
     * 
     * @param {ISliderSize | IThumbSize | IScalePointSize} element - объект, ширину или длину которого необходимо получить
     */
    private getElementSizeByOrientation(element: ISliderSize | IThumbSize | IScalePointSize): number {
        if (this.data.getOrientation() === 'vertical') {
            return element.height;
        }

        return element.width
    }


    /**
     * Возвращает положение переданного объекта, относительно левого или верхнего края родительского контейнера, 
     * в зависимости от ориентации слайдера.
     * При горизонтальной ориентации возвращается положение относительно левого края родительского контейнера, 
     * при вертикальной - относительно верхнего.
     * 
     * @param {ISliderSize | IThumbSize | IScalePointSize} element - объект, ширину или длину которого необходимо получить
     */
    private getElementPosByOrientation(element: IThumbPosition): number {
        if (this.data.getOrientation() === 'vertical') {
            return element.top;
        }

        return element.left
    }


    private calculateStepsCount(): number {

        /** 
         * Считает количество шагов бегунка исходя из заданных значений и величины шага
         */

        return (this.data.getMax() - this.data.getMin()) / this.data.getStep();
    }


    private calculateStepSize(): number {

        /**
         * Считает размер одного шага бегунка в пикселях
         */

        return (this.getElementSizeByOrientation(this.data.getSliderSize()) -
            this.getElementSizeByOrientation(this.data.getThumbSize())) / this.calculateStepsCount();
    }


    private changePositionAccordingToStep(position: IThumbPosition): IThumbPosition {

        /**
         * Высчитывает новую позицию бегунка в соответствии с заданным шагом 
         */
        position.left = Math.round(position.left / this.calculateStepSize()) * this.calculateStepSize();
        position.top = Math.round(position.top / this.calculateStepSize()) * this.calculateStepSize();

        return position;
    }

}

export default ModelCalculator;