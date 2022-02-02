interface JQuery {
  simpleJsSlider(action?: 'init' | ISliderSettings): JQuery<HTMLDivElement>;
  simpleJsSlider(action: 'getSettings'): ISliderSettings;
  simpleJsSlider(action: 'updateSettings', args: ISliderSettings): void;
  simpleJsSlider(action: 'register', options: APIObserverArgs<ModelEvents>): void;
  simpleJsSlider(action: 'unsubscribe', options: APIObserverArgs<ModelEvents>): void;
}
