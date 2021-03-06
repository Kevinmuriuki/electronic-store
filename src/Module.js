import Dexie from 'dexie';

// declare indexDB database
function productdb(dbname, table) {
  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();
  
  return db;
}

// insert function
function bulkcreate(dbtable, data) {
  let flag = empty(data);
  for(const value in data) {
    if (flag) {
      dbtable.bulkAdd([data]).then(() => {
                console.log("Inserted Data Successfully");
              }).catch(Dexie.BulkError, (e) => {
                console.error("Data wasn't added successfully");
              });
    } else {
      console.log("Please Provide Data...!");
    }
  
    return flag;
  }
}

// check textbox validation
const empty = object => {
  let flag = false;

  for(const value in object) {
    if(object[value] != "" && object.hasOwnProperty(value)){
      flag = true;
    } else {
      flag = false;
    }
  }
}

// get data from database # fn is a high order function
const getData = (dbtable, fn) => {
  let index = 0;
  let obj = {};

  dbtable.count((count) => {
    if(count) {
      dbtable.each(table => {
        obj = Sortobj(table);
        fn(obj, index++);
      })
    } else {
      fn(0);
    }
  })
}

// sort object function
const Sortobj = sortobj => {
  let obj = {};
  obj = {
    id:sortobj.id,
    name:sortobj.name,
    seller:sortobj.seller,
    price:sortobj.price
  };
  return obj;
}

// create dynamic element
const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if(appendTo)appendTo.appendChild(element);
  if(fn)fn(element);
}

export default productdb;
export {
  bulkcreate,
  getData,
  createEle
};

