import { Express } from 'express';
import syncDb from '../mongodb.connect';



const appSetup = async (app: Express) => {

  try {
    await syncDb()
    app.listen( process.env.APP_PORT, () => {
      console.log(`Server started on port ${process.env.APP_PORT}`);
    });
  } catch(e) {
    console.log('probleme lors de la connexiona la base de donnees',e)
  }

};

export default appSetup;