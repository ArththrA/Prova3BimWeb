import express from "express";
import bcrypt from "bcryptjs";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'db.json');

const dados = fs.readFileSync(filePath, 'utf-8');
const usuarios = JSON.parse(dados || '[]');

router.post("/cadastro", async (req, res) => {

    const {nome, email, senha} = req.body;

    const usuarioExiste = usuarios.find((u) => u.email === email);

    if (usuarioExiste) {
        return res.status(400).json({ message: "Usuário já existe"});
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    usuarios.push({nome, email, senha:senhaHash});

    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));

    res.json({ message: "Usuário registrado com sucesso" });
});

export default router;