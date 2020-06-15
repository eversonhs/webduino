const connection = require('../connection');

async function index() {
    let devices;

    try {
        devices = await connection('arduinoDevices').select('*');
    }
    catch(err) {
        console.log("error");
    }

    return devices;
}

async function create(data, status) {
    console.log("Form data received, creating device...");
    console.log(data);
    const {name, type, pin} = data;
    const value = 0;
    const valueChanged = 'true';

    try {
        await connection('arduinoDevices').
        insert({
            name,
            type,
            pin,
            value,
            valueChanged
        });
        status(201);
    } catch(err) {
        console.log("Device not created");
        status(403);
    }
}

async function remove(data ,status) {
    console.log("Receive a delete request, deleting the device by ID...");
    console.log(data);
    const {id} = data;

    try {
        await connection('arduinoDevices').where('id', id).delete();
        status(200);
    }
    catch(err) {
        status(403);
    }
}

async function changeValue(data, status) {
    console.log("Data received to change value...");
    console.log(data);
    var {id, value} = data; 
    await connection('arduinoDevices').
        where('id', id).
        update({
            value: value,
            valueChanged: 'true'
        });

    status(200);
}

module.exports = {
    connection(socket) {
        console.log("An user has connected to the server.");

        index().then(data => socket.emit('index', data));
        socket.on('create', create);
        socket.on('remove', remove);
        socket.on('changeValue', changeValue);
    }
};