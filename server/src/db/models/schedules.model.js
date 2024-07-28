const { Model, DataTypes, Sequelize } = require('sequelize');

const SCHEDULE_TABLE = 'schedules';

class Schedule extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: SCHEDULE_TABLE,
            modelName: 'Schedule',
            timestamps: true
        }
    }
} 

const ScheduleSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    start_time: {
        allowNull: false,
        type: DataTypes.TIME,
        field:'start_time'
    },
    end_time: {
        allowNull: false,
        type: DataTypes.TIME,
        field:'end_time'
    },
    date:{ 
        allowNull:false,
        type: DataTypes.DATE,
        field: 'date'
    },
    availability:{ 
        allowNull:false,
        type: DataTypes.BOOLEAN,
        field: 'availability'
    }

}
  
module.exports = { Schedule, ScheduleSchema };