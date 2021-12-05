/* eslint-disable object-curly-newline */

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

type PanelModelEvents = { sliderIsUpdated: string };
type PanelViewEvents = { controlPanelDataUpdated: string };

export { IRadioParams, ICheckboxParams, IGroupElements, PanelModelEvents, PanelViewEvents };
