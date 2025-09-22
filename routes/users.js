import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rotas = Router();
const filePath = path.join(__dirname, '..', 'db.json');

rotas.put('/:id', (req, res) => {
  const dados = fs.readFileSync(filePath, 'utf-8');
  const usuarios = JSON.parse(dados || '[]');
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  usuarios[index] = { ...usuarios[index], ...req.body };

  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));

  res.json(usuarios[index]);
});

rotas.delete('/:id', (req, res) => {
  const dados = fs.readFileSync(filePath, 'utf-8');
  let usuarios = JSON.parse(dados || '[]');

  const id = parseInt(req.params.id);

  usuarios = usuarios.filter((a) => a.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
  res.status(204).send();
})


export default rotas;