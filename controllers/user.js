import User from '../models/user';

//Sign-up: create a new user
export const signUp = async ({ name, email, password }) => {
  try {
    await User.create({ name, email, password });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
};

//fetch, authentication, and update the user based on log-In credentials
export const logIn = async ({ name, password }) => {
  try {
    const user = await User.findOne(name);
    await user.checkPassword(password);
    await user.updateLoggedIn();
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
  //promise will fail if any one of the try-conditions fails
};
