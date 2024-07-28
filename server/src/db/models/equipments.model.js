const { Model, DataTypes, Sequelize } = require('sequelize');

const EQUIPMENT_TABLE = 'equipments';

class Equipment extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: EQUIPMENT_TABLE,
            modelName: 'Equipment',
            timestamps: true
        }
    }
} 

const EquipmentSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'name'
    },
    price: {
        allowNull: false,
        type: DataTypes.DOUBLE,
        field:'price'
    },
    characteristics:{ 
        allowNull:false,
        type: DataTypes.TEXT,
        field: 'characteristics'
    },
    quantity:{
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'quantity'
    }, 
    image_equipments:{
        allowNull: true,
        type: DataTypes.STRING,
        field: 'image_equipments'
    } 
}
  
module.exports = { Equipment, EquipmentSchema };