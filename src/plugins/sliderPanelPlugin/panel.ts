import { IInputControl } from './interfaces'
import { IRadioParams } from './interfaces'

export class Panel {
    sliderPanel: HTMLElement = document.createElement('div');
    minValue: HTMLInputElement | null = null;
    maxValue: HTMLInputElement | null = null;
    step: HTMLInputElement | null = null;
    scaleChBox: HTMLInputElement = document.createElement('input');
    tooltipChBox: HTMLInputElement = document.createElement('input');
    sliderTypeRadioBtn: HTMLInputElement[] = [];
    orientationRadioBtn: HTMLInputElement[] = [];

    constructor(slider: JQuery<HTMLElement>) {
        this.sliderPanel = document.createElement('div');
        this.sliderPanel.className = 'slider-panel';

        this.minValue = document.createElement('input');
        this.minValue.addEventListener('input', () => { this.setMinValueSlider(slider) });

        this.maxValue = document.createElement('input');
        this.maxValue.addEventListener('input', () => { this.setMaxValueSlider(slider) });

        this.step = document.createElement('input');
        this.step.addEventListener('input', () => { this.setStepValueSlider(slider) });

        this.scaleChBox = document.createElement('input');
        this.scaleChBox.checked = Boolean(slider.incredibleSliderPlugin('isScale'));
        this.scaleChBox.addEventListener('click', () => { slider.incredibleSliderPlugin('setScaleVisibility', this.scaleChBox.checked) });

        this.tooltipChBox = document.createElement('input');
        this.tooltipChBox.checked = Boolean(slider.incredibleSliderPlugin('isTooltips'));
        this.tooltipChBox.addEventListener('click', () => { slider.incredibleSliderPlugin('setTooltipsVisibility', this.tooltipChBox.checked) });

        const radioParams = [
            { 'id': 'single', 'name': 'sliderType', 'label': 'single' },
            { 'id': 'range', 'name': 'sliderType', 'label': 'range' }
        ];
        this.sliderPanel.append(this.createRadioGroup(this.sliderTypeRadioBtn, radioParams));

        this.sliderPanel.append(this.createInputControl({
            'control': this.minValue, 'id': 'minValue', 'controlType': 'text',
            'controlClass': 'slider-panel__input', 'labelText': 'min', 'wrapperClass': 'slider-panel__input-text-wrapper'
        }));
        this.sliderPanel.append(this.createInputControl({
            'control': this.maxValue, 'id': 'maxValue', 'controlType': 'text',
            'controlClass': 'slider-panel__input', 'labelText': 'max', 'wrapperClass': 'slider-panel__input-text-wrapper'
        }));
        this.sliderPanel.append(this.createInputControl({
            'control': this.step, 'id': 'step', 'controlType': 'text',
            'controlClass': 'slider-panel__input', 'labelText': 'step', 'wrapperClass': 'slider-panel__input-text-wrapper'
        }));
        this.sliderPanel.append(this.createInputControl({
            'control': this.scaleChBox, 'id': 'scale', 'controlType': 'checkbox',
            'controlClass': 'slider-panel__checkbox', 'labelText': 'scale', 'wrapperClass': 'slider-panel__input-checkbox-wrapper'
        }));
        this.sliderPanel.append(this.createInputControl({
            'control': this.tooltipChBox, 'id': 'tooltips', 'controlType': 'checkbox',
            'controlClass': 'slider-panel__checkbox', 'labelText': 'tooltips', 'wrapperClass': 'slider-panel__input-checkbox-wrapper'
        }));

        const panelWrapper: HTMLElement = document.createElement('div');
        panelWrapper.className = 'panel-wrapper';
        panelWrapper.append(this.sliderPanel);

        slider.after(panelWrapper);
    }

    private createRadioGroup(radio: HTMLInputElement[], radioParams: IRadioParams[]): HTMLElement {
        const wrapper: HTMLElement = document.createElement('div');
        wrapper.className = 'slider-panel__radio-group';

        for (const params of radioParams) {
            const radioGroup: HTMLInputElement = document.createElement('input');

            const wrappedRadio: HTMLElement = this.createInputControl({
                'control': radioGroup, 'id': params.id, 'name': params.name, 'controlType': 'radio',
                'controlClass': 'slider-panel__radio-group', 'labelText': params.label, 'wrapperClass': 'slider-panel__input-radio-wrapper'
            });

            radio.push(radioGroup);
            wrapper.append(wrappedRadio);
            console.log(radioGroup)
        }

        return wrapper;

        // wrapper.append(this.createInputControl({
        //     'control': radioGroup, 'id': 'tooltips', 'controlType': 'checkbox',
        //     'controlClass': 'slider-panel__checkbox', 'labelText': 'tooltips', 'wrapperClass': 'slider-panel__input-checkbox-wrapper'
        // }));
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