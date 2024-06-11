const { verifyToken } = require('../utils/jwt');

exports.tryLoginRegister = (req, res, next) => {
    const token = req.cookies.token;

    try {
        if (token) {
            const verifiedToken = verifyToken(token, process.env.JWT_SECRET);
            if (verifiedToken) {
                return res.redirect('/');
            }
        }

        res.locals.user = null;
        next();
    } catch (error) {
        res.locals.user = null;
        next();
    }
};

exports.checkCookieToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        req.user = verifyToken(token, process.env.JWT_SECRET); // Attach decoded user data to request object
        res.locals.user = req.user; // Attach decoded user data to response object for accessing it in frontend templates

        next();
    } catch (error) {
        res.locals.user = null;
        return res.redirect('/login');
    }
};
