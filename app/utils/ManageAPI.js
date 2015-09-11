var request = require('supertest');

/*
 * Following code reuse and dependencies guidelines from:
 * https://github.com/bendc/frontend-guidelines#dependencies
 */
const propIsEnumerable = Object.prototype.propertyIsEnumerable;

const toObject = (val) => {
  if (val == null) {
    throw new TypeError('Object assign cannot be called with null or undefined');
  }

  return Object(val);
};

const ownEnumerableKeys = (obj) => {
  let keys = Object.getOwnPropertyNames(obj);

  if (Object.getOwnPropertySymbols) {
    keys = keys.concat(Object.getOwnPropertySymbols(obj));
  }

  return keys.filter((key) => {
    return propIsEnumerable.call(obj, key);
  });
};

const assign = (() =>
  Object.assign ? Object.assign : (target, ...sources) => {
    let keys;
    let to = toObject(target);
    sources.forEach((val) => {
      keys = ownEnumerableKeys(Object(val));
      keys.forEach((key) => {
        to[key] = val[key];
      });
    });
    return to;
  }
)();

const merge = (...sources) => assign({}, ...sources);

const utils = {

  addManage: (manage) => {
    request
      .post('/manages')
      .send({ data: manage})
      .end(function(err, res){
        if(err) {
          return console.error(err);
        }
        return res;
      });
  },

  updateManage: (id, manage) => {
    request
      .put('/manages/'+id)
      .send({data: manage})
      .end(function(err, res){
        if(err) {
          return console.error(err);
        }
        return res;
      });
  },

  deleteManage: (id) => {
    request(app)
      .del('/manages/'+id)
      .end(function(err, res){
        if(err) {
          return console.error(err);
        }
        return res;
      });
  }

};

export default utils;
