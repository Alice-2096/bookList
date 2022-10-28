import { isObjectIdOrHexString, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

//define a schema for user
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
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

//encrypt the user password right before it is saved to MongoDB
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//mongoose method is a function that has access to the current document
//check password
userSchema.methods.checkPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  if (match) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};

//update the last-log-in stamp
//note: use function () instead of ()=> so that we can access 'this' object
userSchema.methods.updateLoggedIn = function () {
  return this.model('User').findOneAndUpdate(
    { email: this.email },
    { lastLoggedIn: new Date() }
  );
};

//convert schema to a model -- (model_name, schema)
const User = model('User', userSchema);
//a model will allow us to generate a user according to the user schema
//model name usually begins with an uppercase letter

export default User;
