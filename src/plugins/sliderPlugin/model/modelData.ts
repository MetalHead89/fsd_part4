import { ISliderSettings } from '../interfaces';

class ModelData {
    private orientation: string;
    private type: string;
    private scaleVisible: boolean;
    private tooltipVisible: boolean;
    private min: number;
    private max: number;
    private step: number;

    constructor(settings: ISliderSettings) {

        this.orientation = settings.orienation;
        this.type = settings.type;
        this.scaleVisible = settings.scale;
        this.tooltipVisible = settings.tooltip;
        this.min = settings.min;
        this.max = settings.max;
        this.step = settings.step;

    }
}

export default ModelData;