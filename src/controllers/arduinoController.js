const connection = require('../connection');

module.exports = {

    async index(request, response) {
        
        let device = await connection('arduinoDevices').
            where('valueChanged', 'true').
            select('id', 'pin', 'value').
            first();

        if(device !== undefined) {
            await connection('arduinoDevices').
                where('id', device.id).
                update('valueChanged', 'false');
        }
        else {
            device = {
                "error" : "ntFnd"
            }
        }
        
        return response.json(device);
    },

    async receive(request, response) {
        let sensor = request.body;

        await connection('arduinoSensors').
            where('id', sensor.id).
            update('value', sensor.value);
            
        return response.sendStatus(200);      
    }
};