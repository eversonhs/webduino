const socket = io();

async function submitForm(event) {
    event.preventDefault();
    const deviceForm = event.target;
    const formContainer = deviceForm.parentNode;
    const deviceData = new FormData(deviceForm);
    const data = JSON.parse(JSON.stringify(Object.fromEntries(deviceData)));
    
    await socket.emit('createDevice', data, (status) => {
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

createDevice();