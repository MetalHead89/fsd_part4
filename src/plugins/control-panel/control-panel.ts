import ControlPanelView from './view/ControlPanelView';
import ControlPanelModel from './model/ControlPanelModel';
import ControlPanelController from './controller/ControlPanelController';

(($) => {
  $.fn.controlPanel = function createPanel(): JQuery<HTMLElement> {
    const view = new ControlPanelView(this.get(0) as HTMLDivElement);
    const model = new ControlPanelModel(this);
    const controller = new ControlPanelController(view, model);

    return this;
  };
})(jQuery);
