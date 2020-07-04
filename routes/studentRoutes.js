import express from 'express';
import { studentModel } from '../models/studentModel.js';

const app = express();

//validação da rota
// app.get('/student', async (req, res) => {
//   res.send({ result: 'validado!' });
// });

//retrielve get
app.get('/student', async (req, res) => {
  const student = await studentModel.find({});
  try {
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

//create
app.post('/student', async (req, res) => {
  const student = new studentModel(req.body);
  try {
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete
app.delete('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndDelete({ _id: req.params.id });
    if (!student) {
      res.status(404).send('Documento não encontrado');
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { app as studentRoutes };
