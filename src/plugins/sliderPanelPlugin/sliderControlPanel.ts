import Panel from './panel';

(function ($) {
    $.fn.sliderControlPanel = function (): JQuery<HTMLElement> {
        new Panel(this);
        return this
    };
})(jQuery);
