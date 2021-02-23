import { IObserver } from '../../simple-slider/interfaces';
import ControlPanelModel from '../model/control-panel-model';
import ControlPanelView from '../view/control-panel-view';

export default class ControlPanelController implements IObserver {
  private view: ControlPanelView;
  private model: ControlPanelModel;

  constructor(view: ControlPanelView, model: ControlPanelModel) {
    this.view = view;
    this.model = model;
    this.model.register('thumbsPosIsUpdated', this);
    this.init();
  }

  init(): void {
    this.view.setThumbsValues(this.model.getThumbsValues());
    this.view.setMinValue(this.model.getMin());
    this.view.setMaxValue(this.model.getMax());
    this.view.setStep(this.model.getStep());
    this.view.setScaleState(this.model.getScaleState());
    this.view.setPopUpsState(this.model.getPopUpsState());
    this.view.setTypeRadio(this.model.getType());
    this.view.setOrientationRadio(this.model.getOrientation());
  }

  update(eventType: string): void {
    if (eventType === 'thumbsPosIsUpdated') {
      this.view.setThumbsValues(this.model.getThumbsValues());
    }
  }
}
