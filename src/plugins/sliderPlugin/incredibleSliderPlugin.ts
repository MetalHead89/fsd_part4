import { Observable } from './observable';
import { Model } from './model';
import { View } from './view';
import { Presenter } from './presenter';
import { IPluginSettings } from './interfaces';

(function ($) {

    // Настройки плагина
    const defaultSettings: any = {
        'orienation': 'horizontal',
        'type': 'single',
        'minValue': 0,
        'maxValue': 100,
        'step': 1
    };

    const methods: any = {
        init: function (options: IPluginSettings) {
            // Обновление настроек плагина в соответсвии с полученными параметрами
            const settings: any = $.extend(defaultSettings, options);

            // Добавление конфигурации новых слайдеров в модель
            return this.each(function (this: any) {
                console.log($(this))
                const observer = new Observable();
                const model: Model = new Model(observer);
                const view: View = new View(observer);
                const presenter: Presenter = new Presenter(view, model, observer);

                model.createNewSlider(this, settings);

                $(this).data('slider', {
                    target: $(this),
                    m: model
                });
            });
        },
        show: function () {
            console.log(this.data().slider.m)
        }
    };

    $.fn.incredibleSliderPlugin = function (action?: string | IPluginSettings): JQuery<HTMLElement> {
        if (typeof action === 'object' || !action) {
            return methods.init.apply(this, arguments);
        } else if (methods[action]) {
            return methods[action].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Метод с именем ' + action + ' не существует для jQuery.incredibleSliderPlugin');
            return this;
        }
    };
})(jQuery);

// // Поиск блоков с классом incredibleSliderPlugin и передача их плагину для добавления в них слайдеров
// $('.incredibleSliderPlugin').incredibleSliderPlugin();
// console.log($('.incredibleSliderPlugin').eq(0).incredibleSliderPlugin('show'))