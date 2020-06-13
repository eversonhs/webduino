const navButtons = document.querySelectorAll("a.navbar-btn");

navButtons.forEach((navBtn) => {
    navBtn.addEventListener("click", () => {
        navBtn.classList.toggle("btn-pressed");
    });
});