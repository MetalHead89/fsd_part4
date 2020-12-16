import '@/plugins/sliderPlugin/incredibleSliderPlugin.ts'
import '@/plugins/sliderPanelPlugin/sliderControlPanel.ts'

import '@/style.scss';
import '@/plugins/sliderPlugin/styles/style.scss'
import '@/plugins/sliderPanelPlugin/styles/style.scss'
import '@/fonts/fontsStyles.scss'

const addNewSliderBtn = document.querySelector('.add-new-slider');
const buttonWrapper = document.querySelector('.button-wrapper')
if (addNewSliderBtn !== null) {
    addNewSliderBtn.addEventListener('click', () => {
        if (buttonWrapper !== null) {
            const sliderWrapper = document.createElement('div');
            sliderWrapper.classList.add('slider-wrapper');
            buttonWrapper.before(sliderWrapper);
            $(sliderWrapper).incredibleSliderPlugin();
            $(sliderWrapper).sliderControlPanel();
        }
    });
}

// Поиск блоков с классом incredibleSliderPlugin и передача их плагину для добавления в них слайдеров
// const sliders = $('.slider-wrapper').incredibleSliderPlugin();

// sliders.each(function() {
//     $(this).sliderControlPanel();
// });