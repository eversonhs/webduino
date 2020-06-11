
exports.up = function(knex) {
    return knex.schema.createTable('arduinoDevices', function(table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.integer('pin').notNullable();
        table.integer('value').notNullable();
        table.boolean('valueChanged').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('arduinoDevices');
};
