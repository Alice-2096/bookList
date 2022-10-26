import mongoose from 'mongoose';
//connnect to the MongoDB database using Mongoose -- comes with MongoDB drive

const connectToDb = () =>
  mongoose
    .connect(
      `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPwd}@cluster0.mvwqeoo.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('MongoDB connected...'));

//pass the connection string as the first argument, pass config to the second argument

export default connectToDb;
