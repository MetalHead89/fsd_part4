import {IInputControl} from '../interfaces'

class PanelElement {
    protected generateID(prefix: string): string {
        while (true) {
            const id = prefix + this.generateRandNumber()

            if (!document.getElementById(id)) {
                return id;
            }
        }
    }

    protected generateName(prefix: string): string {
        while (true) {
            const name = prefix + this.generateRandNumber()

            if (document.getElementsByName(name).length == 0) {
                return name;
            }
        }
    }

    private generateRandNumber(): number {
        const min = 1;
        const max = 100000;

        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    protected createControl(params: IInputControl): HTMLDivElement {

        params.inputElement.type = params.inputType;
        params.inputElement.className = params.inputClass;

        const controlLabel: HTMLLabelElement = document.createElement('label');
        controlLabel.classList.add(params.labelClass);
        controlLabel.textContent = params.labelText;

        if (params.id) {
            params.inputElement.id = params.id;
            controlLabel.htmlFor = params.id;
        }

        if (params.name) {
            params.inputElement.name = params.name;
        }

        if (params.value) {
            params.inputElement.value = params.value;
        }

        return this.wrapElements(params.wrapperClass, params.inputElement, controlLabel);

    }

    private wrapElements(wrapperClass: string, ...elements: HTMLElement[]): HTMLDivElement {

        /**
         * Оборачивает полученные элементы в div с заданным классом
         * 
         * @param {string} wrapperClass - класс, который будет назначен обёртке
         * @param {HTMLElement[]} - массив элементов, которые требуется обернуть
         * 
         * @returns {HTMLDivElement} - элементы в обёртке
         */

        const wrapper: HTMLDivElement = document.createElement('div');
        wrapper.className = wrapperClass;

        for (const element of elements) {
            wrapper.append(element);
        }

        return wrapper;
    }
}

export default PanelElement;