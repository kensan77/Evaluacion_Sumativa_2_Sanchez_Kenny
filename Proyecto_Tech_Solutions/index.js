const express = require('express');
const sequelize = require('./database');
const Usuario = require('./models/Usuario');
const Proyecto = require('./models/Proyecto');

// Importamos las rutas
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use(express.static('public'));

app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡El motor de Tech Solutions está funcionando perfecto!');
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('¡Éxito! Base de datos conectada y tablas sincronizadas.');
        app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000');
        });
    })
    .catch(error => {
        console.log('Error fatal al conectar con la base de datos:', error);
    });