import { ISliderSettings } from './interfaces';

import SimpleSliderModel from './model/simple-slider-model';
import SimpleSliderController from './controller/simple-slider-controller';
import SimpleSliderView from './view/simple-slider-view';

(($) => {
  // Настройки плагина по умолчанию
  const defaultSettings = {
    orienation: 'horizontal',
    type: 'range',
    scale: true,
    tooltips: true,
    min: 0,
    max: 10,
    step: 1,
    thumbOneValue: 3,
    thumbTwoValue: 7,
  };

  // API мотоды плагина
  const methods: any = {
    init(options: ISliderSettings) {
      // Обновление настроек плагина в соответсвии с полученными параметрами
      const settings: ISliderSettings = $.extend(defaultSettings, options);

      // Создание слайдеров
      return this.each(function createSlider(this: any) {
        console.log('dfsf');
        const model = new SimpleSliderModel();
        const view = new SimpleSliderView();
        const controller = new SimpleSliderController(model, view);

        $(this).data('settings', settings);
        $(this).data('controller', controller);
      });
    },
  };

  $.fn.simpleSlider = function plug(
    action?: string | ISliderSettings,
    args?,
  ): JQuery<HTMLElement> {
    let method: any;

    if (typeof action === 'string' && methods[action]) {
      method = methods[action].call(this, args);
    } else if (typeof action === 'object' || !action) {
      method = methods.init.call(this, args);
    } else {
      $.error(`Метод с именем ${action} не существует для jQuery.simpleSlider`);
      method = this;
    }

    return method;
  };
})(jQuery);
