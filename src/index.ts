import '@/plugins/sliderPlugin/incredibleSliderPlugin.ts'
import '@/plugins/sliderPanelPlugin/sliderControlPanel.ts'

import '@/style.scss';
import '@/plugins/sliderPlugin/styles/style.scss'
import '@/plugins/sliderPanelPlugin/styles/style.scss'
import '@/fonts/fontsStyles.scss'

const addNewSliderBtn = document.querySelector('.add-new-slider');
let helpImage: HTMLElement | null = document.querySelector('.helpImage')
const buttonWrapper = document.querySelector('.button-wrapper');

if (addNewSliderBtn !== null) {
    addNewSliderBtn.addEventListener('click', clickToAddNewSliderBtn);
}

function clickToAddNewSliderBtn(): void {
    if (buttonWrapper !== null) {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('slider-wrapper');
        buttonWrapper.before(sliderWrapper);

        if (helpImage != null) {
            helpImage.remove();
            helpImage = null;
        }
        
        $(sliderWrapper).incredibleSliderPlugin();
        $(sliderWrapper).sliderControlPanel();
    }
}