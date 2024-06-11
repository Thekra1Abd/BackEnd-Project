// importing Schema
const User = require("../models/customerSchema");
const Admin = require("../models/AdminSchema");
var moment = require("moment")




const login_get = (req, res) => {
    res.render('login', { error: null }); // Pass the error variable with a default value of null
}

// 1 to log users and open sessions for them
const login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await Admin.findOne({ UserName: username });

        // Check if user exists
        if (!user) {
            return res.status(400).render('login', { error: 'Invalid username or password' });
        }

        // Compare passwords
        const isMatch = (password === user.Password); // Assuming passwords are stored as plain text for simplicity

        if (!isMatch) {
            return res.status(400).render('login', { error: 'Invalid username or password' });
        }

        // Store user data in session
        req.session.user = {
            _id: user._id,
            username: user.UserName,

        };
        console.log(req.session.user);

        res.redirect('/index'); // Redirect to dashboard after successful login
    } catch (error) {
        console.error(error);

    }
};



// 2 get request to get the register view
const register_get = (req, res) => {

    res.render('register', { error: null });
}


// 3 to Create a new admin object
const register_post = async (req, res) => {
    try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAdmin = new Admin({
            UserName: req.body.username,
            Email: req.body.email,
            Password: req.body.password // Store the password as is
        });

        // Save the admin to the database
        await newAdmin.save();

        // Redirect to login page on successful registration
        res.redirect('/login');
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).send('Error registering admin');
    }
};


 // 4 Destroy the session 
const logout_get = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            // Redirect to the login page or any other page
            console.log('session destroyed')
            res.redirect('/login');
        }
    });
};

// 5 to redirect to admins page
const admin_get = (req, res) => {
    Admin.find().then((result) => {
        res.render("admins", { arr: result });
    }).catch((err) => {
        console.log(err)
    });
}

// 6 get and view all user collection in the index
const user_index_get = (req, res) => {
    console.log("-----------------------------")
    //results= array of objects
    User.find().then((result) => {
        res.render("index", { arr: result, moment: moment });
    }).catch((err) => {
        console.log(err)
    });
}

// 7 edit data-> show the edit form
const user_edit_get = (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/edit", { obj: result, moment: moment })
        }).catch((err) => {
            console.log(err)
        });
}
// 8 view data
const user_view_get = (req, res) => {
    // result is object
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/view", { obj: result, moment: moment })
        }).catch((err) => {
            console.log(err)
        });
}

// 9 POST requests to search for users
const user_search_post = (req, res) => {
    const searchText = req.body.searchText.trim()
    User.find({ $or: [{ FirstName: searchText }, { LastName: searchText }] })
        .then((result) => {
            console.log(result)
            res.render("user/search", { arr: result, moment: moment })
        }).catch((err) => {
            console.log(err)
        })
}


const user_delete = (req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/index");
    }).catch((err) => {
        console.log(err)
    })
}

const user_update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.redirect("/index");
    }).catch((err) => {
        console.log(err)
    })
}

const user_add_get = (req, res) => {
    res.render("user/add")
}

// to add students
const user_post = (req, res) => {
    User.create(req.body).then(() => {
        res.redirect("/index")
    }).catch((err) => {
        console.log(err)
    })
}


//   to export code from this file
module.exports = {
    login_get,
    login_post, register_get, register_post, logout_get, admin_get, user_index_get, user_edit_get, user_view_get, user_search_post, user_delete, user_update, user_add_get, user_post
}

