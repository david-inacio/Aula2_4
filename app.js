import express from 'express';
import mongoose from 'mongoose';

import { studentRoutes } from './routes/studentRoutes.js';

const app = express();
require('dotenv').config();

/*Conexao com o MongoDB*/
(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://' +
        process.env.USERDB +
        ':' +
        process.env.PWDDB +
        '@clusterigtimongodb.wtcxg.gcp.mongodb.net/grades?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log('Erro ao conectar no MongoDB: ' + error);
  }
})();

app.use(express.json());
app.use(studentRoutes);

app.listen(process.env.PORT, () => console.log('Servidor em execucao'));
// app.listen(3000, () => console.log('API Iniciada'));
