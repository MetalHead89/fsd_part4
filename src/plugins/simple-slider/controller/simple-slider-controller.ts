import { ISimpleSliderController, ISimpleSliderModel } from '../interfaces';

import SimpleSliderView from '../view/simple-slider-view';

class SimpleSliderController implements ISimpleSliderController {
  private simpleSliderModel: ISimpleSliderModel;
  private simpleSliderView: SimpleSliderView;

  constructor(model: ISimpleSliderModel) {
    this.simpleSliderModel = model;
    this.simpleSliderView = new SimpleSliderView(this, this.simpleSliderModel);
  }
}

export default SimpleSliderController;
