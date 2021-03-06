import productdb, { bulkcreate, getData, createEle } from "./Module.js";
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
  getData(db.products, (data) => {
    userid.value = data.id+1 || 1;
  });
}); 

// create event on btn read button
btnread.addEventListener("click", table);

function table(e) {
  e.preventDefault();
  const tbody = document.querySelector("tbody");

  while(tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  getData(db.products, (data) => {
    if(data) {
      createEle("tr", tbody, tr => {
        console.log(tr)
        for (const value in data) {
          createEle("td", tr, td => {
              td.textContent = data.price === data[value]?`$${data[value]}`:data[value]; 
          })
        }
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-edit edit"
            i.textContent = "@"
          });
        });
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-delete delete"
            i.textContent = "@"
          });
        })
      })
    }
  })
}

