/**
 * Created by gautam on 10/08/16.
 */

import Post from '../data/models/post';
import storeSingleton from '../store'
import registerNonCRUDAction from '../store-utils'


/* ----------------- */
/* Define the Schema */
/* ----------------- */
const PostSchema = new Schema({
  properties: {
    id: { type: 'number' },
    user_id: { type: 'number', indexed: true },
    title: { type: 'string' },
    content: { type: 'string' }
  }
})


/* ----------------- */
/* Define the Mapper */
/* ----------------- */
storeSingleton.defineMapper('post', {
    recordClass: Post,
    endpoint: 'post',  // The URL endpoint. This will be: basePath + endpoint
    schema: PostSchema,
    applySchema: false,
    beforeFind (id, options) {
      // beforeFind override
    },
    afterFind (id, options, result) {
      // beforeFind override
      // Eg. result._timestamp = result._timestamp.getTime()
    }
});


/* ---------------------------------------- */
/* Define any Non CRUD operation (optional) */
/* ---------------------------------------- */

// POST /api/v3/posts/publish/:post_id/draft
let publishPostAction = addAction('publishPostAction', {
 basePath: 'api/v3/posts/publish',
 pathname: 'draft',
 method: 'GET'
})


// GET /posts/published/
let getPublishedPostsAction = addAction('getPublishedPostsAction', {
 pathname: 'published',
 method: 'GET'
})

/* Register the actions with mapper */
registerNonCRUDAction(publishPostAction, store.getMapper('post'));
registerNonCRUDAction(getPublishedPostsAction, store.getMapper('post'));
