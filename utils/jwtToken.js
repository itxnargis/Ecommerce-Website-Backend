const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken(); // Assumes user model has this method

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.cookie('token', token, options);

    // Only send token, let the calling function send additional response if needed
};
