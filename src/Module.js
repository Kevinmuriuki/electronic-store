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
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("Data inserted successfully...!");
  } else {
    console.log("Please Provide Data...!");
  }

  return flag;
}

// check textbox validation
const empty = (object) => {
  let flag = false;

  for(const value in object) {
    if(object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }
}

export default productdb;
export {
  bulkcreate
};

