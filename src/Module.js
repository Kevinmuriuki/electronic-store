import Dexie from 'dexie';

// declare indexDB database
function productdb(dbname, table) {

  const db = new Dexie(dbname);

  db.version(1).stores(table);

  db.open();

}

export default productdb;
