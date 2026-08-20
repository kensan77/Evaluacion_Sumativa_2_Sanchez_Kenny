const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Conectamos con el archivo database.js

// Definimos el molde del Usuario que pide la rúbrica
const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // No pueden haber dos correos iguales
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false // Desactiva campos automáticos que no necesitamos
});

module.exports = Usuario;