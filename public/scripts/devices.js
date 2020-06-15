const deviceSocket = io('/devices');

var devices = [];

async function populateDevices() {
    
    await deviceSocket.on('index', (data) => {
        devices = [...data];
    });

}

async function submitForm(event) {
    event.preventDefault();
    const deviceForm = event.target;
    const formContainer = deviceForm.parentNode;
    const deviceData = new FormData(deviceForm);
    const data = JSON.parse(JSON.stringify(Object.fromEntries(deviceData)));
    
    await deviceSocket.emit('create', data, (status) => {
        if(status === 201) {
            alert(`Device create.`);
            formContainer.classList.toggle("hidden");
        }
        else {
            alert(`Error: Device not created.`);
        }
    });
}

function createDevice() {
    const deviceForm = document.querySelector("form");
    deviceForm.addEventListener("submit", submitForm);
}


async function switchStateBtn(event) {
    const deviceBtn = event.target;
    let deviceId = deviceBtn.
        parentNode.
        childNodes[3].
        firstElementChild.
        innerHTML.
        match(/\d+/);
    deviceId = parseInt(deviceId[0]);

    if(deviceBtn.className === "switch-btn btn-off") {
        deviceBtn.innerHTML = "Ligado";
        deviceSocket.emit('changeValue', {id: deviceId, value: 1}, (status) => {
            if(status !== 200) {
                alert(`Error: value not changed.`);
            }
        });
    }

    else if(deviceBtn.className === "switch-btn btn-on") {
        deviceBtn.innerHTML = "Desligado";
        deviceSocket.emit('changeValue', {id: deviceId, value: 0}, (status) => {
            if(status !== 200) {
                alert(`Error: value not changed.`);
            }
        });
    }
    deviceBtn.classList.toggle("btn-off");
    deviceBtn.classList.toggle("btn-on");
}

function deviceStateBtn() {
    const devicesBtn = document.querySelectorAll("button.switch-btn");
    
    devicesBtn.forEach((deviceBtn) => {
        deviceBtn.addEventListener("click", switchStateBtn);
    });
}

async function deleteDevice(event) {
    const device = event.target.parentNode.parentNode.parentNode;
    let idDevice = device.
        childNodes[3].
        firstElementChild.
        innerHTML.
        match(/\d+/);
    idDevice = parseInt(idDevice[0]);

    await deviceSocket.emit('remove', {id: idDevice}, (status) => {
        if(status === 200) {
            alert(`Device deleted.`);
            device.remove();
        }
        else {
            alert(`Error: device not deleted.`);
        }
    });
    
}

function deviceDeleteBtn() {
    const devicesDeleteBtn = document.querySelectorAll("img.remove-btn");

    devicesDeleteBtn.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deleteDevice);
    });
}

populateDevices();
createDevice();
deviceStateBtn();
deviceDeleteBtn();