let API = "http://localhost:8000/document";
let btn = document.querySelector(".btn");
let inputs = document.querySelectorAll(".input");
let list = document.querySelector(".list");
let btn1 = document.querySelector("#btn1");
let container = document.querySelector(".container_input");
btn1.addEventListener("click", () => {
  container.style.display = "block";
});
btn.addEventListener("click", () => {
  container.style.display = "none";
});

btn.addEventListener("click", () => {
  let dataObj = {};

  inputs.forEach((input) => {
    if (input.value.trim()) {
      dataObj[input.getAttribute("placeholder")] = input.value.trim();
    }
  });
  if (Object.keys(dataObj).length === 0) {
    alert("Заполните хотя бы одно поле!");
    return;
  }
  createTask(dataObj);

  inputs.forEach((input) => {
    input.value = "";
  });
});

function createTask(data) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then(() => readTask());
}

function readTask() {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      list.innerHTML = "";
      data.forEach((elem) => {
        list.innerHTML += ` 
         
          <div id = "form"> 
          <img src="${elem.Фотография}" alt="Фото" id = "img" /> 
            <p>Цена: ${elem.Цена}</p> 
            <p>Описание: ${elem.Описание}</p> 
            <div class="press">
            <button id="${elem.id}" class="btnDelete">delete</button> 
            <button id="${elem.id}" class="btnEdit">edit</button> 
          </div> 
          </div>
           
        `;
      });
    });
}
readTask();

document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  if (del_class.includes("btnDelete")) {
    const del_id = e.target.id;
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => readTask());
  }
});

let inpEditLastImg = document.querySelector(".inpEditLastImg");
let inpEditPrice = document.querySelector(".inpEditPrice");
let inpEditDescription = document.querySelector(".inpEditDescription");
let btnEditSave = document.querySelector(".saveEdit");
let editModal = document.querySelector(".editModal");

document.addEventListener("click", (e) => {
  let edit_class = [...e.target.classList];
  if (edit_class.includes("btnEdit")) {
    editModal.style.display = "block";
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpEditLastImg.value = data.Фотография;
        inpEditPrice.value = data.Цена;
        inpEditDescription.value = data.Описание;
        btnEditSave.setAttribute("data-id", data.id);
      });
  }
});

btnEditSave.addEventListener("click", () => {
  let editedData = {
    Фотография: inpEditLastImg.value,
    Цена: inpEditPrice.value,
    Описание: inpEditDescription.value,
  };
  let taskId = btnEditSave.getAttribute("data-id");
  editedTask(editedData, taskId);
  inpEditLastImg.value = "";
  inpEditPrice.value = "";
  inpEditDescription.value = "";
});

function editedTask(editedData, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editedData),
  }).then(() => {
    readTask();
  });
}

document.addEventListener("click", () => {
  let modal = document.querySelector("#modal");
  let saveEdit = document.querySelector(".saveEdit");

  saveEdit.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
