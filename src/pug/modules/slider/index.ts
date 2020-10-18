import { Observable } from '../slider/observable';
import { Model } from '../slider/model';
import { View } from '../slider/view';
import { Presenter } from '../slider/presenter';
import { iPluginSettings } from '../slider/interfaces';

(function ($) {

    ($.fn as any).incredibleSliderPlugin = function (options: iPluginSettings) {
        const observer = new Observable();
        const model: Model = new Model(observer);
        const view: View = new View(observer);
        const presenter: Presenter = new Presenter(view, model, observer);

        let settings: iPluginSettings = {
            'orienation': 'horizontal',
            'type': 'single'
        }

        settings = $.extend(settings, options);

        for (const elem of this) {
            presenter.init(elem);
        }
    };
})(jQuery);

($('.incredibleSliderPlugin') as any).incredibleSliderPlugin();