interface JQuery {
  simpleJsSlider(action?: 'init' | ISliderSettings): JQuery<HTMLDivElement>;
  simpleJsSlider(action: 'getSliderSettings'): ISliderSettings;
  simpleJsSlider(action: 'updateSliderSettings', args: ISliderSettings): void;
  simpleJsSlider(action: 'register', args: (args?: any) => void): void;
}
