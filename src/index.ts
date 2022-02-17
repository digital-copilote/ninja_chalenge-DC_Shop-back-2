import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

dotenv.config();

const app: Application = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  const getUsers = await prisma.users.findMany();
  res.status(200).json(getUsers);
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server ready at http://localhost:${process.env.PORT}`);
});
