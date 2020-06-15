deviceStateBtn();
deviceDeleteBtn();

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
