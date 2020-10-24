export class Panel {
    sliderPanel: HTMLElement | null = null;
    minValue: HTMLInputElement | null = null;
    maxValue: HTMLInputElement | null = null;
    step: HTMLInputElement | null = null;

    constructor(slider: JQuery<HTMLElement>) {
        this.sliderPanel = document.createElement('div');
        this.sliderPanel.className = 'slider-panel';

        this.minValue = document.createElement('input');
        this.minValue.addEventListener('input', () => {this.setMinValueSlider(slider)});

        this.maxValue = document.createElement('input');
        this.maxValue.addEventListener('input', () => {this.setMaxValueSlider(slider)});

        this.step = document.createElement('input');

        this.sliderPanel.append(this.createInputControl(this.minValue, 'slider-panel__input', 'min'));
        this.sliderPanel.append(this.createInputControl(this.maxValue, 'slider-panel__input', 'max'));
        this.sliderPanel.append(this.createInputControl(this.step, 'slider-panel__input', 'step'));

        const panelWrapper: HTMLElement = document.createElement('div');
        panelWrapper.className = 'panel-wrapper';
        panelWrapper.append(this.sliderPanel);
        
        slider.after(panelWrapper);
    }

    private createInputControl(control:HTMLElement, controlClass: string, labelText: string): HTMLElement {
        control.setAttribute('type', 'text');
        control.className = controlClass;

        const controlLabel: HTMLElement = document.createElement('label');
        controlLabel.textContent = labelText;

        const wrapper: HTMLElement = document.createElement('div');
        wrapper.className = 'slider-panel__control-wrapper';

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
}