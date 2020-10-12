import {Observable} from '../slider/observable';
import {Model} from '../slider/model';
import {View} from '../slider/view';
import {Presenter} from '../slider/presenter';

const observer = new Observable();
const model: Model = new Model(observer);
const view: View = new View(observer);
const presenter: Presenter = new Presenter(view, model, observer);

presenter.init();