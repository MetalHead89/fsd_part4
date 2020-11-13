export class Panel {
    sliderPanel: HTMLElement | null = null;
    minValue: HTMLInputElement | null = null;
    maxValue: HTMLInputElement | null = null;
    step: HTMLInputElement | null = null;
    scaleChBox: HTMLInputElement = document.createElement('input');
    tooltipChBox: HTMLInputElement = document.createElement('input');

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
        this.scaleChBox.addEventListener('click', () => 
            { slider.incredibleSliderPlugin('setScaleVisibility', this.scaleChBox.checked) });
    
        this.tooltipChBox = document.createElement('input');
        this.tooltipChBox.addEventListener('click', () => 
            { slider.incredibleSliderPlugin('setTooltipsVisibility', this.tooltipChBox.checked) });

        this.sliderPanel.append(this.createInputControl(this.minValue, 'text', 'slider-panel__input', 'min',
            'slider-panel__input-text-wrapper'));
        this.sliderPanel.append(this.createInputControl(this.maxValue, 'text', 'slider-panel__input', 'max',
            'slider-panel__input-text-wrapper'));
        this.sliderPanel.append(this.createInputControl(this.step, 'text', 'slider-panel__input', 'step',
            'slider-panel__input-text-wrapper'));
        this.sliderPanel.append(this.createInputControl(this.scaleChBox, 'checkbox', 'slider-panel__checkbox', 'Scale',
            'slider-panel__input-checkbox-wrapper'));
        this.sliderPanel.append(this.createInputControl(this.tooltipChBox, 'checkbox', 'slider-panel__checkbox', 'Tooltips',
            'slider-panel__input-checkbox-wrapper'));

        const panelWrapper: HTMLElement = document.createElement('div');
        panelWrapper.className = 'panel-wrapper';
        panelWrapper.append(this.sliderPanel);

        slider.after(panelWrapper);
    }

    private createInputControl(control: HTMLInputElement, controlType: string, controlClass: string,
        labelText: string, wrapperClass: string): HTMLElement {

        control.type = controlType;
        control.className = controlClass;

        const controlLabel: HTMLElement = document.createElement('label');
        controlLabel.textContent = labelText;

        const wrapper: HTMLElement = document.createElement('div');
        wrapper.className = wrapperClass;

        wrapper.append(controlLabel)
        wrapper.append(control);

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