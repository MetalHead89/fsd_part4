/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */

import { ISliderSettings, ISubject, IThumbsValues } from './interfaces';
import SimpleSliderModel from './model/simple-slider-model';
import SimpleSliderController from './controller/simple-slider-controller';
import SimpleSliderView from './view/simple-slider-view';

(($) => {
  // Настройки плагина по умолчанию
  const defaultSettings = {
    orientation: 'horizontal',
    type: 'range',
    scale: true,
    popUps: true,
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
        const model = new SimpleSliderModel(settings);
        const view = new SimpleSliderView(this);
        const controller = new SimpleSliderController({
          model,
          view,
        });

        $(this).data('settings', settings);
        $(this).data('controller', controller);
        $(this).data('model', model);
      });
    },
    getModelSubject(): ISubject {
      return $(this).data().model.subject;
    },
    getThumbsValues(): IThumbsValues {
      return $(this).data().model.getThumbsValues();
    },
    getMin(): number {
      return $(this).data().model.getMin();
    },
    getMax(): number {
      return $(this).data().model.getMax();
    },
    getStep(): number {
      return $(this).data().model.getStep();
    },
    getScaleState(): boolean {
      return $(this).data().model.getScaleState();
    },
    getPopUpsState(): boolean {
      return $(this).data().model.getPopUpsState();
    },
    getType(): string {
      return $(this).data().model.getType();
    },
    getOrientation(): string {
      return $(this).data().model.getOrientation();
    },
    refreshSliderState(sliderSettings: ISliderSettings): void {
      $(this).data().model.refreshSliderState(sliderSettings);
    },
  };

  $.fn.simpleSlider = function plug(
    action?: string | ISliderSettings,
    args?,
  ): any {
    let method: any;

    if (typeof action === 'string' && methods[action]) {
      method = methods[action].call(this, args);
    } else if (typeof action === 'object' || !action) {
      method = methods.init.call(this, action);
    } else {
      $.error(`Метод с именем ${action} не существует для jQuery.simpleSlider`);
      method = this;
    }

    return method;
  };
})(jQuery);
