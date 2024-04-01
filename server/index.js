const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Ruta para leer el contenido del archivo
app.get('/read-file', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'data.json'); // Ruta completa del archivo que deseas leer
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      res.status(500).send('Error al leer el archivo');
      return;
    }
    res.send(data); // Enviar el contenido del archivo como respuesta
  });
});

// Ruta para modificar el contenido del archivo
app.put('/modify-file', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'data.json'); // Ruta completa del archivo que deseas modificar
  const newData = req.body.data; // Nuevo contenido del archivo recibido desde la solicitud PUT
  fs.writeFile(filePath, JSON.stringify(newData), 'utf8', (err) => {
    if (err) {
      console.error('Error al modificar el archivo:', err);
      res.status(500).send('Error al modificar el archivo');
      return;
    }
    res.send('Archivo modificado exitosamente'); // Enviar respuesta de éxito
  });
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
