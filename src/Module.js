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
  let flag = [];
  for(const value in data) {
    if (data[value] != "" && data.hasOwnProperty(value)) {
      flag = dbtable.bulkAdd([data]).then(() => {
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

export default productdb;
export {
  bulkcreate
};

