import Observable from './observable';
import { Model } from './model';
import { View } from './view';
import Presenter from './presenter';
import { ISliderSettings } from './interfaces';
// import { IgnorePlugin } from 'webpack';

(function ($) {

    // Настройки плагина по умолчанию
    const defaultSettings: ISliderSettings = {
        'orienation': 'horizontal',
        'type': 'single',
        'scale': true,        
        'minValue': 1,
        'maxValue': 10,
        'step': 1
    };

    // API мотоды плагина
    const methods: any = {  ///////////////////////////////////////////// ТИП ANY /////////////////////////////////////////////

        init: function (options: ISliderSettings) {

            // Обновление настроек плагина в соответсвии с полученными параметрами
            const settings: any = $.extend(defaultSettings, options);

            // Создание слайдеров
            return this.each(function (this: any) { ///////////////////////////////////////////// ТИП ANY /////////////////////////////////////////////
                const observer = new Observable();
                const model: Model = new Model(observer, settings);
                const view: View = new View(this, observer);
                const presenter: Presenter = new Presenter(view, model, observer);

                // $(this).data('settings', settings); ///////////////////////// добавить проверку на существование объекта
                // $(this).data('model', model);
                // // $(this).data('slider', {
                // //     target: $(this),
                // //     m: model
                // // });
            });
        },
        // setMinValue: function(value: number) {
        //     $(this).data().model.setMinValue(value);
        // },
        // setMaxValue: function(value: number) {
        //     $(this).data().model.setMaxValue(value);
        // },
        // setStepValue: function(value: number) {
        //     $(this).data().model.setStepValue(value);
        // }
        
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









// // Поиск блоков с классом incredibleSliderPlugin и передача их плагину для добавления в них слайдеров
// $('.incredibleSliderPlugin').incredibleSliderPlugin();
// console.log($('.incredibleSliderPlugin').eq(0).incredibleSliderPlugin('show'))


// import { Observable } from './observable';
// import { Model } from './model';
// import { View } from './view';
// import { Presenter } from './presenter';
// import { IPluginSettings } from './interfaces';
// import { IgnorePlugin } from 'webpack';

// (function ($) {

//     // Настройки плагина
//     const defaultSettings: any = {
//         'orienation': 'horizontal',
//         'type': 'single',
//         'scale': true,
//         'minValue': 1,
//         'maxValue': 100,
//         'step': 1
//     };

//     const methods: any = {
//         init: function (options: IPluginSettings) {
//             // Обновление настроек плагина в соответсвии с полученными параметрами
//             const settings: any = $.extend(defaultSettings, options);/////////////////////////////////////////////////////////////////

//             // Добавление конфигурации новых слайдеров в модель
//             return this.each(function (this: any) { //////////////////////////////////////////////////////////////////////////////////
//                 const observer = new Observable();
//                 const model: Model = new Model(observer);
//                 const view: View = new View(observer);
//                 const presenter: Presenter = new Presenter(view, model, observer);

//                 model.createNewSlider(this, settings);

//                 $(this).data('settings', settings); ///////////////////////// добавить проверку на существование объекта
//                 $(this).data('model', model);
//                 // $(this).data('slider', {
//                 //     target: $(this),
//                 //     m: model
//                 // });
//             });
//         },
//         setMinValue: function(value: number) {
//             $(this).data().model.setMinValue(value);
//         },
//         setMaxValue: function(value: number) {
//             $(this).data().model.setMaxValue(value);
//         },
//         setStepValue: function(value: number) {
//             $(this).data().model.setStepValue(value);
//         }
//     };

//     $.fn.incredibleSliderPlugin = function (action?: string | IPluginSettings, args?): JQuery<HTMLElement> {
//         if (typeof action === 'string' && methods[action]) {
//             return methods[action].call(this, args);
//         } else if (typeof action === 'object' || !action) {
//             return methods.init.call(this, args);
//         } else {
//             $.error('Метод с именем ' + action + ' не существует для jQuery.incredibleSliderPlugin');
//             return this;
//         }
//         // if (typeof action === 'object' || !action) {
//         //     return methods.init.apply(this, arguments);
//         // } else if (methods[action]) {
//         //     return methods[action].apply(this, Array.prototype.slice.call(arguments, 1));
//         // } else {
//         //     $.error('Метод с именем ' + action + ' не существует для jQuery.incredibleSliderPlugin');
//         //     return this;
//         // }
//     };
// })(jQuery);

// // // Поиск блоков с классом incredibleSliderPlugin и передача их плагину для добавления в них слайдеров
// // $('.incredibleSliderPlugin').incredibleSliderPlugin();
// // console.log($('.incredibleSliderPlugin').eq(0).incredibleSliderPlugin('show'))