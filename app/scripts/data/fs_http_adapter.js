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

        let data = response.posts;
        if (response && 'pageSize' in response ) {
          data._meta = {
            pageSize: response.pageSize,
            resultSize: response.resultSize,
            startIndex: response.startIndex,
            total : response.total
          };
        }
        return data;
    }
}
