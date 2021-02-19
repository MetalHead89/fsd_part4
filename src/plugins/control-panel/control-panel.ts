/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import ControlPanelView from './view/control-panel-view';

(($) => {
  const methods: any = {
    init(): void {
      return this.each(function jj(this: HTMLDivElement) {
        const view = new ControlPanelView();
      });
    },
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.controlPanel = function hh(action?: string, args?): JQuery<HTMLElement> {
    let method: any;

    if (typeof action === 'string' && methods[action]) {
      method = methods[action].call(this, args);
    } else if (typeof action === 'object' || !action) {
      method = methods.init.call(this, args);
    } else {
      $.error(`Метод с именем ${action} не существует для jQuery.controlPanel`);
      method = this;
    }

    return method;
  };
})(jQuery);
