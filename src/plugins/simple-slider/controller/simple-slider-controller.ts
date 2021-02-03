import {
  ISimpleSliderController,
  ISimpleSliderModel,
  ISize,
} from '../interfaces';

import SimpleSliderView from '../view/simple-slider-view';

class SimpleSliderController implements ISimpleSliderController {
  private simpleSliderModel: ISimpleSliderModel;
  private simpleSliderView: SimpleSliderView;

  constructor(model: ISimpleSliderModel) {
    this.simpleSliderModel = model;
    this.simpleSliderView = new SimpleSliderView(this, this.simpleSliderModel);
  }

  setSliderSize(size: ISize): void {
    this.simpleSliderModel.setSliderSize(size);
  }
}

export default SimpleSliderController;
