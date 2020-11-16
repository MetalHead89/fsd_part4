import { IInputControl } from './interfaces'
import { IRadioParams } from './interfaces'

export class Panel {
    sliderElem: JQuery<HTMLElement>;
    sliderPanel: HTMLElement = document.createElement('div');
    minValue: HTMLInputElement = document.createElement('input');
    maxValue: HTMLInputElement = document.createElement('input');
    step: HTMLInputElement = document.createElement('input');
    scaleChBox: HTMLInputElement = document.createElement('input');
    tooltipChBox: HTMLInputElement = document.createElement('input');
    singleRadioBtn: HTMLInputElement = document.createElement('input');
    rangeRadioButton: HTMLInputElement = document.createElement('input');
    horizontalRadioButton: HTMLInputElement = document.createElement('input');
    verticalRadioButton: HTMLInputElement = document.createElement('input');
    // sliderTypeRadioBtn: HTMLInputElement[] = [];
    // orientationRadioBtn: HTMLInputElement[] = [];

    constructor(slider: JQuery<HTMLElement>) {
        this.sliderElem = slider;

        this.init();
    }

    private init() {

        /**
         * Создаёт панель управления и вставляет её после слайдера, который она будет контролировать
         */

        this.minValue.addEventListener('input', () => { this.setMinValueSlider(this.sliderElem) });
        this.maxValue.addEventListener('input', () => { this.setMaxValueSlider(this.sliderElem) });
        this.step.addEventListener('input', () => { this.setStepValueSlider(this.sliderElem) });
        this.scaleChBox.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setScaleVisibility', this.scaleChBox.checked) });
        this.tooltipChBox.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setTooltipsVisibility', this.tooltipChBox.checked) });
        this.scaleChBox.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setScaleVisibility', this.scaleChBox.checked) });
        this.tooltipChBox.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setTooltipsVisibility', this.tooltipChBox.checked) });
        this.singleRadioBtn.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setSliderType', this.singleRadioBtn.value) });
        this.rangeRadioButton.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setSliderType', this.rangeRadioButton.value) });

        this.sliderPanel.className = 'slider-panel';
        this.sliderPanel.append(this.createInputText(this.minValue, 'min', 'min'));
        this.sliderPanel.append(this.createInputText(this.maxValue, 'max', 'max'));
        this.sliderPanel.append(this.createInputText(this.step, 'step', 'step'));
        this.sliderPanel.append(this.createInputCheckbox(this.scaleChBox, 'scale', 'scale'));
        this.sliderPanel.append(this.createInputCheckbox(this.tooltipChBox, 'tooltips', 'tooltips'));

        // const nameRadioBtnType = this.generateName('sliderType');
        // this.sliderPanel.append(this.createInputRadio(this.singleRadioBtn, 'single', 'sliderType', nameRadioBtnType, 'single'));

        const sliderTypeRadioParams = [
            { 'control': this.singleRadioBtn, 'id': 'single', 'label': 'single', 'value': 'single' },
            { 'control': this.rangeRadioButton, 'id': 'range', 'label': 'range', 'value': 'range' }
        ];
        this.sliderPanel.append(this.createRadioGroup(sliderTypeRadioParams, 'sliderType'));

        const sliderOrientationRadioParams = [
            { 'control': this.horizontalRadioButton, 'id': 'horizontal', 'label': 'horizontal', 'value': 'horizontal' },
            { 'control': this.verticalRadioButton, 'id': 'vertical', 'label': 'vertical', 'value': 'vertical' }
        ];
        this.sliderPanel.append(this.createRadioGroup(sliderOrientationRadioParams, 'sliderType'));

        this.scaleChBox.checked = Boolean(this.sliderElem.incredibleSliderPlugin('isScale'));
        this.tooltipChBox.checked = Boolean(this.sliderElem.incredibleSliderPlugin('isTooltips'));

        const sliderType: string = String(this.sliderElem.incredibleSliderPlugin('getSliderType'));
        if (sliderType == 'single') {
            this.singleRadioBtn.checked = true;
        } else if (sliderType == 'range') {
            this.rangeRadioButton.checked = true;
        }

        // const sliderOrientatiobRadioParams = [
        //     { 'id': 'horizontal', 'label': 'single' },
        //     { 'id': 'vertical', 'label': 'range' }
        // ];
        // this.sliderPanel.append(this.createRadioGroup(this.sliderTypeRadioBtn, sliderOrientatiobRadioParams, 'sliderOrientation'));

        const panelWrapper: HTMLElement = document.createElement('div');
        panelWrapper.className = 'panel-wrapper';
        panelWrapper.append(this.sliderPanel);

        this.sliderElem.after(panelWrapper);

    }

    private createInputText(control: HTMLInputElement, labelText: string, prefix: string): HTMLElement {

        /**
         * Создает группу с текстовым полем и лейблом
         * 
         * @param {HTMLInputElement} control - текстовое поле
         * @param {string} labelText - текст лейбла
         * @param {string} prefix - префикс, который вместе с случайно сгенерированным числом будет образовывать уникальный id
         * 
         * @returns {HTMLElement} - текстовое поле и лейбл обернутые в div
         */

        const controlParams: IInputControl = {
            'control': control,
            'id': this.generateID(prefix),
            'controlType': 'text',
            'controlClass': 'slider-panel__input',
            'labelText': labelText,
            'wrapperClass': 'slider-panel__input-text-wrapper'
        }

        return this.createInputControl(controlParams)

    }

    private createInputCheckbox(control: HTMLInputElement, labelText: string, prefix: string): HTMLElement {

        /**
         * Создает группу с чекбоксом и лейблом
         * 
         * @param {HTMLInputElement} control - чекбокс
         * @param {string} labelText - текст лейбла
         * @param {string} prefix - префикс, который вместе с случайно сгенерированным числом будет образовывать уникальный id
         * 
         * @returns {HTMLElement} - чекбокс и лейбл обернутые в div
         */

        const controlParams: IInputControl = {
            'control': control,
            'id': this.generateID(prefix),
            'controlType': 'checkbox',
            'controlClass': 'slider-panel__checkbox',
            'labelText': labelText,
            'wrapperClass': 'slider-panel__input-checkbox-wrapper'
        }

        return this.createInputControl(controlParams)

    }

    private wrapElements(wrapperClass: string, ...elements: HTMLElement[]): HTMLDivElement {

        /**
         * Оборачивает полученные элементы в div с заданным классом
         * 
         * @param {string} wrapperClass - класс, который будет назначен обёртке
         * @param {HTMLElement[]} - массив элементов, которые требуется обернуть
         * 
         * @returns {HTMLDivElement} - элементы в обёртке
         */

        const wrapper: HTMLDivElement = document.createElement('div');
        wrapper.className = wrapperClass;

        for (const element of elements) {
            wrapper.append(element);
        }

        return wrapper;
    }

    // private createInputRadio(control: HTMLInputElement, labelText: string, prefix: string,
    //     name: string, value: string): HTMLElement {

    //     /**
    //      * Создает группу с радиокнопкой и лейблом
    //      * 
    //      * @param {HTMLInputElement} control - радиокнопка
    //      * @param {string} labelText - текст лейбла
    //      * @param {string} prefix - префикс, который вместе с случайно сгенерированным числом будет образовывать уникальный id
    //      * 
    //      * @returns {HTMLElement} - радиокнопка и лейбл обернутые в div
    //      */

    //     const controlParams: IInputControl = {
    //         'control': control,
    //         'id': this.generateID(prefix),
    //         'name': name,
    //         'value': value,
    //         'controlType': 'checkbox',
    //         'controlClass': 'slider-panel__checkbox',
    //         'labelText': labelText,
    //         'wrapperClass': 'slider-panel__input-checkbox-wrapper'
    //     }

    //     return this.createInputControl(controlParams)

    // }

    private createRadioGroup(radioParams: IRadioParams[], namePprefix: string): HTMLElement {

        const name = this.generateName(namePprefix);

        const wrapper: HTMLElement = document.createElement('div');
        wrapper.className = 'slider-panel__radio-group';

        for (const params of radioParams) {

            const controlParams: IInputControl = {
                'control': params.control,
                'id': this.generateID(params.id),
                'name': name,
                'value': params.value,
                'controlType': 'radio',
                'controlClass': 'slider-panel__radio-button',
                'labelText': params.label,
                'wrapperClass': 'slider-panel__input-radio-wrapper'
            }

            const wrappedRadio: HTMLElement = this.createInputControl(controlParams);
            wrapper.append(wrappedRadio);
        }

        return wrapper;

    }

    private generateID(prefix: string): string {
        while (true) {
            const id = prefix + this.generateRandNumber()

            if (!document.getElementById(id)) {
                return id;
            }
        }
    }

    private generateName(prefix: string): string {
        while (true) {
            const name = prefix + this.generateRandNumber()

            if (document.getElementsByName(name).length == 0) {
                return name;
            }
        }
    }

    private generateRandNumber(): number {
        const min = 1;
        const max = 100000;

        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    private createInputControl(params: IInputControl): HTMLElement {

        params.control.type = params.controlType;
        params.control.className = params.controlClass;

        const controlLabel: HTMLLabelElement = document.createElement('label');
        controlLabel.textContent = params.labelText;

        if (params.id) {
            params.control.id = params.id;
            controlLabel.htmlFor = params.id;
        }

        if (params.name) {
            params.control.name = params.name;
        }

        if (params.value) {
            params.control.value = params.value;
        }

        return this.wrapElements(params.wrapperClass, params.control, controlLabel);

    }

    setMinValueSlider(slider: JQuery<HTMLElement>) {
        if (this.minValue) {
            const minValue = parseInt(this.minValue.value);

            if (!isNaN(minValue)) {
                slider.incredibleSliderPlugin('setMinValue', minValue);
            }
        }
    }

    setMaxValueSlider(slider: JQuery<HTMLElement>) {
        if (this.maxValue) {
            const maxValue = parseInt(this.maxValue.value);

            if (!isNaN(maxValue)) {
                slider.incredibleSliderPlugin('setMaxValue', maxValue);
            }
        }
    }

    setStepValueSlider(slider: JQuery<HTMLElement>) {
        if (this.step) {
            const step = parseInt(this.step.value);

            if (!isNaN(step)) {
                slider.incredibleSliderPlugin('setStepValue', step);
            }
        }
    }
}