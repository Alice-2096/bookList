import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

//define a schema for user
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now,
  },
});

//convert schema to a model -- (model_name, schema)
const User = model('User', userSchema);
//a model will allow us to generate a user according to the user schema
//model name usually begins with an uppercase letter

//modify the data right before it is saved to MongoDB
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export default User;
