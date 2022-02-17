import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('coucou');
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server ready at http://localhost:${process.env.PORT}`);
});
