import Slider from './slider';

class ElementFactory {

    private slider: Slider | null = null;

    createSlider(parrent: HTMLElement, styles: string): Slider {

        const createObj = (obj: HTMLElement) => { return new Slider(obj) }
        const slider = this.init(parrent, styles, createObj);
        
        return slider

    }

    init(parrent: HTMLElement, styles: string, createObj: Function): any {  ///////////////////////////////////////////// ТИП ANY /////////////////////////////////////////////

        const elem: HTMLElement = document.createElement('div');
        elem.className = styles;
        const obj = createObj(elem);
        parrent.append(elem);

        return obj;

    }

}

export default ElementFactory;