import { connect } from 'mongoose';

export default async function syncDb(): Promise<void> {
  const uri = "mongodb+srv://burdy:Incroyable123@cluster-quizz.ynfyfaa.mongodb.net/quizz_db?retryWrites=true&w=majority";
  const mongoDBURI = process.env.MONGODB_URI ?? uri;

  try {
    await connect(mongoDBURI);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(e) {
    console.log(e)

  }
}

