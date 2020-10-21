(function ($) {
    ($.fn as any).sliderControlPanel = function () {

        // Добавление конфигурации новых слайдеров в модель
        for (const panelPosition of this) {
            const sliderPanel: HTMLElement = document.createElement('div');
            sliderPanel.className = 'slider-panel';
            
            panelPosition.replaceWith(sliderPanel);
        }

    };
})(jQuery);

($('.sliderControlPanel') as any).sliderControlPanel();