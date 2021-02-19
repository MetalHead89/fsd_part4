/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import ControlPanelView from './view/control-panel-view';

(($) => {
  $.fn.controlPanel = function (): JQuery<HTMLElement> {
    const view = new ControlPanelView();
    // const panel = new Panel(this);
    return this;
  };
})(jQuery);
