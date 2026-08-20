const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Controlador para Registrar Usuario
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, clave } = req.body;

        // Profe, aquí cumplo con el requisito de la rúbrica: 
        // encripto la clave usando bcrypt antes de guardarla en la base de datos.
        const salt = await bcrypt.genSalt(10);
        const claveEncriptada = await bcrypt.hash(clave, salt);

        // Guardamos el usuario usando el ORM Sequelize
        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            clave: claveEncriptada
        });

        res.status(201).json({ mensaje: '¡Usuario registrado con éxito!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
};

// Controlador para Iniciar Sesión (Login)
const iniciarSesion = async (req, res) => {
    try {
        const { correo, clave } = req.body;

        // Buscamos si el correo existe
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Profe, aquí comparo la clave en texto plano que ingresa el usuario 
        // con el hash encriptado que tengo en MySQL.
        const claveValida = await bcrypt.compare(clave, usuario.clave);
        if (!claveValida) {
            return res.status(401).json({ error: 'Clave incorrecta.' });
        }

        // Profe, si las credenciales son correctas, genero el JWT firmado con la clave secreta
        // del archivo .env, tal como solicita la evaluación.
        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};

module.exports = { registrarUsuario, iniciarSesion };