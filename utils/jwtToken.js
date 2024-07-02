const sendToken = (user, statusCode, res, message = '') => {
    const token = user.getJWTToken();

    res.status(statusCode).json({
        success: true,
        user,
        token,
        message,
    });
};

module.exports = sendToken;
