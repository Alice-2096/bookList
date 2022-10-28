import { Schema, model } from 'mongoose';
const { ObjectId } = Schema.Types;

const bookSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  user: {
    type: ObjectId,
    ref: 'User', //refer to another model
    required: true,
  },
  //cross-reference will allow us to dynamically populate this user field with data from the user collection in a single query
  finishedReading: { type: Boolean, default: false },
  createdAt: { type: Boolean, default: true },
});

const Book = model('Book', bookSchema);

export default Book;
