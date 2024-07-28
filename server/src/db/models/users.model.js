const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true
        }
    }
} 

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    first_name: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'first_name'
    },
    last_name: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'last_name'
    },
    email:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'email'
    },
    password_hash: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'password_hash'
    },
    password_salt:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'password_salt'
    },
    phone:{
        allowNull: true,
        type: DataTypes.STRING,
        field: 'phone'
    }, 
    image_equipments:{
        allowNull: true,
        type: DataTypes.STRING,
        field: 'image_equipments'
    } 
}
  
module.exports = { User, UserSchema };