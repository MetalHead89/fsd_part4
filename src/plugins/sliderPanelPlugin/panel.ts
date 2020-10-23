export class Panel {
    sliderPanel: HTMLElement | null = null;
    minValue: HTMLElement | null = null;
    maxValue: HTMLElement | null = null;
    step: HTMLElement | null = null;

    constructor(slider: JQuery<HTMLElement>) {
        this.sliderPanel = document.createElement('div');
        this.sliderPanel.className = 'slider-panel';

        this.minValue = document.createElement('input');
        this.maxValue = document.createElement('input');
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
}