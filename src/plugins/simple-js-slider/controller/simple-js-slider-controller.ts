import { IControllerParams, ISimpleJsSliderModel, ISimpleJsSliderView } from '../interfaces';
import { IThumbsPositionsNew } from '../new-interfaces';

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
    this.view.observer.register('thumbIsDragged', (args: IThumbsPositionsNew) => {
      this.model.updateThumbsValues(args);
    });

    this.model.observer.register('modelIsUpdated', this.updateView);
    this.model.observer.register('settingsIsUpdated', this.fullViewUpdate);
  }

  private bindContext(): void {
    this.updateView = this.updateView.bind(this);
    this.fullViewUpdate = this.fullViewUpdate.bind(this);
  }

  private updateView(): void {
    this.view.moveThumbs(this.model.getThumbsPositionsNew());
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
    if (this.model.getOrientation() === 'horizontal') {
      this.view.switchToHorizontal();
    } else {
      this.view.switchToVertical();
    }

    this.model.setSliderSize(this.view.getSliderSize());
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
