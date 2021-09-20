import { IObserver } from '../../simple-slider/interfaces';
import { ISubjectEvents } from '../interfaces';
import ControlPanelModel from '../model/control-panel-model';
import ControlPanelView from '../view/control-panel-view';

class ControlPanelController implements IObserver {
  private view: ControlPanelView;
  private model: ControlPanelModel;

  private events: ISubjectEvents = {
    thumbsPositionsIsUpdated: () => {
      this.view.setThumbsValues(this.model.getThumbsValues());
    },
    minIsUpdated: () => this.view.setMinValue(this.model.getMin()),
    maxIsUpdated: () => this.view.setMaxValue(this.model.getMax()),
    stepIsUpdated: () => this.view.setStep(this.model.getStep()),
    controlPanelDataUpdated: () => {
      const sliderSettings = {
        orientation: this.view.getOrientation(),
        type: this.view.getType(),
        scale: this.view.getScaleState(),
        popUps: this.view.getPopUpsState(),
        min: this.view.getMin(),
        max: this.view.getMax(),
        step: this.view.getStep(),
        thumbOneValue: this.view.getThumbOneValue(),
        thumbTwoValue: this.view.getThumbTwoValue(),
      };
      this.model.refreshSliderState(sliderSettings);
    },
  };

  constructor(view: ControlPanelView, model: ControlPanelModel) {
    this.view = view;
    this.model = model;
    this.init();

    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    this.model.register('thumbsPositionsIsUpdated', this);
    this.model.register('minIsUpdated', this);
    this.model.register('maxIsUpdated', this);
    this.model.register('stepIsUpdated', this);
    this.view.register('controlPanelDataUpdated', this);
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
    this.events[eventType]();
  }
}

export default ControlPanelController;
