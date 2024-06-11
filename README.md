
 
Backend Project Documentation
Project Overview
My project is a Student management system controlled by admins to access student data and manipulate them ( adding, editing, or deleting) their data.
This project is a backend service built with Node.js and Express. It provides functionality for user registration, login, logout, and user data management. The project utilizes MongoDB for data storage and EJS for rendering dynamic HTML templates.
Technologies Used
•	Node.js: JavaScript runtime for server-side programming.
•	Express: Web framework for Node.js, used for routing and middleware handling.
•	Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment, providing a straightforward schema-based solution to model your application data.
•	EJS: Embedded JavaScript templates, used for rendering dynamic HTML content on the server side.
•	express-session: Session management middleware for Express, used for maintaining user sessions.
•	method-override: Middleware to use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
•	moment: Library for parsing, validating, manipulating, and formatting dates.
•	livereload: Utility for reloading the browser when files change, used for development convenience.
•	nodemon: Utility that monitors for any changes in your source and automatically restarts your server during development.
Setup Instructions
Got it! Here is the updated installation section for your README file without the `.env` file, directly using the database connection string in the `app.js` file:

---

## Installation

Follow these steps to set up and run the student management project:

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [MongoDB](https://www.mongodb.com/) (version 4 or higher)

### Steps

1. **Clone the Repository**

   Clone the project repository to your local machine using the following command:

   git clone https://github.com/your-username/your-repository.git
   ```

   Replace `your-username` and `your-repository` with your actual GitHub username and repository name.

2. **Navigate to the Project Directory**

   Change your current directory to the project directory:

   cd your-repository
   ```

3. **Install Dependencies**

   Install the required Node.js packages by running:

   ```bash
   npm install
   ```

4. **Configure MongoDB Connection**

   The MongoDB connection string is already included in the `app.js` file. If you need to change it, update the connection string in the following section of the `app.js` file:

   mongoose.connect("your-mongodb-connection-string")
     .then(() => {
       app.listen(port, () => {
         console.log(`http://localhost:${port}/`)
       })
     })
     .catch((err) => { console.log(err) });
   ```

   Replace `your-mongodb-connection-string` with your actual MongoDB connection string.

5. **Start MongoDB**

   Make sure your MongoDB server is running. You can start MongoDB using the following command:

   mongod
 

   Alternatively, if you have MongoDB installed as a service, you can start it with:

   sudo service mongod start
   ```

6. **Run the Application**

   Start the application by running:

   npm start
   ```

   Your application should now be running on `http://localhost:3000` (or the specified port).

7. **Access the Application**

   Open your web browser and navigate to:

   http://localhost:3000
   ```

   You should see the login page of the student management system.



Code Structure
backend/
backend/
│
├── app.js                # Entry point for the application, handles server setup and middleware configuration.
├── routes/               # Contains route definitions for different endpoints.
│   ├── addUser.js        # Route for adding user data.
│   └── allRoutes.js      # Main route file for application routes, includes endpoints for login, logout, and user data management.
├── models/               # Mongoose models, define the structure for admin and customer data.
│   ├── AdminSchema.js    # Schema for admin data including UserName, Email, and Password.
│   └── customerSchema.js # Schema for customer data including        FirstName, LastName, Email, Telephone, Age, Country, and Gender.
├── controllers/          # Contains controller logic for handling route actions.
│   └── userController.js # Controller logic for user-related actions such as login, registration, and data management.
├── views/                # EJS templates, includes HTML templates for login and registration forms.
│   ├── login.ejs         # HTML template for the login form.
│   └── register.ejs      # HTML template for the registration form.
└── package.json          # Project metadata and dependencies.



API Documentation
Endpoints
•	/register:
o	Method: POST
o	Description: Endpoint for user registration. Handled in addUser.js.
•	/login:
o	Method: POST
o	Description: Endpoint for user login. Handled in allRoutes.js.
•	/logout:
o	Method: GET
o	Description: Endpoint for user logout. Handled in allRoutes.js.
•	/index:
o	Method: GET
o	Description: Endpoint to view user index. Handled in allRoutes.js.
•	/edit/:
o	Method: GET, PUT, DELETE
o	Description: Endpoints to edit and delete user data. Handled in allRoutes.js.
•	/view/:
o	Method: GET
o	Description: Endpoint to view user data. Handled in allRoutes.js.
•	/search:
o	Method: POST
o	Description: Endpoint to search for users. Handled in allRoutes.js.

Authentication/Authorization
User authentication is enforced using a middleware named isAuthenticated, which ensures that users are authenticated before accessing protected routes.






Database Schema
•	AdminSchema:
o	Description: Defines the structure for admin data.
o	Fields:
	UserName: Username of the admin.
	Email: Email address of the admin.
	Password: Password of the admin.
•	customerSchema:
o	Description: Defines the structure for customer data.
o	Fields:
	FirstName: First name of the customer.
	LastName: Last name of the customer.
	Email: Email address of the customer.
	Telephone: Telephone number of the customer.
	Age: Age of the customer.
	Country: Country of the customer.
	Gender: Gender of the customer.
app.js Explanation
•	Purpose: Entry point for the application, responsible for setting up the server and configuring middleware.
•	Setup:
o	Imports necessary modules such as Express, Mongoose, and session management.
o	Configures middleware such as body parser for parsing incoming request bodies and method-override for supporting PUT and DELETE requests.
o	Sets up session management middleware using express-session.
o	Connects to the MongoDB database using Mongoose.
•	Routing:
o	Defines route handlers for different endpoints by importing route files from the routes/ directory.
o	Mounts route handlers using app.use() to handle requests for specific paths.
•	Server Startup:
o	Starts the Express server, listening on a specified port.
o	Outputs a message indicating that the server has started successfully.




Controller Methods Explanation
Purpose: 
This controller handles user and admin authentication, registration, session management, and CRUD operations for user records in a student management system.
•	Usage:
o	Imported in route files (addUser.js, allRoutes.js) to handle specific route actions.
o	Each method corresponds to a specific route endpoint and performs the necessary actions such as database operations and response handling.
Endpoints
1.	login_get
2.	const login_get = (req, res) => {
3.	    res.render('login', { error: null }); // Pass the error variable with a default value of null
4.	}

•	Description: Renders the login view.
•	Method: GET
•	Path: /login
•	Response: Renders the 'login' page with a default error value of null.

2. login_post

const login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await Admin.findOne({ UserName: username });

        // Check if user exists
        if (!user) {
            return res.status(400).render('login', { error: 'Invalid username or password' });
        }

        const isMatch = (password === user.Password); // Assuming passwords are stored as plain text for simplicity

        if (!isMatch) {
            return res.status(400).render('login', { error: 'Invalid username or password' });
        }
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
•	Description: Authenticates a user and opens a session for them.
•	Method: POST
•	Path: /login
•	Request Body: { username: String, password: String }
•	Response:
o	If authentication is successful, stores user data in the session and redirects to the dashboard.
o	If authentication fails, renders the 'login' page with an error message.


3. register_get
const register_get = (req, res) => {

    res.render('register', { error: null });
}


•	Description: Renders the registration view.
•	Method: GET
•	Path: /register
•	Response: Renders the 'register' page with a default error value of null.
•	
4. register_post
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


•	Description: Creates a new admin object and registers it.
•	Method: POST
•	Path: /register
•	Request Body: { username: String, email: String, password: String }
•	Response:
o	If registration is successful, redirects to the login page.
o	If an error occurs, sends a 500 status code and an error message.

5. logout_get
const logout_get = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            // Redirect to the login page or any other page
            console.log('session destroyed')
            res.redirect('/login');
        }
    });};
•	Description: Destroys the current session and logs the user out.
•	Method: GET
•	Path: /logout
•	Response:
o	If session destruction is successful, redirects to the login page.
o	Logs an error if session destruction fails.

5.	admin_get
6.	const admin_get = (req, res) => {
7.	    Admin.find().then((result) => {
8.	        res.render("admins", { arr: result });
9.	    }).catch((err) => {
10.	        console.log(err)
11.	    });
12.	}

•	Description: Retrieves all admin records and renders the admin view.
•	Method: GET
•	Path: /admins
•	Response:
o	Renders the 'admins' page with an array of all admin records.
o	Logs an error if retrieval fails.


7. user_index_get
const user_index_get = (req, res) => {
    console.log("-----------------------------")
    //results= array of objects
    User.find().then((result) => {
        res.render("index", { arr: result, moment: moment });
    }).catch((err) => {
        console.log(err)
    });}

•	Description: Retrieves all user records and renders the index view.
•	Method: GET
•	Path: /index
•	Response:
o	Renders the 'index' page with an array of all user records and the moment library for date formatting.
o	Logs an error if retrieval fails.
8. user_edit_get
const user_edit_get = (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/edit", { obj: result, moment: moment })
        }).catch((err) => {
            console.log(err)
        });
}

•	Description: Retrieves a specific user record by ID and renders the edit form.
•	Method: GET
•	Path: /user/edit/:id
•	Response:
o	Renders the 'user/edit' page with the user object and the moment library.
o	Logs an error if retrieval fails.

9. user_view_get
const user_view_get = (req, res) => {
    // result is object
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/view", { obj: result, moment: moment })
        }).catch((err) => {
            console.log(err)
        });
}

•	Description: Retrieves a specific user record by ID and renders the view form.
•	Method: GET
•	Path: /user/view/:id
•	Response:
o	Renders the 'user/view' page with the user object and the moment library.
o	Logs an error if retrieval fails.



10. user_search_post
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

•	Description: Searches for users by first name or last name.
•	Method: POST
•	Path: /user/search
•	Request Body: { searchText: String }
•	Response:
o	Renders the 'user/search' page with an array of matching user records and the moment library.
o	Logs an error if the search fails.


11. user_delete
const user_delete = (req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/index");
    }).catch((err) => {
        console.log(err)
    })
}

•	Description: Deletes a user record by ID.
•	Method: DELETE
•	Path: /user/delete/:id
•	Response:
o	Redirects to the index page after successful deletion.
o	Logs an error if deletion fails.

13.	user_update
14.	const user_update = (req, res) => {
15.	    User.findByIdAndUpdate(req.params.id, req.body).then(() => {
16.	        res.redirect("/index");
17.	    }).catch((err) => {
18.	        console.log(err)
19.	    })
20.	}
•	Description: Updates a user record by ID.
•	Method: PUT
•	Path: /user/update/:id
•	Request Body: { fields to update }
•	Response:
o	Redirects to the index page after successful update.
o	Logs an error if the update fails.
13. user_add_get
const user_add_get = (req, res) => {
    res.render("user/add")
}

•	Description: Renders the form to add a new user.
•	Method: GET
•	Path: /user/add
•	Response: Renders the 'user/add' page.

14. user_post
const user_post = (req, res) => {
    User.create(req.body).then(() => {
        res.redirect("/index")
    }).catch((err) => {
        console.log(err)
    })
}
•	Description: Creates a new user record.
•	Method: POST
•	Path: /user/add
•	Request Body: { user data }
•	Response:
o	Redirects to the index page after successful creation.
o	Logs an error if creation fails.
Exported Module
•	The controller functions are exported as a module to be used in other parts of the application.
•	module.exports = {
•	    login_get,
•	    login_post, register_get, register_post, logout_get, admin_get, user_index_get, user_edit_get, user_view_get, user_search_post, user_delete, user_update, user_add_get, user_post
•	}
•	


