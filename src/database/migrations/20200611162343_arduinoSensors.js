
exports.up = function(knex) {
    return knex.schema.createTable('arduinoSensors', function(table) {
        table.increments('id');
        table.string('name').notNullable();
        table.decimal('value').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('arduinoSensors');
};
