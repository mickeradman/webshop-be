import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
const app = express();
const database = mongoose.connection;
const port = parseInt(process.env.PORT ?? '3000');

app.use(express.json());
app.use('/api/fetchproducts', router);

mongoose.connect(process.env.DB_URL ?? 'undefined');

database.on('open', () => {
  console.log('Ansluten till databasen.');
});
database.on('error', (err) => {
  console.error('Ett fel inträffade vid anslutning till databasen: ', err);
});

app.use((req: Request, res: Response) => {
  res.status(404).send({ error: 'Adressen kan inte hittas.' });
});

interface CustomError extends Error {
  status?: number;
  body?: any;
}

app.use(
  (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res
        .status(400)
        .json({ success: false, message: 'Felaktig JSON-syntax.' });
    } else {
      res.status(500).json({ success: false, message: 'Något gick fel.' });
    }
  }
);

app.listen(port, () => {
  console.log(`Servern körs på port ${port}.`);
});

export default database;
