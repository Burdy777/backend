import { Express, Request, Response } from 'express';
import quizzRouter from '../controller/quizz.controller';
import studentRouter from '../controller/student.controller';
import challengeRouter from '../controller/challenge.controller'

const routerSetup = (app: Express) =>
  app
  .get('/', async (req: Request, res: Response) => {
    res.send('Hello Express APIvantage!');
  })
  .use('/api/quizz', quizzRouter)
  .use('/api/student', studentRouter)
  .use('/api/challenges', challengeRouter)



export default routerSetup;