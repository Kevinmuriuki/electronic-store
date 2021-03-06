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

// delete records
btndelete.addEventListener("click", (e) => {
  e.preventDefault();
  db.delete();
  db = productdb("Productdb", {
    products: `++id, name, seller, price`
  });
  db.open();
  table();
})

// update event on btn update button
btnupdate.addEventListener("click", (e) => {
  e.preventDefault();
  const id = parseInt(userid.value || 0);
  if(id) {
    db.products.update(id, {
      name:nameinput.value,
      seller:sellerinput.value,
      price:priceinput.value,
    }).then((updated) => {
      let get = updated ? `data Updated` : `Couldn't Update Data`;
      console.log(get)
    })
  }
}) 

// create event on btn read button
btnread.addEventListener("click", (e) => {
  e.preventDefault();
  table();
})
function table() {
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
            i.setAttribute('data-id',data.id)
            i.textContent = "@"
            i.onclick = editbtn;
          });
        });
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-delete delete";
            i.setAttribute('data-id',data.id)
            i.textContent = "@";
            i.onclick = deletebtn;
          });
        })
      })
    }
  })
}

function editbtn(e) {
  let id = parseInt(e.target.dataset.id);

  db.products.get(id, (data) => {
    userid.value = data.id || 0;
    nameinput.value = data.name || "";
    sellerinput.value = data.seller || "";
    priceinput.value = data.price || "";
  })
}

function deletebtn(e) {
  let id = parseInt(e.target.dataset.id);
  db.products.delete(id);
  table();
}

