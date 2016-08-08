import {observable, autorun} from 'mobx';
import uuid from 'node-uuid';
import {FSRecord} from '../../data/fs_record';

export class Post extends FSRecord {
    id = null;

    @observable title  = "";
    @observable content = "";
    @observable author = "";

    constructor(props = {}, opts = {}){
        super(props, opts);
        console.log("Post constructor called with props : ", props);
        console.log("Post constructor called with opts : ", opts);

        if (props){
            this.id = props._id;
            Object.assign(this, { 
                title, content, author 
            });
        }
    }

}
