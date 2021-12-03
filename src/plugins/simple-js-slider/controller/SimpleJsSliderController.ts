import {
  IControllerParams,
  ISimpleJsSliderModel,
  ISimpleJsSliderView,
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
    this.fullViewUpdate();
  }

  private subscribeToEvents(): void {
    this.view.register('thumbIsDragged', (args: IThumbsPositions) => {
      this.model.updateThumbsValues(args);
    });

    this.model.register('modelIsUpdated', this.updateView);
    this.model.register('settingsIsUpdated', this.fullViewUpdate);
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

  private fullViewUpdate(): void {
    this.updateSliderOrientation();
    this.updateSliderType();
    this.updatePopUpsState();
    this.updateView();
    this.updateScaleState();
    this.updateScale();
  }

  private updateSliderOrientation(): void {
    this.view.switchOrientation(this.model.getOrientation());
  }

  private updateSliderType(): void {
    if (this.model.getType() === 'single') {
      this.view.switchToSingle();
    } else {
      this.view.switchToRange();
    }
  }

  private updateScaleState() {
    if (this.model.isScaleEnabled()) {
      this.view.enableScale();
      this.updateView();
    } else {
      this.view.disableScale();
    }
  }

  private updatePopUpsState(): void {
    if (this.model.isPopUpsEnabled()) {
      this.view.enablePopUps();
    } else {
      this.view.disablePopUps();
    }
  }
}

export default SimpleJsSliderController;
