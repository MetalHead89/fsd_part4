import '@/plugins/sliderPlugin/incredibleSliderPlugin.ts'
import '@/plugins/sliderPanelPlugin/sliderControlPanel.ts'

import '@/style.scss';
import '@/plugins/sliderPlugin/styles/style.scss'
import '@/plugins/sliderPanelPlugin/styles/style.scss'
import '@/fonts/fontsStyles.scss'

const addNewSliderBtn = document.querySelector('.add-new-slider-btn');
let helpImage: HTMLElement | null = document.querySelector('.help-image')
const buttonWrapper = document.querySelector('.button-wrapper');

if (addNewSliderBtn !== null) {
    addNewSliderBtn.addEventListener('click', clickToAddNewSliderBtn);
}

function clickToAddNewSliderBtn(): void {
    if (buttonWrapper !== null) {
        if (helpImage != null) {
            helpImage.remove();
            helpImage = null;
        }

        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('slider-wrapper');
        buttonWrapper.before(sliderWrapper);

        const removeSliderButton = document.createElement('div');
        removeSliderButton.classList.add('remove-slider-button');
        removeSliderButton.innerText = 'x';
        removeSliderButton.addEventListener('click', removeSlider.bind(removeSliderButton, sliderWrapper));
        sliderWrapper.append(removeSliderButton);
        
        $(sliderWrapper).incredibleSliderPlugin();
        $(sliderWrapper).sliderControlPanel();
    }
}

function removeSlider(sliderWrapper: HTMLDivElement) {
    sliderWrapper.remove();
}