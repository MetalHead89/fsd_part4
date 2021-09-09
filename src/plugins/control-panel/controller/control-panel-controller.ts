import { IObserver } from '../../simple-slider/interfaces';
import ControlPanelModel from '../model/control-panel-model';
import ControlPanelView from '../view/control-panel-view';

class ControlPanelController implements IObserver {
  private view: ControlPanelView;
  private model: ControlPanelModel;

  constructor(view: ControlPanelView, model: ControlPanelModel) {
    this.view = view;
    this.model = model;
    this.init();

    this.subscribeToEvents();
  }

  /**
   * Подписывает Controller на необходимые события, возникающие во View и Model
   */
  private subscribeToEvents(): void {
    this.model.register('thumbsPositionsIsUpdated', this);
    this.model.register('minIsUpdated', this);
    this.model.register('maxIsUpdated', this);
    this.model.register('stepIsUpdated', this);
    this.view.register('controlPanelDataUpdated', this);
  }

  /**
   * Инициализация элементов слайдера во View данными из Model
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
    if (eventType === 'thumbsPositionsIsUpdated') {
      this.view.setThumbsValues(this.model.getThumbsValues());
    } else if (eventType === 'minIsUpdated') {
      this.view.setMinValue(this.model.getMin());
    } else if (eventType === 'maxIsUpdated') {
      this.view.setMaxValue(this.model.getMax());
    } else if (eventType === 'stepIsUpdated') {
      this.view.setStep(this.model.getStep());
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

export default ControlPanelController;
