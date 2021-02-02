import SimpleSliderModel from '../model/simple-slider-model';
import SimpleSliderView from '../view/simple-slider-view';

class SimpleSliderController {
  private simpleSliderModel: SimpleSliderModel;
  private simpleSliderView: SimpleSliderView;

  constructor(model: SimpleSliderModel) {
    this.simpleSliderModel = model;
    this.simpleSliderView = new SimpleSliderView(model);
  }
}

export default SimpleSliderController;
