import express from 'express';
import cors from 'cors';
import medicamentosRouter from './routes/medicamentos.js';
import dosesRouter from './routes/doses.js';
import idososRouter from './routes/idosos.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/status', (req, res) => {
  res.json({ status: 'OK', sistema: 'CareSenior API', versao: '1.0.0' });
});

// Rotas
app.use('/medicamentos', medicamentosRouter);
app.use('/doses', dosesRouter);
app.use('/idosos', idososRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ status: 'erro', mensagem: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`CareSenior API rodando em http://localhost:${PORT}`);
});
