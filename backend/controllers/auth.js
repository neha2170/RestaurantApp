const User = require('../models/user');
const Role = require("../models/role")
const axios = require('axios');

// Register new user
exports.registerUser = async (req, res) => {
  const { username, password, name, email, phone_number, role } = req.body;
  try {
    // Create the user object
    const user = new User({ username, password, name, email, phone_number, role });
    
    // await user.save();

    const payload = {
      username,
      password,
      name,
      email,
      phone_number,
      role,
    };

    const response = await axios.post('https://test-api.achilyon.in/v1/rest-auth/register', payload);
    res.status(201).json({ message: 'User registered', data: response.data });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({ message: 'Duplicate value error: A user with this username or email already exists.' });
    } else {
      // Handle other errors
      res.status(500).json({ message: error.message });
    }
  }
  }


// Login
exports.loginUser = async (req, res) => {
  try {
      const { username, password } = req.body;
    const payload = {
      username,
      password,
    };

    const response = await axios.post('https://test-api.achilyon.in/v1/rest-auth/login', payload);
    const token = response.data.data.access_token;

    // Send a success response with the token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addRole = async (req, res) => {
    const { name} = req.body;
    try {
      const role = await Role.create({ name });
      
      res.json({ role });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getAllRoles = async (req, res) => {
    try {
      const role = await Role.find();
    
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
