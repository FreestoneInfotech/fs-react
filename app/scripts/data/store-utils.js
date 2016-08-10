/**
 * Created by gautam on 10/08/16.
 */

import {addAction} from 'js-data-http';


let registerNonCRUDAction = function(action, mapper){
  addAction(action)(mapper);
}

export default registerNonCRUDAction;
