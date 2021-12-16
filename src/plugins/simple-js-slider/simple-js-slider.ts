import { ISliderSettings, SimpleJSSliderAPIMethods } from './interfaces';
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
  };

  function isSliderSettings(value: unknown): value is ISliderSettings {
    return (
      typeof value === 'object' &&
      value !== null &&
      ('orientation' in value ||
        'type' in value ||
        'isScale' in value ||
        'isPopUps' in value ||
        'min' in value ||
        'max' in value ||
        'step' in value ||
        'thumbOneValue' in value ||
        'thumbTwoValue' in value)
    );
  }

  // API методы плагина
  const methods: SimpleJSSliderAPIMethods & ThisType<JQuery<HTMLDivElement>> = {
    init(options?: ISliderSettings): JQuery<HTMLDivElement> {
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

  $.fn.simpleJsSlider = function plug(
    action: keyof SimpleJSSliderAPIMethods = 'init',
    args?: Parameters<SimpleJSSliderAPIMethods[typeof action]>[0]
  ): any {
    let method: void | ISliderSettings | JQuery<HTMLDivElement>;

    if (action === 'init' && isSliderSettings(args)) {
      method = methods[action].call(this, args);
    } else if (isSliderSettings(action)) {
      method = methods.init.call(this, action);
    } else if (action === 'register' && typeof args === 'function') {
      method = methods[action].call(this, args);
    } else if (action === 'getSliderSettings') {
      method = methods[action].call(this);
    } else if (action === 'updateSliderSettings' && isSliderSettings(args)) {
      method = methods[action].call(this, args);
    } else {
      method = methods.init.call(this);
    }

    return method;
  };
})(jQuery);
