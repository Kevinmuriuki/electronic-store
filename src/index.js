import productdb, { bulkcreate } from "./Module.js";
import './css/styles.css';

let db = productdb("Productdb", {
  products: `++id, name, seller, price`
});

// input tags
const userid = document.querySelector("input[name*='id']");
const nameinput = document.querySelector("input[name*='product-name']");
const sellerinput = document.querySelector("input[name*='seller']")
const priceinput = document.querySelector("input[name*='price']");


// buttons
const btncreate = document.getElementById('btn-create');
const btnread = document.getElementById('btn-read');
const btnupdate = document.getElementById('btn-update');
const btndelete = document.getElementById('btn-delete');

// insert values using button
btncreate.addEventListener("click", (e) => {
  e.preventDefault();
  const flag = bulkcreate(db.products, {
    name: nameinput.value,
    seller: sellerinput.value,
    price: priceinput.value
  });

  nameinput.value = sellerinput.value = priceinput.value = "";
  getData();
});

const getData = () => {
  let index = 0;
  let obj = {};

  db.products.count((count) => {
    if(count) {
      db.products.each(table => {
        console.log(table);
      })
    }
  })
}


