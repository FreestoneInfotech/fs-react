import {observable, autorun} from 'mobx';
import uuid from 'node-uuid';
import {FSRecord} from '../../data/fs_record';

export class Post extends FSRecord {
    /**
     * unique id of this post, immutable.
     */
    id = null;


    @observable completed = false;
    @observable task = "";

    /**
     * reference to an Author object (from the authorStore)
     */
    @observable author = null;

    store = null;

    /**
     * Indicates whether changes in this object
     * should be submitted to the server
     */
    autoSave = true;

    /**
     * Disposer for the side effect that automatically
     * stores this Post, see @dispose.
     */
    saveHandler = null;

    constructor() {
        super();
        this.store = store;
        this.id = id;

        this.saveHandler = autorun(() => {
            // observe everything that is used in the JSON:
            var json = this.toJson();
            // if autoSave is on, send json to server
            if (this.autoSave) {
                this.store.transportLayer.savePost(postJson);
            }
        });
        }

    /**
     * Remove this post from the client and server
     */
    delete() {
        this.store.transportLayer.deletePost(this.id);
        this.store.removePost(this);
    }

    toJson() {
        return {
            id: this.id,
            completed: this.completed,
            task: this.task,
            authorId: this.author ? this.author.id : null
        };
    }

    /**
     * Update this post with information from the server
     */
    updateFromJson(json) {
        // make sure our changes aren't send back to the server
        this.autoSave = false;
        post.completed = json.completed;
        post.task = json.task;
        this.author = this.store.authorStore.resolveAuthor(json.authorId);
        this.autoSave = true;
    }

    dispose() {
        // clean up the observer
        this.saveHandler();
    }
}
