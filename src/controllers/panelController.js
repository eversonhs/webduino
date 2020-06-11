const connection = require('../connection');

module.exports = {

    async create(request, response) {
        const {name, type, pin, value} = request.body;
        const valueChanged = 'true';

        await connection('arduinoDevices').
        insert({
            name,
            type,
            pin,
            value,
            valueChanged
        });

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