const connection = require('../connection');

module.exports = {
    async changeValue(request, response) {
        var {id, value} = request.body; 
        value === true ? value = 1 : value = 0;
        await connection('arduinoDevices').
            where('id', id).
            update({
                value: value,
                valueChanged: 'true'
            });

        return response.status(200).send();
    }
};