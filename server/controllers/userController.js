const userService = require('../services/userService');

const Register = async (req, res) => {
  try {
    const DTO = { ...req.body };
    const user = await userService.registerUser(DTO);
    res.status(201).json({ user });
  } catch (error) {
    if (error.message === 'A user with that email has already been registered!') {
      res.status(409).send(error.message);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
};

const Login = async (req, res) => {
  try {
    const DTO = { ...req.body };
    const token = await userService.loginUser(DTO);
    res.status(200).json({ token });
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).send(error.message);
    } else if (error.message === 'Unauthorized') {
      res.status(401).send(error.message);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
};

const UpdateUser = async (req, res) => {
  try {
    const userId = res.locals.payload.id;
    const DTO = { ...req.body };
    await userService.updateUser(userId, DTO);
    res.status(204).send('User info updated successfully');
  } catch (error) {
    if (error.message === 'Unable to update info') {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = {
  Login,
  Register,
  UpdateUser,
};
