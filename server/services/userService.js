const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');

const createUser = async (userData) => {
  const { name, email, password } = userData;
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('A user with that email has already been registered!');
  }
  let passwordDigest = await authMiddleware.hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: passwordDigest,
  });
  return user;
};

const loginUser = async (loginData) => {
  const { email, password } = loginData;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  let passwordMatched = await authMiddleware.comparePassword(user.password, password);
  if (!passwordMatched) {
    throw new Error('Unauthorized');
  }
  let payload = {
    id: user._id,
    email: user.email,
  };
  let token = authMiddleware.createToken(payload);
  return token;
};

const updateUser = async (userId, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true }
  );
  if (!updatedUser) {
    throw new Error('Unable to update info');
  }
  return updatedUser;
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
};
