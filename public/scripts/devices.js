function Device(device) {
    this.id = device.id;
    this.name =  device.name;
    this.type = device.type;
    this.pin =  device.pin;
    this.value =  device.value;
    this.node = {};
}
Device.prototype = {
    deviceListNode: {},
    constructor: Device,
    changeValue: function() {
        this.value = (!this.value ? 1 : 0);
        deviceSocket.emit('changeValue', {id: this.id, value: this.value}, (status) => {
            if(status === 200) {
                this.updateDevice();
            }
        });
    },
    deleteDevice: function(callbackFn) {
        deviceSocket.emit('remove', {id: this.id}, (status) => {
            if(status === 200) {
                alert(`Device deleted.`);
                this.removeDevice(callbackFn);
            }
            else {
                alert(`Error: device not deleted.`);
            }
        });
    },
    updateDevice: function(value = this.value) {
        this.value = value;
        const switchBtn = this.node.querySelector("button.switch-btn");
        if(this.value)
            switchBtn.innerHTML = "Ligado";    
        else
            switchBtn.innerHTML = "Desligado";
        switchBtn.classList.toggle("btn-on");
        switchBtn.classList.toggle("btn-off");
    },
    removeDevice: function(callbackFn) {
        this.node.remove();
        callbackFn();
    }
};

function addDevice(devices, device) {
    const templateNode = document.querySelector("li.device").cloneNode(true);
    templateNode.removeAttribute("id");
    templateNode.querySelector("strong#device-name").textContent = device.name;
    templateNode.querySelector("p#device-id").textContent = (device.id).toString();
    templateNode.querySelector("p#device-pin").textContent = (device.pin).toString();

    devices[device.id] = new Device(device);
    addEvent(templateNode, devices);
    devices.deviceListNode.appendChild(templateNode);
}

function addEvent(device, deviceList) {
    let deviceDeleteBtn = device.querySelector("button.delete-btn");
    let deviceSwitchBtn = device.querySelector("button.switch-btn");
    let deviceId = device.querySelector("p#device-id").textContent;
    console.log(device);
    deviceId = parseInt(deviceId);
    deviceList[deviceId].node = device;            
    console.log(deviceList[deviceId]);
    deviceDeleteBtn.addEventListener("click", () => {
        deviceList[deviceId].deleteDevice(() => {
            delete deviceList[deviceId];    
        });
    }, true);

    deviceSwitchBtn.addEventListener("click", () => {
        deviceList[deviceId].changeValue();
    }, true);
}

function setDeviceEvents(deviceList) {
    let deviceNodeList = document.querySelectorAll("li.device:not(#template)");
    let deviceListNode = document.querySelector("ul.devices-list");

    deviceList.deviceListNode = deviceListNode;
    deviceNodeList.forEach((device) => {
        addEvent(device, deviceList);
    });

    return deviceList;
}

function populateDeviceList() {
    return new Promise((resolve, reject) => {
        let deviceList = Device.prototype;
        
        deviceSocket.on('index', (data) => {
            data.forEach((device) => {
                deviceList[device.id] = (new Device(device)); 
            });
            resolve(deviceList);
        });
    });
}

function submitForm(event, devices) {
    event.preventDefault();
    const deviceForm = event.target;
    const formContainer = deviceForm.parentNode;
    const deviceData = new FormData(deviceForm);
    const data = JSON.parse(JSON.stringify(Object.fromEntries(deviceData)));
    
    deviceSocket.emit('create', data, (status) => {
        if(status === 201) {
            alert(`Device create.`);
            formContainer.classList.toggle("hidden");
            console.log(data);
            // addDevice(devices, data);
        }
        else {
            alert(`Error: Device not created.`);
        }
    });
}

function createDeviceHandler(devices) {
    const deviceForm = document.querySelector("form");
    deviceForm.addEventListener("submit",(event) => {
        submitForm(event, devices);
    } );
}

function updateState(devices) {
    deviceSocket.on('update', (data) => {
        const {id, value} = data;
        devices[id].updateDevice(value);
    });
    deviceSocket.on('delete', (data) => {
        const {id} = data;
        devices[id].removeDevice(() => {
            delete devices[id];
        });
    });
    deviceSocket.on('add', (data) => {
        const device = data[0];
        addDevice(devices, device);
    });
}


const deviceSocket = io('/devices');
var devices = {};

populateDeviceList(devices).then((deviceList) => {
    devices = setDeviceEvents(deviceList);
    updateState(devices);
});

createDeviceHandler(devices);
