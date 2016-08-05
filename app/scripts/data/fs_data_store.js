import {DataStore} from 'js-data';

export default class FSDataStore extends DataStore{
    // Add any extension etc here
    getPage(name, pageNum) {
        return this.getMapper(name).getPage(pageNum)
            .then((pageData) => {
                pageData.results = this.add(name, pageData.results)
                return pageData;
            });
    }
}

/*
class Base extends Collection {}
//Base.registerAdapter('http', http, {default: true});
Base.configure({
    basePath: 'http://localhost:8080'
});

export default Base
*/