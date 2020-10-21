// import { Observable } from '../slider/observable';
// import { Model } from '../slider/model';
// import { View } from '../slider/view';
// import { Presenter } from '../slider/presenter';
// import { IPluginSettings } from '../slider/interfaces';

// (function ($) {
//     ($.fn as any).incredibleSliderPlugin = function (options: IPluginSettings) {

//         // Настройки плагина        
//         let settings: IPluginSettings = {
//             'orienation': 'horizontal',
//             'type': 'single',
//             'minValue': 0,
//             'maxValue': 100,
//             'step': 1
//         }

//         // Обновление настроек плагина в соответсвии с полученными параметрами
//         settings = $.extend(settings, options);

//         // Добавление конфигурации новых слайдеров в модель
//         for (const sliderPosition of this) {
//             const observer = new Observable();
//             const model: Model = new Model(observer);
//             const view: View = new View(observer);
//             const presenter: Presenter = new Presenter(view, model, observer);

//             model.createNewSlider(sliderPosition, settings);
//         }

//     };
// })(jQuery);

// (function ($) {
//     ($.fn as any).sliderControlPanel = function () {

//         // Добавление конфигурации новых слайдеров в модель
//         for (const panelPosition of this) {
//             const sliderPanel: HTMLElement = document.createElement('div');
//             sliderPanel.className = 'slider-panel';
            
//             panelPosition.replaceWith(sliderPanel);
//         }

//     };
// })(jQuery);

// // Поиск блоков с классом incredibleSliderPlugin и передача их плагину для добавления в них слайдеров
// ($('.incredibleSliderPlugin') as any).incredibleSliderPlugin();

// ($('.sliderControlPanel') as any).sliderControlPanel();