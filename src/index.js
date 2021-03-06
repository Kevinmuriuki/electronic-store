import productdb, { bulkcreate } from "./Module.js";
import './css/styles.css';

let db = productdb("Productdb", {
  products: `++id, name, seller, price`
});

// input tags
const userid = document.getElementById('userid');
const productname = document.getElementById('productname');
const seller = document.getElementById('seller');
const price = document.getElementById('price');


// buttons
const btncreate = document.getElementById('btn-create');
const btnread = document.getElementById('btn-read');
const btnupdate = document.getElementById('btn-update');
const btndelete = document.getElementById('btn-delete');

// insert values using button
btncreate.addEventListener("click", (e) => {
  const flag = bulkcreate(db.products, {
    name: productname.value,
    seller: seller.value,
    price: price.value
  });

  // productname.value = seller.value = price.value = "";
  console.log(flag)
});
