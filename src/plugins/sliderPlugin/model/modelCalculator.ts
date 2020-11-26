import { IThumbPosition } from '../interfaces'
import { ISliderSize } from '../interfaces';
import { IThumbSize } from '../interfaces'
import { IScalePointSize } from '../interfaces'

import Observer from '../observer/observer';
import ModelData from './modelData';

class ModelCalculator {

    private observer: Observer;
    private data: ModelData;

    constructor(observer: Observer, data: ModelData) {
        this.observer = observer;
        this.data = data;
    }

    dragThumbOne(thumbPosition: IThumbPosition) {

        if (this.data.getSliderType() == 'range' &&
            this.getElementPosByOrientation(thumbPosition) >= this.getElementPosByOrientation(this.data.getThumbTwoPosition())) {
            thumbPosition = this.data.getThumbOnePosition();
        }

        this.data.setThumbOnePosition(this.thumbDrag(thumbPosition, 'thumbOneDragged'));

        // this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
        // this.observer.notify('tooltipOneDraged', this.positionToValue(this.getElementPosByOrientation(this.thumbOnePosition)));

    }

    dragThumbTwo(thumbPosition: IThumbPosition) {

        if (this.data.getSliderType() == 'range' &&
            this.getElementPosByOrientation(thumbPosition) <= this.getElementPosByOrientation(this.data.getThumbOnePosition())) {
            thumbPosition = this.data.getThumbTwoPosition();

            if (this.getElementPosByOrientation(thumbPosition) < this.getElementPosByOrientation(this.data.getThumbOnePosition())) {
                if (this.data.getOrientation() === 'horizontal') {
                    thumbPosition.left = this.data.getSliderSize().width;
                } else if (this.data.getOrientation() === 'vertical') {
                    thumbPosition.top = this.data.getSliderSize().height;
                }
            }
        }

        this.data.setThumbOnePosition(this.thumbDrag(thumbPosition, 'thumbTwoDragged'));
        // this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
        // this.observer.notify('tooltipTwoDraged', this.positionToValue(this.getElementPosByOrientation(this.thumbTwoPosition)));

    }

    private thumbDrag(thumbPosition: IThumbPosition, notyfyMessage: string): IThumbPosition {

        const newThumbPosition = Object.assign({}, thumbPosition);
        let newPos: number = this.getElementPosByOrientation(newThumbPosition);

        if (newPos < 0) {
            newPos = 0;
        }

        let endEdge: number = this.getElementSizeByOrientation(this.data.getSliderSize()) - this.getElementSizeByOrientation(this.data.getThumbSize());

        newPos = this.calculateNewThumbPosition(newPos);

        if (newPos >= endEdge) {
            newPos = endEdge;
        }

        if (this.data.getOrientation() === 'horizontal') {
            newThumbPosition.left = newPos;
            newThumbPosition.top = 0;
        } else if (this.data.getOrientation() === 'vertical') {
            newThumbPosition.top = newPos;
            newThumbPosition.left = 0;
        }

        this.observer.notify(notyfyMessage, newThumbPosition);

        return newThumbPosition;

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

    private calculateNewThumbPosition(value: number) {

        /**
         * Высчитывает новую позицию бегунка в соответствии с заданным шагом 
         */

        return Math.round(value / this.calculateStepSize()) * this.calculateStepSize()
    }

    setThumbOneToStartingPosition() {

        /** Устанавливает первый бегунок на стартовую позицию */

        if (this.data.getOrientation() === 'horizontal') {
            if (this.data.getSliderType() === 'single') {
                this.dragThumbOne({
                    'left': this.data.getSliderSize().width / 2,
                    'top': 0
                });
            } else if (this.data.getSliderType() === 'range') {
                this.dragThumbOne({
                    'left': this.data.getSliderSize().width * 0.3,
                    'top': 0
                });
            }
        } else if (this.data.getOrientation() === 'vertical') {
            if (this.data.getSliderType() === 'single') {
                this.dragThumbOne({
                    'left': 0,
                    'top': this.data.getSliderSize().height / 2
                });
            } else if (this.data.getSliderType() === 'range') {
                this.dragThumbOne({
                    'left': 0,
                    'top': this.data.getSliderSize().height * 0.3
                });
            }
        }
        
    }

    setThumbTwoToStartingPosition() {

        /** Устанавливает второй бегунок на стартовую позицию */

        if (this.data.getOrientation() === 'horizontal') {
            this.dragThumbTwo({
                'left': this.data.getSliderSize().width * 0.7,
                'top': 0
            });
        } else if (this.data.getOrientation() === 'vertical') {
            this.dragThumbTwo({
                'left': 0,
                'top': this.data.getSliderSize().height * 0.7
            });
        }

    }

}

export default ModelCalculator;