export class Panel {
    sliderPanel: HTMLElement | null = null;
    minValue: HTMLElement | null = null;
    maxValue: HTMLElement | null = null;
    step: HTMLElement | null = null;

    constructor(panelPosition: HTMLElement) {
        this.sliderPanel = document.createElement('div');
        this.sliderPanel.className = 'slider-panel';

        this.minValue = document.createElement('input');
        this.minValue.className = 'slider-panel';

        this.maxValue = document.createElement('input');
        this.maxValue.className = 'slider-panel';

        this.step = document.createElement('input');
        this.step.className = 'slider-panel';

        this.sliderPanel.append(this.minValue);
        this.sliderPanel.append(this.maxValue);
        this.sliderPanel.append(this.step);

        
        panelPosition.replaceWith(this.sliderPanel);
    }
}