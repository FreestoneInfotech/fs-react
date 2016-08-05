import {observable, autorun} from 'mobx';
import {Record} from 'js-data';
import {FSRecord} from '../../data/fs_record';

export default class User extends FSRecord {
    id;
    @observable username;
    @observable mobileNumber;

    constructor(props = {}, opts = {}){
        super(props, opts);
        console.log("User constructor called with props : ", props);
        console.log("User constructor called with opts : ", opts);

        if (props){
            this.username = props.username;
            this.mobileNumber = props.mobileNumber;
            this.id = props._id;
        }
    }

    // var add = myUser.address
    get address () {
        return this.username + ' ' + this.mobileNumber;
    }

    say(){
        console.log("say called for", this.id);
    }
}
