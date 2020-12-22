import InputCheckbox from "./panelElements/inputCheckbox";
import InputRadio from "./panelElements/inputRadio";
import InputText from "./panelElements/inputText";

class Panel {
    private sliderElem: JQuery<HTMLElement>;
    private sliderPanel: HTMLElement = document.createElement('div');
    private minValue: HTMLInputElement = document.createElement('input');
    private maxValue: HTMLInputElement = document.createElement('input');
    private step: HTMLInputElement = document.createElement('input');
    private scaleChBox: HTMLInputElement = document.createElement('input');
    private tooltipChBox: HTMLInputElement = document.createElement('input');
    private singleRadioButton: HTMLInputElement = document.createElement('input');
    private rangeRadioButton: HTMLInputElement = document.createElement('input');
    private horizontalRadioButton: HTMLInputElement = document.createElement('input');
    private verticalRadioButton: HTMLInputElement = document.createElement('input');

    constructor(slider: JQuery<HTMLElement>) {
        this.sliderElem = slider;

        this.createPanel();
        this.addEventListenersToPanel();
    }

    private createPanel() {
        const inputTextsGroup: HTMLDivElement = this.createInputTextGroup();
        const inputRadioButtonsGroup: HTMLDivElement = this.createRadioTextGroup();
        const inputCheckboxesGroup: HTMLDivElement = this.createCheckboxTextGroup();    

        const checkboxesAndRadioWrapper: HTMLDivElement = this.wrapElements(
            'slider-panel__checkboxes-and-radio-wrapper',
            inputRadioButtonsGroup,
            inputCheckboxesGroup
        );

        this.sliderPanel.className = 'slider-panel';
        this.sliderPanel.append(inputTextsGroup);
        this.sliderPanel.append(checkboxesAndRadioWrapper);

        const sliderType = String(this.sliderElem.incredibleSliderPlugin('getSliderType'));
        if (sliderType == 'single') {
            this.singleRadioButton.checked = true;
        } else if (sliderType == 'range') {
            this.rangeRadioButton.checked = true;
        }

        const sliderOrientation = String(this.sliderElem.incredibleSliderPlugin('getSliderOrientation'));
        if (sliderOrientation == 'horizontal') {
            this.setSliderWrapperHorizontalOrientation();
            this.horizontalRadioButton.checked = true;
        } else if (sliderOrientation == 'vertical') {
            this.setSliderWrapperVerticalOrientation();
            this.verticalRadioButton.checked = true;
        }

        const panelWrapper: HTMLElement = document.createElement('div');
        panelWrapper.className = 'panel-wrapper';
        panelWrapper.append(this.sliderPanel);

        this.sliderElem.append(panelWrapper);
    }

    private addEventListenersToPanel() {
        this.minValue.addEventListener('keyup', this.minKeyupEvent.bind(this));
        this.maxValue.addEventListener('keyup', this.maxKeyupEvent.bind(this));
        this.step.addEventListener('keyup', this.stepKeyupEvent.bind(this));
        this.scaleChBox.addEventListener('click', this.scaleChBoxClickEvent.bind(this));
        this.tooltipChBox.addEventListener('click', this.tooltipChBoxClickEvent.bind(this));
        this.singleRadioButton.addEventListener('click', this.singleRadioButtonClickEvent.bind(this));
        this.rangeRadioButton.addEventListener('click', this.rangeRadioButtonClickEvent.bind(this));
        this.horizontalRadioButton.addEventListener('click', this.horizontalRadioButtonClickEvent.bind(this));
        this.verticalRadioButton.addEventListener('click', this.verticalRadioButtonClickEvent.bind(this));
    }

    private minKeyupEvent(): void {
        const minValue = this.minValue.value.replace(/[^\d]/g,'');
        this.setMinValueSlider(minValue);
    }


    private maxKeyupEvent(): void {
        const maxValue = this.maxValue.value.replace(/[^\d]/g,'');
        this.setMaxValueSlider(maxValue);
    }


    private stepKeyupEvent(): void {
        const step = this.step.value.replace(/[^\d]/g,'');
        this.setStepValueSlider(step);
    }


    private scaleChBoxClickEvent(): void {
        this.sliderElem.incredibleSliderPlugin('changeScaleVisibility', this.scaleChBox.checked);
    }


    private tooltipChBoxClickEvent(): void {
        this.sliderElem.incredibleSliderPlugin('changeTooltipsVisibility', this.tooltipChBox.checked);
    }


    private singleRadioButtonClickEvent(): void {
        this.sliderElem.incredibleSliderPlugin('changeSliderType', this.singleRadioButton.value);
    }


    private rangeRadioButtonClickEvent(): void {
        this.sliderElem.incredibleSliderPlugin('changeSliderType', this.rangeRadioButton.value);
    }


    private horizontalRadioButtonClickEvent(): void {
        this.setSliderWrapperHorizontalOrientation();
        this.sliderElem.incredibleSliderPlugin('changeSliderOrientation', this.horizontalRadioButton.value);
    }


    private verticalRadioButtonClickEvent(): void {
        this.setSliderWrapperVerticalOrientation();
        this.sliderElem.incredibleSliderPlugin('changeSliderOrientation', this.verticalRadioButton.value)
    }


    private createInputTextGroup(): HTMLDivElement {
        this.minValue.value = String(this.sliderElem.incredibleSliderPlugin('getMin'));
        this.maxValue.value = String(this.sliderElem.incredibleSliderPlugin('getMax'));
        this.step.value = String(this.sliderElem.incredibleSliderPlugin('getStep'));

        const inputTextsGroup: HTMLDivElement = this.wrapElements(
            'slider-panel__input-text-group',
            new InputText(this.minValue, 'min', 'min').getControl(),
            new InputText(this.maxValue, 'max', 'max').getControl(),
            new InputText(this.step, 'step', 'step').getControl()
        );

        return inputTextsGroup;
    }

    private createRadioTextGroup(): HTMLDivElement {
        const sliderTypeRadioParams = [
            { 'input': this.singleRadioButton, 'id': 'single', 'label': 'single', 'value': 'single' },
            { 'input': this.rangeRadioButton, 'id': 'range', 'label': 'range', 'value': 'range' }
        ];
        const typeRadioGroupLabel = document.createElement('label');
        typeRadioGroupLabel.innerText = 'type';
        typeRadioGroupLabel.classList.add('slider-panel__radio-group-label');
        const sliderTypeRadioControl = new InputRadio(sliderTypeRadioParams, 'sliderType')

        const sliderOrientationRadioParams = [
            { 'input': this.horizontalRadioButton, 'id': 'horizontal', 'label': 'horizontal', 'value': 'horizontal' },
            { 'input': this.verticalRadioButton, 'id': 'vertical', 'label': 'vertical', 'value': 'vertical' }
        ];
        const orientationRadioGroupLabel = document.createElement('label');
        orientationRadioGroupLabel.innerText = 'orientation';
        orientationRadioGroupLabel.classList.add('slider-panel__radio-group-label');
        const sliderOrientationRadioControl = new InputRadio(sliderOrientationRadioParams, 'sliderOrientation')

        const inputRadioButtonsGroup: HTMLDivElement = this.wrapElements(
            'slider-panel__input-radio-buttons-group',
            typeRadioGroupLabel,
            sliderTypeRadioControl.getControl(),
            orientationRadioGroupLabel,
            sliderOrientationRadioControl.getControl()
        );

        return inputRadioButtonsGroup;
    }

    private createCheckboxTextGroup(): HTMLDivElement {
        const checkboxesGroupLabel = document.createElement('label');
        checkboxesGroupLabel.innerText = 'on/off elements';
        checkboxesGroupLabel.classList.add('slider-panel__checkboxes-group-label');

        const scaleChBox = new InputCheckbox(this.scaleChBox, 'scale', 'scale');
        this.scaleChBox.checked = Boolean(this.sliderElem.incredibleSliderPlugin('getScaleVisiblity'));

        const tooltipChBox = new InputCheckbox(this.tooltipChBox, 'tooltips', 'tooltips');
        this.tooltipChBox.checked = Boolean(this.sliderElem.incredibleSliderPlugin('getTooltipsVisiblity'));

        const inputCheckboxesGroup: HTMLDivElement = this.wrapElements(
            'slider-panel__input-checkboxes-group',
            checkboxesGroupLabel,
            scaleChBox.getControl(),
            tooltipChBox.getControl()
        );

        return inputCheckboxesGroup;
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

    private setSliderWrapperHorizontalOrientation() {
        this.sliderElem.removeClass('slider-wrapper_vertical');
        this.sliderElem.addClass('slider-wrapper_horizontal');
        this.setPanelHorizontalOrientation();
    }

    private setSliderWrapperVerticalOrientation() {
        this.sliderElem.removeClass('slider-wrapper_horizontal');
        this.sliderElem.addClass('slider-wrapper_vertical');
        this.setPanelVerticalOrientation();
    }

    private setPanelHorizontalOrientation() {
        this.sliderPanel.classList.remove('slider-panel_vertical');
        this.sliderPanel.classList.add('slider-panel_horizontal');
    }

    private setPanelVerticalOrientation() {
        this.sliderPanel.classList.remove('slider-panel_horizontal');
        this.sliderPanel.classList.add('slider-panel_vertical');
    }

    private setMinValueSlider(newValue: string) {
        if (this.minValue) {
            let minValue = parseInt(newValue);

            if (isNaN(minValue)) {
                minValue = 0;
            }

            if (minValue >= parseInt(this.maxValue.value)) {
                minValue = Number(this.sliderElem.incredibleSliderPlugin('getMax')) - 1;
            }

            this.sliderElem.incredibleSliderPlugin('setMin', minValue);
            this.minValue.value = minValue.toString();
        }
    }

    private setMaxValueSlider(newValue: string) {
        if (this.maxValue) {
            let maxValue = parseInt(newValue);

            if (isNaN(maxValue)) {
                maxValue = Number(this.sliderElem.incredibleSliderPlugin('getMax'));
            }

            if (maxValue <= parseInt(this.minValue.value)) {
                maxValue = Number(this.sliderElem.incredibleSliderPlugin('getMin')) + 1;
            }

            this.sliderElem.incredibleSliderPlugin('setMax', maxValue);
            this.maxValue.value = maxValue.toString();
        }
    }

    private setStepValueSlider(newValue: string) {
        if (this.step) {
            const step = parseInt(newValue);
            if (!isNaN(step)) {
                this.sliderElem.incredibleSliderPlugin('setStep', step);
                this.step.value = step.toString();
            } else {
                this.step.value = '1';
            }
        }
    }
}

export default Panel;