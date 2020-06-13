const addBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close-btn");
const formContainer = document.querySelector(".form-container.hidden");

addBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
});

closeBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
});
