const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Coloque o middleware de arquivos estáticos no início
// Isso garante que os arquivos do front-end serão servidos corretamente
app.use(express.static('public'));

// O diretório de uploads no container (que será mapeado para o host)
const uploadDir = path.join(__dirname, 'upload');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('uploadedFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
  }

  console.log(`Arquivo "${req.file.originalname}" salvo em: ${req.file.path}`);

  res.status(200).json({ message: 'WAR atualizado. Por favor realizar novos testes.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
