const express = require('express');
const router = express.Router();
const { registerUser, loginUser,addRole, getAllRoles } = require('../controllers/auth');


//add roles
router.post("/role", addRole)

//get role
router.get("/roles", getAllRoles)

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

module.exports = router;
