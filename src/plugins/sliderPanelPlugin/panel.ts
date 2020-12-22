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
        this.minValue.addEventListener('input', this.minInputEvent.bind(this));
        this.maxValue.addEventListener('input', this.maxInputEvent.bind(this));
        this.step.addEventListener('input', this.stepInputEvent.bind(this));
        this.scaleChBox.addEventListener('click', this.scaleChBoxClickEvent.bind(this));
        this.tooltipChBox.addEventListener('click', this.tooltipChBoxClickEvent.bind(this));
        this.singleRadioButton.addEventListener('click', this.singleRadioButtonClickEvent.bind(this));
        this.rangeRadioButton.addEventListener('click', this.rangeRadioButtonClickEvent.bind(this));
        this.horizontalRadioButton.addEventListener('click', this.horizontalRadioButtonClickEvent.bind(this));
        this.verticalRadioButton.addEventListener('click', this.verticalRadioButtonClickEvent.bind(this));
    }


    private minInputEvent(): void {
        this.setMinValueSlider(this.sliderElem);
    }


    private maxInputEvent(): void {
        this.setMaxValueSlider(this.sliderElem);
    }


    private stepInputEvent(): void {
        this.setStepValueSlider(this.sliderElem);
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

    private setMinValueSlider(slider: JQuery<HTMLElement>) {
        if (this.minValue) {
            const minValue = parseInt(this.minValue.value);

            if (!isNaN(minValue)) {
                slider.incredibleSliderPlugin('setMin', minValue);
            }
        }
    }

    private setMaxValueSlider(slider: JQuery<HTMLElement>) {
        if (this.maxValue) {
            const maxValue = parseInt(this.maxValue.value);

            if (!isNaN(maxValue)) {
                slider.incredibleSliderPlugin('setMax', maxValue);
            }
        }
    }

    private setStepValueSlider(slider: JQuery<HTMLElement>) {
        if (this.step) {
            const step = parseInt(this.step.value);

            if (!isNaN(step)) {
                slider.incredibleSliderPlugin('setStep', step);
            }
        }
    }
}

export default Panel;