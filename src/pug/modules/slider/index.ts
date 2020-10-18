import { Observable } from '../slider/observable';
import { Model } from '../slider/model';
import { View } from '../slider/view';
import { Presenter } from '../slider/presenter';
import { iPluginSettings } from '../slider/interfaces';

(function ($) {
    ($.fn as any).incredibleSliderPlugin = function (options: iPluginSettings) {

        const observer = new Observable();
        const model: Model = new Model(observer);
        const view: View = new View(observer);
        const presenter: Presenter = new Presenter(view, model, observer);

        // Настройки плагина        
        let settings: iPluginSettings = {
            'orienation': 'horizontal',
            'type': 'single',
            'minValue': 0,
            'maxValue': 100,
            'step': 1
        }

        // Обновление настроек плагина в соответсвии с полученными параметрами
        settings = $.extend(settings, options);

        // Инициализация слайдеров
        for (const sliderElem of this) {
            presenter.init(sliderElem);
        }

    };
})(jQuery);

// Поиск блоков с классом incredibleSliderPlugin и передача их плагину для добавления в них слайдеров
($('.incredibleSliderPlugin') as any).incredibleSliderPlugin();