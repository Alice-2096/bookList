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

//encrypt the user password right before it is saved to MongoDB
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//mongoose method is a function that has access to the current document/object instance
//check password
userSchema.method.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password); //bcrypt.compare(A,B) returns a boolean object
    if (match) {
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

//update the last-log-in stamp
//note: use function () instead of ()=> so that we can access 'this' object
userSchema.method.updateLoggedIn = function () {
  return this.model('User').findOneAndUpdate(
    { email: this.email },
    { lastLoggedIn: new Date() }
  );
};

export default User;