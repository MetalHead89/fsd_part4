/* eslint wrap-iife: [2, "inside"] */

import Panel from './panel';

(($) => {
  $.fn.sliderControlPanel = function (): JQuery<HTMLElement> {
    const panel = new Panel(this);
    return this;
  };
})(jQuery);
