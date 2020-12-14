/**
 * @jest-environment jsdom
 */

import View from '../plugins/sliderPlugin/view/view';
import Thumb from '../plugins/sliderPlugin/view/thumb';
import Observer from '../plugins/sliderPlugin/observer/observer';
import { IScalePointSize, ISliderSize, IThumbSize } from '../plugins/sliderPlugin/interfaces';
import Tooltip from '../plugins/sliderPlugin/view/tooltip';
import ProgressBar from '../plugins/sliderPlugin/view/progressBar';
import Scale from '../plugins/sliderPlugin/view/scale';

let sliderWrapper: HTMLDivElement = document.createElement('div');
let observer: Observer = new Observer();
let _this: View = new View(observer, sliderWrapper);

beforeEach(() => {
    sliderWrapper = document.createElement('div');
    observer = new Observer();
    _this = new View(observer, sliderWrapper);
});


describe('Create slider', () => {
    test('An element with a slider class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.slider').length).toBe(0);

        observer.subscribe('sliderElementIsCreated', 
            (size: ISliderSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        )
        _this.createSlider('slider');

        expect(sliderWrapper.querySelectorAll('.slider').length).toBe(1);
    });

    test('An element with a slider_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.slider_horizontal').length).toBe(0);

        observer.subscribe('sliderElementIsCreated', 
            (size: ISliderSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        )
        _this.createSlider('slider_horizontal');

        expect(sliderWrapper.querySelectorAll('.slider_horizontal').length).toBe(1);
    });
});


describe('Create track', () => {
    test('An element with a track class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(0);
        _this.createTrack('track');
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(0);
    });

    test('An element with a track class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(0);
        _this.createSlider('slider');
        _this.createTrack('track');
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(1);
    });

    test('An element with a track_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.track_horizontal').length).toBe(0);
        _this.createSlider('slider');
        _this.createTrack('track_horizontal');
        expect(sliderWrapper.querySelectorAll('.track_horizontal').length).toBe(1);
    });
});


describe('Create first thumb', () => {
    test('An element with a thumb-one class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-one').length).toBe(0);

        observer.subscribe('thumbOneIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );    
        _this.createThumbOne('thumb-one');

        expect(sliderWrapper.querySelectorAll('.thumb-one').length).toBe(0);
    });

    test('An element with a thumb-one class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-one').length).toBe(0);

        observer.subscribe('thumbOneIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );
        _this.createSlider('slider');
        _this.createThumbOne('thumb-one');

        expect(sliderWrapper.querySelectorAll('.thumb-one').length).toBe(1);
    });

    test('An element with a thumb-one_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-one_horizontal').length).toBe(0);

        observer.subscribe('thumbOneIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );
        _this.createSlider('slider');
        _this.createThumbOne('thumb-one_horizontal');

        expect(sliderWrapper.querySelectorAll('.thumb-one_horizontal').length).toBe(1);
    });
});


describe('Create second thumb', () => {
    test('An element with a thumb-two class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-two').length).toBe(0);

        observer.subscribe('thumbTwoIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );    
        _this.createThumbTwo('thumb-two');

        expect(sliderWrapper.querySelectorAll('.thumb-two').length).toBe(0);
    });

    test('An element with a thumb-two class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-two').length).toBe(0);

        observer.subscribe('thumbTwoIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );
        _this.createSlider('slider');
        _this.createThumbTwo('thumb-two');

        expect(sliderWrapper.querySelectorAll('.thumb-two').length).toBe(1);
    });

    test('An element with a thumb-two_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-two_horizontal').length).toBe(0);

        observer.subscribe('thumbTwoIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );
        _this.createSlider('slider');
        _this.createThumbTwo('thumb-two_horizontal');

        expect(sliderWrapper.querySelectorAll('.thumb-two_horizontal').length).toBe(1);
    });
});


describe('Create first tooltip', () => {
    test('An element with a tooltip-one class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-one').length).toBe(0);
        _this.createTooltipOne('tooltip-one');
        expect(sliderWrapper.querySelectorAll('.tooltip-one').length).toBe(0);
    });

    test('An element with a tooltip-one class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-one').length).toBe(0);
        _this.createSlider('.slider');
        _this.createThumbOne('.thumb-one');
        _this.createTooltipOne('tooltip-one');
        expect(sliderWrapper.querySelectorAll('.tooltip-one').length).toBe(1);
    });

    test('An element with a tooltip-one_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-one_horizontal').length).toBe(0);
        _this.createSlider('.slider');
        _this.createThumbOne('.thumb-one');
        _this.createTooltipOne('tooltip-one_horizontal');
        expect(sliderWrapper.querySelectorAll('.tooltip-one_horizontal').length).toBe(1);
    });
});


describe('Create second tooltip', () => {
    test('An element with a tooltip-two class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-two').length).toBe(0);
        _this.createTooltipTwo('tooltip-two');
        expect(sliderWrapper.querySelectorAll('.tooltip-two').length).toBe(0);
    });

    test('An element with a tooltip-two class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-two').length).toBe(0);
        _this.createSlider('slider');
        _this.createThumbTwo('.thumb-two');
        _this.createTooltipTwo('tooltip-two');
        expect(sliderWrapper.querySelectorAll('.tooltip-two').length).toBe(1);
    });

    test('An element with a tooltip-two_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-two_horizontal').length).toBe(0);
        _this.createSlider('slider');
        _this.createThumbTwo('.thumb-two');
        _this.createTooltipTwo('tooltip-two_horizontal');
        expect(sliderWrapper.querySelectorAll('.tooltip-two_horizontal').length).toBe(1);
    });
});


describe('Create progress bar', () => {
    test('An element with a progress-bar class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.progress-bar').length).toBe(0);
        _this.createProgressBar('progress-bar');
        expect(sliderWrapper.querySelectorAll('.progress-bar').length).toBe(0);
    });

    test('An element with a progress-bar class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.progress-bar').length).toBe(0);
        _this.createSlider('slider');
        _this.createProgressBar('progress-bar');
        expect(sliderWrapper.querySelectorAll('.progress-bar').length).toBe(1);
    });

    test('An element with a progress-bar_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.progress-bar_horizontal').length).toBe(0);
        _this.createSlider('slider');
        _this.createProgressBar('progress-bar_horizontal');
        expect(sliderWrapper.querySelectorAll('.progress-bar_horizontal').length).toBe(1);
    });
});


describe('Create scale', () => {
    test('An element with a scale class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.scale').length).toBe(0);

        let notificationReceived = false;
        observer.subscribe('scaleIsCreated', 
            () => { notificationReceived = true; }
        );    
        _this.createScale('scale');

        expect(notificationReceived).toBe(false);
        expect(sliderWrapper.querySelectorAll('.scale').length).toBe(0);
    });

    test('An element with a scale class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.scale').length).toBe(0);

        let notificationReceived = false;
        observer.subscribe('scaleIsCreated', 
            () => { notificationReceived = true; }
        );
        _this.createSlider('slider');
        _this.createScale('scale');

        expect(notificationReceived).toBe(true);
        expect(sliderWrapper.querySelectorAll('.scale').length).toBe(1);
    });

    test('An element with a scale_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.scale_horizontal').length).toBe(0);

        let notificationReceived = false;
        observer.subscribe('scaleIsCreated', 
            () => { notificationReceived = true; }
        );
        _this.createSlider('slider');
        _this.createScale('scale_horizontal');

        expect(notificationReceived).toBe(true);
        expect(sliderWrapper.querySelectorAll('.scale_horizontal').length).toBe(1);
    });
});


describe('Move thumb one', () => {
    test('thumbOne should be null', () => {
        _this.createThumbOne('thumb-one');
        _this.moveThumbOne({'left': 45, 'top': 78});

        const thumb: Thumb | null = _this['thumbOne'];
        expect(thumb).toBe(null);
    });

    test('Position thumbOne should be left: 45 and top 45', () => {
        _this.createSlider('slider');
        _this.createThumbOne('thumb-one');
        _this.moveThumbOne({'left': 45, 'top': 78});

        const thumb: Thumb | null = _this['thumbOne'];
        expect(thumb).not.toBe(null);
        expect(thumb?.getElement().style.left).toBe('45px');
        expect(thumb?.getElement().style.top).toBe('78px');
    });

    test('Position thumbOne should be left: 100 and top 0', () => {
        _this.createSlider('slider');
        _this.createThumbOne('thumb-one_vertical');
        _this.moveThumbOne({'left': 100, 'top': 0});

        const thumb: Thumb | null = _this['thumbOne'];
        expect(thumb).not.toBe(null);
        expect(thumb?.getElement().style.left).toBe('100px');
        expect(thumb?.getElement().style.top).toBe('0px');
    });
});


describe('Tooltip one set value', () => {
    test('Tooltip should be null', () => {
        _this.createTooltipOne('tooltip-one');
        _this.tooltipOneSetValue(84);

        const tooltip: Tooltip | null = _this['tooltipOne'];
        expect(tooltip).toBe(null);
    });

    test('Should be 84', () => {
        _this.createSlider('slider');
        _this.createThumbOne('thumb-one');
        _this.createTooltipOne('tooltip-one');
        _this.tooltipOneSetValue(84);

        const tooltip: Tooltip | null = _this['tooltipOne'];
        let tooltipValue = '';

        expect(tooltip).not.toBe(null);
        if (tooltip != null) {
            tooltipValue = tooltip['element'].innerText
        }
        expect(tooltipValue).toBe('84');
    });

    test('Should be 999', () => {
        _this.createSlider('slider');
        _this.createThumbOne('thumb-one');
        _this.createTooltipOne('tooltip-one_vertical');
        _this.tooltipOneSetValue(999);

        const tooltip: Tooltip | null = _this['tooltipOne'];
        let tooltipValue = '';

        expect(tooltip).not.toBe(null);
        if (tooltip != null) {
            tooltipValue = tooltip['element'].innerText
        }
        expect(tooltipValue).toBe('999');
    });
});


describe('Move thumb two', () => {
    test('thumbTwo should be null', () => {
        _this.createThumbTwo('thumb-two');
        _this.moveThumbTwo({'left': 45, 'top': 78});

        const thumb: Thumb | null = _this['thumbTwo'];
        expect(thumb).toBe(null);
    });

    test('Position thumbTwo should be left: 45 and top 45', () => {
        _this.createSlider('slider');
        _this.createThumbTwo('thumb-two');
        _this.moveThumbTwo({'left': 45, 'top': 78});

        const thumb: Thumb | null = _this['thumbTwo'];
        expect(thumb).not.toBe(null);
        expect(thumb?.getElement().style.left).toBe('45px');
        expect(thumb?.getElement().style.top).toBe('78px');
    });

    test('Position thumbTwo should be left: 100 and top 0', () => {
        _this.createSlider('slider');
        _this.createThumbTwo('thumb-two_vertical');
        _this.moveThumbTwo({'left': 100, 'top': 0});

        const thumb: Thumb | null = _this['thumbTwo'];
        expect(thumb).not.toBe(null);
        expect(thumb?.getElement().style.left).toBe('100px');
        expect(thumb?.getElement().style.top).toBe('0px');
    });
});


describe('Tooltip two set value', () => {
    test('Tooltip should be null', () => {
        _this.createTooltipTwo('tooltip-two');
        _this.tooltipTwoSetValue(84);

        const tooltip: Tooltip | null = _this['tooltipTwo'];
        expect(tooltip).toBe(null);
    });

    test('Should be 84', () => {
        _this.createSlider('slider');
        _this.createThumbTwo('thumb-one');
        _this.createTooltipTwo('tooltip-two');
        _this.tooltipTwoSetValue(84);

        const tooltip: Tooltip | null = _this['tooltipTwo'];
        let tooltipValue = '';

        expect(tooltip).not.toBe(null);
        if (tooltip != null) {
            tooltipValue = tooltip['element'].innerText
        }
        expect(tooltipValue).toBe('84');
    });

    test('Should be 999', () => {
        _this.createSlider('slider');
        _this.createThumbTwo('thumb-one');
        _this.createTooltipTwo('tooltip-one_vertical');
        _this.tooltipTwoSetValue(999);

        const tooltip: Tooltip | null = _this['tooltipTwo'];
        let tooltipValue = '';

        expect(tooltip).not.toBe(null);
        if (tooltip != null) {
            tooltipValue = tooltip['element'].innerText
        }
        expect(tooltipValue).toBe('999');
    });
});


describe('Set progress bar position', () => {
    test('Position should not change', () => {
        _this.createProgressBar('progress-bar_horizontal');
        _this.setProgressBarPosition({
            'orientation': 'horizontal',
            'start': 25,
            'end': 50
        });

        const progressBar: ProgressBar | null = _this['progressBar'];
        let left: string = '';
        let top: string = '';
        let width: string = '';
        let height: string = '';

        if(progressBar !== null) {
            const progressBarElem: HTMLDivElement = progressBar.getElement();
            left = progressBarElem.style.left;
            top = progressBarElem.style.top;
            width = progressBarElem.style.width;
            height = progressBarElem.style.height;
        }

        expect(left).toBe('');
        expect(top).toBe('');
        expect(width).toBe('');
        expect(height).toBe('');
    });

    test('Should be left: 25px and width: 50px', () => {
        _this.createSlider('slider');
        _this.createProgressBar('progress-bar_horizontal');
        _this.setProgressBarPosition({
            'orientation': 'horizontal',
            'start': 25,
            'end': 50
        });

        const progressBar: ProgressBar | null = _this['progressBar'];
        let left: string = '';
        let top: string = '';
        let width: string = '';
        let height: string = '';

        if(progressBar !== null) {
            const progressBarElem: HTMLDivElement = progressBar.getElement();
            left = progressBarElem.style.left;
            top = progressBarElem.style.top;
            width = progressBarElem.style.width;
            height = progressBarElem.style.height;
        }

        expect(left).toBe('25px');
        expect(top).toBe('');
        expect(width).toBe('50px');
        expect(height).toBe('');
    });

    test('Should be top: 25px and height: 50px', () => {
        _this.createSlider('slider');
        _this.createProgressBar('progress-bar_vertical');
        _this.setProgressBarPosition({
            'orientation': 'vertical',
            'start': 25,
            'end': 50
        });

        const progressBar: ProgressBar | null = _this['progressBar'];
        let left: string = '';
        let top: string = '';
        let width: string = '';
        let height: string = '';

        if(progressBar !== null) {
            const progressBarElem: HTMLDivElement = progressBar.getElement();
            left = progressBarElem.style.left;
            top = progressBarElem.style.top;
            width = progressBarElem.style.width;
            height = progressBarElem.style.height;
        }

        expect(left).toBe('');
        expect(top).toBe('25px');
        expect(width).toBe('');
        expect(height).toBe('50px');
    });
});


// Через jsdom нельзя проверить свойства offsetWidth и offsetHeight, поэтому результат равен 0
// Тест создан исключительно для 100% покрытия класса.
describe('Get scale point max size', () => {
    test('Should be width: 0 and height: 0', () => {
        _this.createScale('scale');
        const size: IScalePointSize = _this.getScalePointMaxSize(150);
        expect(size.width).toBe(0);
        expect(size.height).toBe(0);
    });

    test('Should be width: 0 and height: 0', () => {
        _this.createSlider('slider');
        _this.createScale('scale');
        const size: IScalePointSize = _this.getScalePointMaxSize(150);
        expect(size.width).toBe(0);
        expect(size.height).toBe(0);
    });

    test('Should be width: 0 and height: 0', () => {
        _this.createSlider('slider');
        _this.createScale('scale_vertical');
        const size: IScalePointSize = _this.getScalePointMaxSize(150);
        expect(size.width).toBe(0);
        expect(size.height).toBe(0);
    });
});


describe('Add scale point', () => {
    test('Scale point should not be added', () => {
        _this.createScale('scale');
        _this.addScalePoint({'position': 50, 'scalePointSize': 20, 'scalePointValue': 5});
        const scale: Scale | null = _this['scale'];

        let scalePointsCount: number = 0;
        let position: string = '';
        let width: string = '';
        let value: string = '';

        if(scale !== null) {
            scalePointsCount = scale['element'].querySelectorAll('.slider__scale-point').length
            const scalePoint: HTMLElement | null = scale['element'].querySelector('.slider__scale-point');
            if(scalePoint !== null) {
                position = scalePoint.style.left;
                width = scalePoint.style.width;

                const label: HTMLLabelElement | null = scalePoint.querySelector('.slider__scale-point-label');
                if(label !== null) {
                    value = label.innerText;
                }
            }            
        }

        expect(scalePointsCount).toBe(0);
        expect(position).toBe('');
        expect(width).toBe('');
        expect(value).toBe('');
    });
    
    test('Should be position: 50px, width: 20px and value: 5', () => {
        _this.createSlider('slider');
        _this.createScale('scale');
        _this.addScalePoint({'position': 50, 'scalePointSize': 20, 'scalePointValue': 5});
        const scale: Scale | null = _this['scale'];

        let scalePointsCount: number = 0;
        let position: string = '';
        let width: string = '';
        let value: string = '';

        if(scale !== null) {
            scalePointsCount = scale['element'].querySelectorAll('.slider__scale-point').length
            const scalePoint: HTMLElement | null = scale['element'].querySelector('.slider__scale-point');
            if(scalePoint !== null) {
                position = scalePoint.style.left;
                width = scalePoint.style.width;

                const label: HTMLLabelElement | null = scalePoint.querySelector('.slider__scale-point-label');
                if(label !== null) {
                    value = label.innerText;
                }
            }            
        }

        expect(scalePointsCount).toBe(1);
        expect(position).toBe('50px');
        expect(width).toBe('20px');
        expect(value).toBe('5');
    });

    test('Should be position: 150px, width: 69px and value: 41', () => {
        _this.createSlider('slider');
        _this.createScale('slider__scale_vertical');
        _this.addScalePoint({'position': 150, 'scalePointSize': 69, 'scalePointValue': 41});
        const scale: Scale | null = _this['scale'];

        let scalePointsCount: number = 0;
        let position: string = '';
        let width: string = '';
        let value: string = '';

        if(scale !== null) {
            scalePointsCount = scale['element'].querySelectorAll('.slider__scale-point').length
            const scalePoint: HTMLElement | null = scale['element'].querySelector('.slider__scale-point');
            if(scalePoint !== null) {
                position = scalePoint.style.top;
                width = scalePoint.style.width;

                const label: HTMLLabelElement | null = scalePoint.querySelector('.slider__scale-point-label');
                if(label !== null) {
                    value = label.innerText;
                }
            }            
        }

        expect(scalePointsCount).toBe(1);
        expect(position).toBe('150px');
        expect(width).toBe('69px');
        expect(value).toBe('41');
    });
});