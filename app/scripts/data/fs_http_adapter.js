/**
 * Created by gautam on 23/07/16.
 */
import {HttpAdapter} from 'js-data-http';

export default class FSHttpAdapter extends HttpAdapter {
    // Extend HttpAdapter functions here
    // Eg.
    deserialize(mapper, response, opts) {
        // Call the original deserialize
        response = super.deserialize(mapper, response, opts);
        // Process response here and return it
        return response;
    }
}
