const connection = require('../connection');
const { request } = require('express');

module.exports = {

    async create(request, response) {

        const data = request.body;
        const name = data["device-name"];
        const type = data["device-type"];
        const pin = data["device-pin"];
        const value = 0;
        const valueChanged = 'true';

        await connection('arduinoDevices').
        insert({
            name,
            type,
            pin,
            value,
            valueChanged
        }).catch(() => alert(`Error: Device not created.`));
        ;

        return response.sendStatus(201);
    },

    async delete(request, response) {
        const id = request.params.id;
        
        await connection('arduinoDevices').where('id', id).delete();

        return response.sendStatus(200);
    },

    async indexDevices(request, response) {
        let devices = await connection('arduinoDevices').select('*');
        
        return response.json(devices);
    }
    
};