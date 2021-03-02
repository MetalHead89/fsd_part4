export interface IRadioParams {
  label: string;
  value: string;
  checked?: boolean;
}

export interface ICheckboxParams {
  label: string;
  name: string;
  value: string;
}

export interface IGroupElements {
  header?: string;
  wrapperClass: string;
  elements: HTMLDivElement[];
}
