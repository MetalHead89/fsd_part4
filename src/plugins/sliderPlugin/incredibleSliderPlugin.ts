import { ISliderSettings } from './interfaces';

import Presenter from './presenter/presenter';

(function ($) {

    // Настройки плагина по умолчанию
    const defaultSettings: ISliderSettings = {
        'orienation': 'horizontal',
        'type': 'range',
        'scale': true,
        'tooltips': true,       
        'min': 0,
        'max': 10,
        'step': 1
    };

    // API мотоды плагина
    const methods: any = {

        init: function (options: ISliderSettings) {

            // Обновление настроек плагина в соответсвии с полученными параметрами
            const settings: ISliderSettings = $.extend(defaultSettings, options);

            // Создание слайдеров
            return this.each(function (this: any) {
                // const observer = new Observable();
                // const model: Model = new Model(observer, settings);
                // const view: View = new View(observer, this,
                //     {'type': settings.type, 'orientation': settings.orienation});
                const sliderPresenter: Presenter = new Presenter(settings, this);

                $(this).data('settings', settings); ///////////////////////// добавить проверку на существование объекта
                $(this).data('sliderPresenter', sliderPresenter);
                // $(this).data('slider', {
                //     target: $(this),
                //     m: model
                // });
            });
        },
        setMin: function(value: number) {
            $(this).data().sliderPresenter.changeMinValue(value);
        },
        setMax: function(value: number) {
            $(this).data().sliderPresenter.changeMaxValue(value);
        },
        setStep: function(value: number) {
            $(this).data().sliderPresenter.changeStep(value);
        },
        changeScaleVisibility: function(flag: boolean) {
            $(this).data().sliderPresenter.changeScaleVisibility(flag);
        },
        changeTooltipsVisibility: function(flag: boolean) {
            $(this).data().sliderPresenter.changeTooltipsVisibility(flag);
        },
        getScaleVisiblity: function(): boolean {
            return $(this).data().sliderPresenter.getScaleVisiblity();
        },
        getTooltipsVisiblity: function(): boolean {
            return $(this).data().sliderPresenter.getTooltipsVisiblity();
        },
        changeSliderType: function(type: string) {
            return $(this).data().sliderPresenter.changeSliderType(type);
        },
        getSliderType: function(): string {
            return $(this).data().sliderPresenter.getSliderType();
        },
        getSliderOrientation: function(): string {
            return $(this).data().sliderPresenter.getSliderOrientation();
        },
        changeSliderOrientation: function(orientation: string): void {
            return $(this).data().sliderPresenter.changeSliderOrientation(orientation);
        }
        
    };

    $.fn.incredibleSliderPlugin = function (action?: string | ISliderSettings, args?): JQuery<HTMLElement> {

        if (typeof action === 'string' && methods[action]) {
            return methods[action].call(this, args);
        } else if (typeof action === 'object' || !action) {
            return methods.init.call(this, args);
        } else {
            $.error('Метод с именем ' + action + ' не существует для jQuery.incredibleSliderPlugin');
            return this;
        }

    };

})(jQuery);