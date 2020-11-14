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
    sliderTypeRadioBtn: HTMLInputElement[] = [];
    orientationRadioBtn: HTMLInputElement[] = [];

    constructor(slider: JQuery<HTMLElement>) {
        this.sliderElem = slider;

        this.init();
    }

    private init() {

        this.minValue.addEventListener('input', () => { this.setMinValueSlider(this.sliderElem) });
        this.maxValue.addEventListener('input', () => { this.setMaxValueSlider(this.sliderElem) });
        this.step.addEventListener('input', () => { this.setStepValueSlider(this.sliderElem) });
        this.scaleChBox.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setScaleVisibility', this.scaleChBox.checked) });
        this.tooltipChBox.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setTooltipsVisibility', this.tooltipChBox.checked) });
        this.scaleChBox.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setScaleVisibility', this.scaleChBox.checked) });
        this.tooltipChBox.addEventListener('click', () => { this.sliderElem.incredibleSliderPlugin('setTooltipsVisibility', this.tooltipChBox.checked) });

        this.scaleChBox.checked = Boolean(this.sliderElem.incredibleSliderPlugin('isScale'));
        this.tooltipChBox.checked = Boolean(this.sliderElem.incredibleSliderPlugin('isTooltips'));

        this.sliderPanel.className = 'slider-panel';
        this.sliderPanel.append(this.createInputText(this.minValue, 'min', 'min'));
        this.sliderPanel.append(this.createInputText(this.maxValue, 'max', 'max'));
        this.sliderPanel.append(this.createInputText(this.step, 'step', 'step'));
        this.sliderPanel.append(this.createInputCheckbox(this.scaleChBox, 'scale', 'scale'));
        this.sliderPanel.append(this.createInputCheckbox(this.tooltipChBox, 'tooltips', 'tooltips'));

        const sliderTypeRadioParams = [
            { 'id': 'single', 'label': 'single' },
            { 'id': 'range', 'label': 'range' }
        ];
        this.sliderPanel.append(this.createRadioGroup(this.sliderTypeRadioBtn, sliderTypeRadioParams, 'sliderType'));

        const sliderOrientatiobRadioParams = [
            { 'id': 'horizontal', 'label': 'single' },
            { 'id': 'vertical', 'label': 'range' }
        ];
        this.sliderPanel.append(this.createRadioGroup(this.sliderTypeRadioBtn, sliderOrientatiobRadioParams, 'sliderOrientation'));

        const panelWrapper: HTMLElement = document.createElement('div');
        panelWrapper.className = 'panel-wrapper';
        panelWrapper.append(this.sliderPanel);

        this.sliderElem.after(panelWrapper);

    }

    private createInputText(control: HTMLInputElement, labelText: string, prefix: string): HTMLElement {

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

    private createRadioGroup(radio: HTMLInputElement[], radioParams: IRadioParams[], name: string): HTMLElement {
        
        name = this.generateName(name);
        
        const wrapper: HTMLElement = document.createElement('div');
        wrapper.className = 'slider-panel__radio-group';

        for (const params of radioParams) {
            const radioGroup: HTMLInputElement = document.createElement('input');

            const controlParams: IInputControl = {
                'control': radioGroup,
                'id': this.generateID(name),
                'name': name,
                'controlType': 'radio',
                'controlClass': 'slider-panel__radio-group',
                'labelText': params.label,
                'wrapperClass': 'slider-panel__input-radio-wrapper'
            }

            const wrappedRadio: HTMLElement = this.createInputControl(controlParams);

            radio.push(radioGroup);
            wrapper.append(wrappedRadio);
        }

        return wrapper;
        
    }

    private generateID(prefix: string): string {
        while(true) {
            const id = prefix + this.generateRandNumber()

            if(!document.getElementById(id)) {
                return id;
            }
        }
    }

    private generateName(prefix: string): string {
        while(true) {
            const name = prefix + this.generateRandNumber()

            if(document.getElementsByName(name).length == 0) {
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

        const wrapper: HTMLElement = document.createElement('div');
        wrapper.className = params.wrapperClass;

        wrapper.append(controlLabel)
        wrapper.append(params.control);

        return wrapper;

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