import { boundMethod } from 'autobind-decorator';
import { ISliderSettings } from '../../simple-js-slider/interfaces';
import ControlPanelModel from '../model/ControlPanelModel';
import ControlPanelView from '../view/ControlPanelView';

class ControlPanelController {
  private view: ControlPanelView;
  private model: ControlPanelModel;

  constructor(view: ControlPanelView, model: ControlPanelModel) {
    this.view = view;
    this.model = model;
    this.init();

    this.subscribeToEvents();
  }

  private init(): void {
    this.updateView(this.model.getSliderSettings());
  }

  @boundMethod
  private updateView(settings: ISliderSettings): void {
    this.view.updateView(settings);
  }

  private subscribeToEvents(): void {
    this.view.register('controlPanelDataUpdated', (args) => {
      this.model.updateSliderPluginSettings(args as ISliderSettings);
    });
    this.model.register('sliderIsUpdated', (args) => {
      this.updateView(args as ISliderSettings);
    });
  }
}

export default ControlPanelController;
