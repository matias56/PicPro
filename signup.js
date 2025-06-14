import dotenv from 'dotenv';
dotenv.config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendWelcomeEmail = require('./emailService');

const app = express();
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, rellene las formas solicitadas.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await pool.query(

            [email, passwordHash]
        );

        await sendWelcomeEmail(newUser.rows[0].email, newUser.rows[0].username);

        res.status(201).json({ message: '¡Usuario creado exitosamente!' });
    } catch (error) {
        console.error(error);
        if (error.code === '23505') { // Unique constraint violation
            return res.status(409).json({ message: 'Mail y contraseña ya existen.' });
        }
        res.status(500).json({ message: 'Error en el server.' });
    }
});