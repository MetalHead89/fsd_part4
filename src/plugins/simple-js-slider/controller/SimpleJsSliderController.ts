import {
  IControllerParams,
  ISimpleJsSliderModel,
  ISimpleJsSliderView,
  ISliderSettings,
  IThumbsPositions,
} from '../interfaces';

class SimpleJsSliderController {
  private model: ISimpleJsSliderModel;
  private view: ISimpleJsSliderView;

  constructor(params: IControllerParams) {
    this.model = params.model;
    this.view = params.view;

    this.init();
    this.bindContext();
    this.subscribeToEvents();
  }

  private init(): void {
    this.fullViewUpdate(this.model.getSliderSettings());
  }

  private subscribeToEvents(): void {
    this.view.register('thumbIsDragged', (args: IThumbsPositions) => {
      this.model.updateThumbsValues(args);
    });

    this.model.register('modelIsUpdated', this.updateView);
    this.model.register('settingsIsUpdated', (args: ISliderSettings) => this.fullViewUpdate(args));
  }

  private bindContext(): void {
    this.updateView = this.updateView.bind(this);
    this.fullViewUpdate = this.fullViewUpdate.bind(this);
  }

  private updateView(): void {
    this.view.moveThumbs(this.model.getThumbsPositions());
    this.view.updateProgressBar();
  }

  private updateScale() {
    this.view.updateScale(this.model.getPointsParams());
  }

  private fullViewUpdate(settings: ISliderSettings): void {
    this.updateSliderOrientation(settings.orientation);
    this.updateSliderType(settings.type);
    this.updatePopUpsState(settings.isPopUps);
    this.updateView();
    this.updateScaleState(settings.isScale);
    this.updateScale();
  }

  private updateSliderOrientation(orientation: string): void {
    this.view.switchOrientation(orientation);
  }

  private updateSliderType(type: string): void {
    if (type === 'single') {
      this.view.switchToSingle();
    } else {
      this.view.switchToRange();
    }
  }

  private updateScaleState(enabled: boolean) {
    if (enabled) {
      this.view.enableScale();
      this.updateView();
    } else {
      this.view.disableScale();
    }
  }

  private updatePopUpsState(enabled: boolean): void {
    if (enabled) {
      this.view.enablePopUps();
    } else {
      this.view.disablePopUps();
    }
  }
}

export default SimpleJsSliderController;
