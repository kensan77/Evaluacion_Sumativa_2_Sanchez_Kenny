const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Definimos el molde del Proyecto que pide la rúbrica
const Proyecto = sequelize.define('Proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY, // Guarda solo la fecha (Ej: 2023-10-25)
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsable: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creado_por: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'proyectos',
    timestamps: false
});

module.exports = Proyecto;