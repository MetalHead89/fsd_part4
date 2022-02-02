/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import {
  APIObserverArgs,
  ISliderSettings,
  ModelEvents,
  SimpleJSSliderAPIMethods,
} from './interfaces';
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

  function isAPIObserverArgs(value: unknown): value is APIObserverArgs<ModelEvents> {
    return typeof value === 'object' && value !== null && 'event' in value;
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
    getSettings(): ISliderSettings {
      return $(this).data().model.getSettings();
    },
    updateSettings(sliderSettings: ISliderSettings): void {
      $(this).data().model.updateSettings(sliderSettings);
    },
    register(args: APIObserverArgs<ModelEvents>): void {
      $(this).data().model.register(args.event, args.callback);
    },
    unsubscribe(args: APIObserverArgs<ModelEvents>): void {
      $(this).data().model.unsubscribe(args.event, args.callback);
    },
  };

  $.fn.simpleJsSlider = function plug(
    action: keyof SimpleJSSliderAPIMethods = 'init',
    options?: Parameters<SimpleJSSliderAPIMethods[typeof action]>[0]
  ): any {
    let method: void | ISliderSettings | JQuery<HTMLDivElement>;

    if (action === 'init' && isSliderSettings(options)) {
      method = methods[action].call(this, options);
    } else if (isSliderSettings(action)) {
      method = methods.init.call(this, action);
    } else if (action === 'register' && isAPIObserverArgs(options)) {
      method = methods[action].call(this, options);
    } else if (action === 'unsubscribe' && isAPIObserverArgs(options)) {
      method = methods[action].call(this, options);
    } else if (action === 'getSettings') {
      method = methods[action].call(this);
    } else if (action === 'updateSettings' && isSliderSettings(options)) {
      method = methods[action].call(this, options);
    } else {
      method = methods.init.call(this);
    }

    return method;
  };
})(jQuery);
