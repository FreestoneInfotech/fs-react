
import {Mapper} from 'js-data';
import Post from 'post';

/**
 * Created by gautam on 22/07/16.
 */


const postMapper = new PostMapper({
    name: 'postMapper',
    recordClass :  Post
})


export default postMapper;

