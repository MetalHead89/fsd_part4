interface IRadioParams {
  label: string;
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

export { IRadioParams, ICheckboxParams, IGroupElements };
