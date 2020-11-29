import { IThumbPosition } from '../interfaces'
import { ISliderSize } from '../interfaces';
import { IThumbSize } from '../interfaces'
import { IScalePointSize } from '../interfaces'

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

        // this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
        // this.observer.notify('tooltipOneDraged', this.positionToValue(this.getElementPosByOrientation(this.data.getThumbOnePosition())));
    }


    /**
     * Получает объект с позицией вторго бегунка, приравнивает его свойства к допустимым значениям и передаёт его в метод thumbDrag,
     * который осуществляет передвижение бегунка в соответствии с полученными данными
     * 
     * @param {IThumbPosition} thumbPosition - сырая позиция бегунка, может выходить за пределы слайдера или первого бегунка
     */
    dragThumbTwo(thumbPosition: IThumbPosition) {
        // if (this.data.getSliderType() == 'range' &&
        //     this.getElementPosByOrientation(thumbPosition) <= this.getElementPosByOrientation(this.data.getThumbOnePosition())) {
        //     thumbPosition = this.data.getThumbTwoPosition();

        //     // if (this.getElementPosByOrientation(thumbPosition) < this.getElementPosByOrientation(this.data.getThumbOnePosition())) {
        //     //     if (this.data.getOrientation() === 'horizontal') {
        //     //         thumbPosition.left = this.data.getSliderSize().width - this.data.getThumbSize().width;
        //     //     } else if (this.data.getOrientation() === 'vertical') {
        //     //         thumbPosition.top = this.data.getSliderSize().height - this.data.getThumbSize().height;
        //     //     }
        //     // }
        // }
        this.data.setThumbTwoPosition(this.changePositionAccordingToStep(thumbPosition));
        const correctThumTwoPosition: IThumbPosition = this.data.getThumbTwoPosition();
        const thumbValue: number = this.positionToValue(this.getElementPosByOrientation(this.data.getThumbTwoPosition()));

        this.thumbDrag(correctThumTwoPosition, 'thumbTwoDragged', thumbValue);
        // this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
        // this.observer.notify('tooltipTwoDraged', this.positionToValue(this.getElementPosByOrientation(this.thumbTwoPosition)));

    }

    private thumbDrag(thumbPosition: IThumbPosition, notyfyMessage: string, thumbValue:number): void {

        const newThumbPosition = Object.assign({}, thumbPosition);

        if (this.data.getOrientation() === 'horizontal') {
            newThumbPosition.top = 0;
        } else if (this.data.getOrientation() === 'vertical') {
            newThumbPosition.left = 0;
        }

        this.observer.notify(notyfyMessage, {'thumbPosition': newThumbPosition, 'tooltipValue': thumbValue});
    }

    private getElementSizeByOrientation(element: ISliderSize | IThumbSize | IScalePointSize): number {

        if (this.data.getOrientation() === 'vertical') {
            return element.height;
        }

        return element.width

    }

    private getElementPosByOrientation(element: IThumbPosition): number {

        if (this.data.getOrientation() === 'vertical') {
            return element.top;
        }

        return element.left

    }

    calculateStepsCount(): number {

        /** 
         * Считает количество шагов бегунка исходя из заданных значений и величины шага
         */

        return (this.data.getMax() - this.data.getMin()) / this.data.getStep();
    }

    calculateStepSize(): number {

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

    private calculateNewThumbPosition(value: number) {

        /**
         * Высчитывает новую позицию бегунка в соответствии с заданным шагом 
         */
        console.log(this.data.getThumbSize())
        return Math.round(value / this.calculateStepSize()) * this.calculateStepSize()
    }

    setThumbOneToStartingPosition() {

        /** Устанавливает первый бегунок на стартовую позицию */

        this.data.setThumbTwoPosition({ 'left': this.data.getSliderSize().width, 'top': this.data.getSliderSize().height })

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

    calculatePixelsPerValue(): number {

        /** 
         * Устанавливает количество пикселей в единице ширины слайдера, с вычетом крайних 
         * (тупиковых) зон
         */

        return(this.getElementSizeByOrientation(this.data.getSliderSize()) - this.getElementSizeByOrientation(this.data.getThumbSize())) / 100;
    }

}

export default ModelCalculator;