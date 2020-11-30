import '@/plugins/sliderPlugin/incredibleSliderPlugin.ts'
import '@/plugins/sliderPanelPlugin/sliderControlPanel.ts'

import '@/style.scss';
import '@/plugins/sliderPlugin/styles/style.scss'
import '@/plugins/sliderPanelPlugin/styles/style.scss'
import '@/fonts/fontsStyles.scss'

// Поиск блоков с классом incredibleSliderPlugin и передача их плагину для добавления в них слайдеров
const sliders = $('.slider-wrapper').incredibleSliderPlugin();

sliders.each(function() {
    $(this).sliderControlPanel();
});