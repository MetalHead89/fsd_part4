export class Panel {
    constructor(panelPosition: HTMLElement) {
        const sliderPanel: HTMLElement = document.createElement('div');
        sliderPanel.className = 'slider-panel';
        
        panelPosition.replaceWith(sliderPanel);
    }
}