import {Panel} from './panel'

(function ($) {
    $.fn.sliderControlPanel = function (): JQuery<HTMLElement> {
        
        // Добавление конфигурации новых слайдеров в модель
        // for (const panelPosition of this) {
        //     const panel: Panel = new Panel(panelPosition);
        // }

        const panel: Panel = new Panel(this);

        return this
    };
})(jQuery);