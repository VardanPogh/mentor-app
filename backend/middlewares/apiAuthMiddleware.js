const jwt = require('jsonwebtoken');

exports.checkAPIToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // Attach decoded user data to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
