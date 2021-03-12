import { IObserver } from '../../simple-slider/interfaces';
import ControlPanelModel from '../model/control-panel-model';
import ControlPanelView from '../view/control-panel-view';

export default class ControlPanelController implements IObserver {
  private view: ControlPanelView;
  private model: ControlPanelModel;

  constructor(view: ControlPanelView, model: ControlPanelModel) {
    this.view = view;
    this.model = model;
    this.init();
    this.model.register('thumbsPosIsUpdated', this);
    this.view.register('controlPanelDataUpdated', this);
  }

  /**
   * Инициализация контролов во View данными из Model
   */
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

  /**
   * Обновляет данные слайдера или панели управления в соответствии с полученным событием
   * @param {string} eventType - событие
   */
  update(eventType: string): void {
    if (eventType === 'thumbsPosIsUpdated') {
      this.view.setThumbsValues(this.model.getThumbsValues());
    }

    if (eventType === 'controlPanelDataUpdated') {
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
    }
  }
}
