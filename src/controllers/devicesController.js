const connection = require('../connection');

async function index() {
    let devices;

    try {
        devices = await connection('arduinoDevices').select('*');
    }
    catch(err) {
    }

    return devices;
}

async function create(data, ackFn) {
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
        
        const device = await connection('arduinoDevices').
        where('name', name).
        andWhere('pin', pin).
        select('*');
        ackFn({status: "ok"});
        this.emit('add', device);
        this.broadcast.emit('add', device);

    } catch(err) {
        ackFn({status: "error"});
    }
}

async function remove(data ,ackFn) {
    const {id} = data;

    try {
        await connection('arduinoDevices').where('id', id).delete();
        this.broadcast.emit('delete', {id: id});
        ackFn({status: "ok", id: id});
    }
    catch(err) {
        ackFn({status: "error", id: id});
    }
}

async function changeValue(data, ackFn) {
    const {id, value} = data; 
    try{
        await connection('arduinoDevices').
            where('id', id).
            update({
                value: value,
                valueChanged: 'true'
            });
        this.broadcast.emit('update', {id: id, value: value});
        ackFn({status: "ok", id: id});
    }
    catch(err) {
        ackFn({status: "error", id: id});
    }
}

module.exports = {
    connection(socket) {
        index().then(data => socket.emit('index', data));
        socket.on('create', create);
        socket.on('remove', remove);
        socket.on('changeValue', changeValue);
    }
};