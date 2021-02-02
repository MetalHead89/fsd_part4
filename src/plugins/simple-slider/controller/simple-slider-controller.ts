import { SimpleSliderControllerInterface, SimpleSliderModelInterface } from '../interfaces';

import SimpleSliderView from '../view/simple-slider-view';

class SimpleSliderController implements SimpleSliderControllerInterface {
  private simpleSliderModel: SimpleSliderModelInterface;
  private simpleSliderView: SimpleSliderView;

  constructor(model: SimpleSliderModelInterface) {
    this.simpleSliderModel = model;
    this.simpleSliderView = new SimpleSliderView(model);
  }
}

export default SimpleSliderController;
