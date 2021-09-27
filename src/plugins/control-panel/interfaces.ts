interface ISubjectEvents {
  [key: string]: () => void;
}

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

export { ISubjectEvents, IRadioParams, ICheckboxParams, IGroupElements };
