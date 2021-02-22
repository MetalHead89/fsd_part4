import ControlPanelModel from '../model/control-panel-model';
import ControlPanelView from '../view/control-panel-view';

export default class ControlPanelController {
  private view: ControlPanelView;
  private model: ControlPanelModel;

  constructor(view: ControlPanelView, model: ControlPanelModel) {
    this.view = view;
    this.model = model;

    this.init();
  }

  init(): void {
    this.view.setThumbsValues(this.model.getThumbsValues());
  }
}
