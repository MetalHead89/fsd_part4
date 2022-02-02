import { ISliderSettings } from '../simple-js-slider/interfaces';

interface IRadioParams {
  labelText: string;
  value: string;
  checked?: boolean;
}

interface ICheckboxParams {
  label: string;
  name: string;
  value: string;
}

interface IGroupElements {
  header?: string;
  wrapperClass: string;
  elements: HTMLDivElement[];
}

type PanelModelEvents = { sliderIsUpdated: ISliderSettings };
type PanelViewEvents = { controlPanelDataUpdated: ISliderSettings };
type PanelControlEvents = { panelControlIsUpdated: string };

export {
  IRadioParams,
  ICheckboxParams,
  IGroupElements,
  PanelModelEvents,
  PanelViewEvents,
  PanelControlEvents,
};
