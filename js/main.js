let cardAnimal = document.querySelectorAll(".animals");
let btnAdmin = document.querySelector("#btnAdmin");

cardAnimal.forEach((elem) => {
  elem.addEventListener("click", () => {
    window.location.href = "./feedPet.html";
  });
});
btnAdmin.addEventListener("click", () => {
  window.location.href = "./admin.html";
});
