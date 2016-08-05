/**
 *
 * Created by gautam on 23/07/16.
 */
import {Mapper} from 'js-data';

export class FSMapper extends Mapper {
    getPage(pageNum) {
        return this.findAll({ page: pageNum, format: 'json' });
    }
}
