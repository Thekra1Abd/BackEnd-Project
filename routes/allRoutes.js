const express = require('express')
const router = express.Router()
const User = require("../models/customerSchema");
var moment = require("moment");
const isAuthenticated = require('../middleware/isAuthenticated');
const userController = require("../controllers/userController");


// Get request
router.get("/", userController.login_get);
router.get('/index', isAuthenticated, userController.user_index_get);
router.get('/login', userController.login_get);
router.post('/login', userController.login_post);
router.get('/logout', userController.logout_get);
router.get('/admins', userController.admin_get);

// Register route
router.get('/register', userController.register_get);
router.post('/register', userController.register_post);


router.get("/edit/:id", userController.user_edit_get);

// to view each item by its Id
router.get("/view/:id", userController.user_view_get);

// Search request
router.post("/search", userController.user_search_post);

// Delete request
router.delete("/edit/:id", userController.user_delete);

// Edit/PUT request
router.put("/edit/:id", userController.user_update);

module.exports = router