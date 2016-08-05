/**
 * Created by gautam on 23/07/16.
 */

import FSDataStore from '../data/fs_data_store';
import FSMapper from '../data/fs_mapper';
import FSHttpAdapter from '../data/fs_http_adapter';
import Post from '../data/models/post';
import User from '../data/models/user';
import Article from '../data/models/article';

let storeSingleton = new FSDataStore({
    mapperClass : FSMapper
});

storeSingleton.registerAdapter('http', new FSHttpAdapter({
    basePath: 'http://localhost:3000/api',
    suffix : '/'
}), {
    default: true
})

/*storeSingleton.configure({
    basePath: 'http://localhost:3000'
});
*/

storeSingleton.defineMapper('post', {
    recordClass: Post
    //applySchema: true,
    //schema: PersonSchema
});

storeSingleton.defineMapper('article', {
    recordClass: Article
});


storeSingleton.defineMapper('user', {
    schema: {
        properties: {
            username: { type: 'string'},
            mobileNumber: { type: 'string' },
        }
    },
    applySchema: false,
    recordClass: User,
    endpoint : 'users'
});



export default storeSingleton;
//storeSingleton.defineMapper('post', PostConfig)

