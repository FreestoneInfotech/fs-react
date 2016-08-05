/**
 * Created by gautam on 28/07/16.
 */
import Faker from 'faker';

var faker = Faker;


class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getData(index, col) {
        let obj = this._data[this._indexMap[index]];
        return obj[col].trim();
  }
}

class FakeDataStore {
    constructor(opts){
        this._cache = [];

        if(opts.data){
            this._cache = opts.data;
            this.size = opts.data.length;
        }

    }

    getData(index, col) {
        if (index < 0 || index > this.size){
            return undefined;
        }
        if (this._cache[index] === undefined) {
            this._cache[index] = {}; //this.createFakeRowObjectData(index);
        }
        let obj = this._cache[index];
        return obj[col].trim();
        //return this._cache[index];
    }

    getAll() {
        return this._cache;
    }

    getSize() {
        return this.size;
    }
}

export {DataListWrapper, FakeDataStore}
