const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated (for example, by checking if user data is stored in the session)
    if (req.session.user) {
        // If authenticated, allow the request to proceed to the next middleware or route handler
        next();
    } else {
        // If not authenticated, redirect the user to the login page or display an error message
        res.redirect('/login'); // Redirect to the login page
        // Or display an error message
        // res.status(401).send('Unauthorized');
    }
};

module.exports = isAuthenticated;