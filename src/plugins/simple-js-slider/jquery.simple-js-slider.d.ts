interface JQuery {
  simpleJsSlider(action?: 'init' | ISliderSettings): JQuery<HTMLDivElement>;
  simpleJsSlider(action: 'getSettings'): ISliderSettings;
  simpleJsSlider(action: 'updateSettings', args: ISliderSettings): void;
  simpleJsSlider(action: 'register', options: (args?: ISliderSettings) => void): void;
  simpleJsSlider(action: 'unsubscribe', options: (args?: ISliderSettings) => void): void;
}
