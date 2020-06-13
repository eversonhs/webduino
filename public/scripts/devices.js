modalHandler();
deviceStateBtn();
deviceDeleteBtn();
createDevice();

function modalHandler() {
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

async function submitForm(event) {
    event.preventDefault();
    const deviceForm = event.target;
    alert(`Form send, work in progress.`);
}

function createDevice() {
    const deviceForm = document.querySelector("form");
    deviceForm.addEventListener("submit", submitForm);
}


function deviceStateBtn() {
    const devicesBtn = document.querySelectorAll("button.switch-btn.btn-off");
    
    devicesBtn.forEach((deviceBtn) => {
        deviceBtn.addEventListener("click", () => {
            if(deviceBtn.className === "switch-btn btn-off")
                deviceBtn.innerHTML = "Ligado";
            else if(deviceBtn.className === "switch-btn btn-on")
                deviceBtn.innerHTML = "Desligado";
            deviceBtn.classList.toggle("btn-off");
            deviceBtn.classList.toggle("btn-on");

        })
    });
}

function deleteDevice(event) {
    const device = event.target.parentNode.parentNode.parentNode;

    // send to the server delete the device
    // in work yet

    device.remove();
}

function deviceDeleteBtn() {
    const devicesList = document.querySelectorAll("li.device");
    const devicesDeleteBtn = document.querySelectorAll("button.delete-btn");

    devicesDeleteBtn.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deleteDevice);
    });
}