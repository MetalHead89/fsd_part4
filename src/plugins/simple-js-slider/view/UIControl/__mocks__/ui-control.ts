export default class UIControl {
  protected control: HTMLDivElement;
  protected mainClass: string;
  protected TEST_OK = true;
  subject = {
    register: (): boolean => true,
    unsubscribe: (): boolean => true,
    notify: (): boolean => true,
  };

  constructor(name: string) {
    const control = document.createElement('div');
    this.control = control;
    this.mainClass = name;
    this.control.classList.add(`${name}`);
  }

  getPosition(): boolean {
    return this.TEST_OK;
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  getSize(): boolean {
    return this.TEST_OK;
  }

  switchToHorizontal(): void {
    this.control.classList.remove(`${this.mainClass}_orientation_vertical`);
    this.control.classList.add(`${this.mainClass}_orientation_horizontal`);
  }

  switchToVertical(): void {
    this.control.classList.remove(`${this.mainClass}_orientation_horizontal`);
    this.control.classList.add(`${this.mainClass}_orientation_vertical`);
  }

  remove(): void {
    this.control.remove();
  }

  getOrientation(): boolean {
    return this.TEST_OK;
  }

  getRect(): boolean {
    return this.TEST_OK;
  }

  getStyle(): boolean {
    return this.TEST_OK;
  }
}
