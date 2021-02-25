/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import ControlPanelView from './view/control-panel-view';
import ControlPanelModel from './model/control-panel-model';
import ControlPanelController from './controller/control-panel-controller';

(($) => {
  const methods: any = {
    init(): void {
      return this.each(function (this: HTMLDivElement) {
        const view = new ControlPanelView(this);
        const model = new ControlPanelModel($(this));
        const controller = new ControlPanelController(view, model);
      });
    },
  };

  $.fn.controlPanel = function (action?: string, args?): JQuery<HTMLElement> {
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
