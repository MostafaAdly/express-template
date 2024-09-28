import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.get('/', () => {
  throw new Error('Hello Worlds');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Something broke!'); // Sends a generic error message
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
