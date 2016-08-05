import {observable, autorun} from 'mobx';
import {FSRecord} from '../../data/fs_record';

export class Article extends FSRecord {
    id = null;
    @observable completed = false;
    @observable task = "";

    @observable author = null;

    constructor() {
        super();
        this.id = id;
    }

}
