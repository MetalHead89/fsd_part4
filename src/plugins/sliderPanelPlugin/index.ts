import {Panel} from './panel'

(function ($) {
    ($.fn as any).sliderControlPanel = function () {

        // Добавление конфигурации новых слайдеров в модель
        for (const panelPosition of this) {
            const panel: Panel = new Panel(panelPosition);
        }

    };
})(jQuery);

($('.sliderControlPanel') as any).sliderControlPanel();