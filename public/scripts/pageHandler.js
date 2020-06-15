function pageSelector(){
    const navButtons = document.querySelectorAll("a.navbar-btn");

    navButtons.forEach((navBtn) => {
        navBtn.addEventListener("click", () => {
            navBtn.classList.toggle("btn-pressed");
        });
    });
}

function devicesModalHandler() {
    const addBtn = document.querySelector("button.add-btn");
    const closeBtn = document.querySelector("img.close-btn");
    const formContainer = document.querySelector("div.form-container.hidden");

    addBtn.addEventListener("click", () => {
        formContainer.classList.toggle("hidden");
    });

    closeBtn.addEventListener("click", () => {
        formContainer.classList.toggle("hidden");
    });
}

pageSelector();
devicesModalHandler();
