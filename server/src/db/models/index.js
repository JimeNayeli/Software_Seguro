const { User, UserSchema } = require('./users.model');
const { Equipment, EquipmentSchema } = require('./equipments.model');
const { Schedule, ScheduleSchema } = require('./schedules.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Equipment.init(EquipmentSchema, Equipment.config(sequelize));
    Schedule.init(ScheduleSchema, Schedule.config(sequelize));
}

module.exports = setupModels;
