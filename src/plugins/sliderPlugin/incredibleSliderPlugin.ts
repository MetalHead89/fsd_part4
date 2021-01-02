/* eslint wrap-iife: [2, "inside"] */

import { ISliderSettings } from './interfaces';

import Presenter from './presenter/presenter';

(($) => {
  // Настройки плагина по умолчанию
  const defaultSettings: ISliderSettings = {
    orienation: 'horizontal',
    type: 'range',
    scale: true,
    tooltips: true,
    min: 0,
    max: 10,
    step: 1,
  };

  // API мотоды плагина
  const methods: any = {
    init(options: ISliderSettings) {
      // Обновление настроек плагина в соответсвии с полученными параметрами
      const settings: ISliderSettings = $.extend(defaultSettings, options);

      // Создание слайдеров
      return this.each(function createSlider(this: any) {
        const sliderPresenter: Presenter = new Presenter(settings, this);

        $(this).data('settings', settings);
        $(this).data('sliderPresenter', sliderPresenter);
      });
    },
    setMin(value: number) {
      $(this).data().sliderPresenter.changeMinValue(value);
    },
    getMin() {
      return $(this).data().sliderPresenter.getSliderMinValue();
    },
    setMax(value: number) {
      $(this).data().sliderPresenter.changeMaxValue(value);
    },
    getMax() {
      return $(this).data().sliderPresenter.getSliderMaxValue();
    },
    getStep() {
      return $(this).data().sliderPresenter.getSliderStep();
    },
    setStep(value: number) {
      $(this).data().sliderPresenter.changeStep(value);
    },
    changeScaleVisibility(flag: boolean) {
      $(this).data().sliderPresenter.changeScaleVisibility(flag);
    },
    changeTooltipsVisibility(flag: boolean) {
      $(this).data().sliderPresenter.changeTooltipsVisibility(flag);
    },
    getScaleVisiblity(): boolean {
      return $(this).data().sliderPresenter.getScaleVisiblity();
    },
    getTooltipsVisiblity(): boolean {
      return $(this).data().sliderPresenter.getTooltipsVisiblity();
    },
    changeSliderType(type: string) {
      return $(this).data().sliderPresenter.changeSliderType(type);
    },
    getSliderType(): string {
      return $(this).data().sliderPresenter.getSliderType();
    },
    getSliderOrientation(): string {
      return $(this).data().sliderPresenter.getSliderOrientation();
    },
    changeSliderOrientation(orientation: string): void {
      return $(this).data().sliderPresenter.changeSliderOrientation(orientation);
    },
  };

  $.fn.incredibleSliderPlugin = function plug(action?: string
    | ISliderSettings, args?): JQuery<HTMLElement> {
    let method: any;

    if (typeof action === 'string' && methods[action]) {
      method = methods[action].call(this, args);
    } else if (typeof action === 'object' || !action) {
      method = methods.init.call(this, args);
    } else {
      $.error(`Метод с именем ${action} не существует для jQuery.incredibleSliderPlugin`);
      method = this;
    }

    return method;
  };
})(jQuery);
