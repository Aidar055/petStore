document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("feed")) {
      let feed = event.target;
      let description = feed.querySelector(".feed_description").innerText;
      let price = feed.querySelector(".feed_price").innerText;
      let imageSrc = feed.querySelector(".feed_img").src;

      document.querySelector("#modalDescription").textContent = description;
      document.querySelector("#modalPrice").textContent = `цуна ${price}`;
      document.querySelector("#modalImage").src = imageSrc;

      let modal = document.querySelector("#myModal");
      modal.classList.add("modal-visible");

      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.classList.remove("modal-visible");
        }
      });
    }
  });
});
