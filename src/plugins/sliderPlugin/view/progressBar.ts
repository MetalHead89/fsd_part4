import { IProgressBarPosition } from '../interfaces';


/**
 * Класс для управления элементом прогресс бара
 */
class ProgressBar {
    private element: HTMLDivElement;


    constructor(element: HTMLDivElement) {
        this.element = element;
    }


    /**
     * Возвращает HTML элемент прогресс бара
     * 
     * @returns {HTMLDivElement} - HTML элемент прогресс бара
     */
    getElement(): HTMLDivElement {
        return this.element;
    }


    /**
     * Устанавливает позицию прогресс бара
     * 
     * @param {IProgressBarPosition} progressPosition - объект с позицией прогресс бара. Содержит сведения об ориентации,
     * точке начала и ширине (или высоте, в зависимости от ориентации слайдера) прогресс бара
     */
    setPosition(progressPosition: IProgressBarPosition): void {
        if (progressPosition.orientation === 'horizontal') {
            this.setHorizontalOrientation();
            this.element.style.left = progressPosition.start + 'px';
            this.element.style.width = progressPosition.end + 'px';
        } else if (progressPosition.orientation === 'vertical') {
            this.setVerticalOrientation();
            this.element.style.top = progressPosition.start + 'px';
            this.element.style.height = progressPosition.end + 'px';
        }        
    }


    /**
     * Делает прогресс бар гризонтальным
     */
    setHorizontalOrientation(): void {
        this.element.removeAttribute('style');
        this.element.classList.remove('slider__progress-bar_vertical')
        this.element.classList.add('slider__progress-bar_horizontal')
    }
    

    /**
     * Делает прогресс бар вертикальным
     */
    setVerticalOrientation(): void {
        this.element.removeAttribute('style');
        this.element.classList.remove('slider__progress-bar_horizontal')
        this.element.classList.add('slider__progress-bar_vertical')
    }
}

export default ProgressBar






// import { IProgressBarPosition } from './interfaces';

// class ProgressBar {

//     private element: HTMLElement;

//     constructor(element: HTMLElement) {
//         this.element = element
//     }

//     setHorizontalOrientation() {
//         this.element.removeAttribute('style');
//         this.element.classList.remove('slider__progress-bar_vertical')
//         this.element.classList.add('slider__progress-bar_horizontal')
//     }

//     setVerticalOrientation() {
//         this.element.removeAttribute('style');
//         this.element.classList.remove('slider__progress-bar_horizontal')
//         this.element.classList.add('slider__progress-bar_vertical')
//     }

//     setPosition(progressPosition: IProgressBarPosition) {
//         if (progressPosition.orientation === 'horizontal') {
//             this.setHorizontalOrientation();
//             this.element.style.left = progressPosition.start + 'px';
//             this.element.style.width = progressPosition.end + 'px';
//         } else if (progressPosition.orientation === 'vertical') {
//             this.setVerticalOrientation();
//             this.element.style.top = progressPosition.start + 'px';
//             this.element.style.height = progressPosition.end + 'px';
//         }
        
//     }

// }

// export default ProgressBar