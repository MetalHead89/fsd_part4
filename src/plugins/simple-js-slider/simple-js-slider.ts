import { ISliderSettings, SimpleJSSliderActions, SimpleJSSliderAPIMethods } from './interfaces';
import SimpleJsSliderModel from './model/SimpleJsSliderModel';
import SimpleJsSliderController from './controller/SimpleJsSliderController';
import SimpleJsSliderView from './view/SimpleJsSliderView';

(($) => {
  // Настройки плагина по умолчанию
  const defaultSettings = {
    orientation: 'horizontal',
    type: 'range',
    isScale: true,
    isPopUps: true,
    min: 0,
    max: 10,
    step: 1,
    thumbOneValue: 3,
    thumbTwoValue: 7,
    sliderSize: { width: 500, height: 10 },
    thumbSize: { width: 20, height: 20 },
  };

  // API методы плагина
  const methods: any = {
    init(options: ISliderSettings): void {
      // Обновление настроек плагина в соответствии с полученными параметрами
      const settings: ISliderSettings = $.extend(defaultSettings, options);

      // Создание слайдеров
      return this.each(function createSlider(this: HTMLDivElement) {
        const model = new SimpleJsSliderModel(settings);
        const view = new SimpleJsSliderView(this);
        const controller = new SimpleJsSliderController({
          model,
          view,
        });

        $(this).data('settings', settings);
        $(this).data('controller', controller);
        $(this).data('model', model);
      });
    },
    getSliderSettings(): ISliderSettings {
      return $(this).data().model.getSliderSettings();
    },
    updateSliderSettings(sliderSettings: ISliderSettings): void {
      $(this).data().model.updateSliderSettings(sliderSettings);
    },
    register(callback: () => void): void {
      $(this).data().model.register('modelIsUpdated', callback);
    },
  };

  $.fn.simpleJsSlider = function plug<K extends keyof SimpleJSSliderActions>(
    action?: K,
    args?: SimpleJSSliderActions[K]
  ): SimpleJSSliderAPIMethods {
    let method: any;

    if (typeof action === 'string' && methods[action]) {
      method = methods[action].call(this, args);
    } else if (typeof action === 'object' || !action) {
      method = methods.init.call(this, action);
    } else {
      $.error(`Метод с именем ${action} не существует для jQuery.simpleJsSlider`);
      method = this;
    }

    return method;
  };
})(jQuery);
