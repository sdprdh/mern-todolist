import jwt from 'jsonwebtoken';
import generateResponse from '../utils/generateResponse.js';

const protectAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return generateResponse({
            res,
            code: 401,
            message: 'Not authorized',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return generateResponse({
            res,
            code: 401,
            message: 'Invalid token',
        });
    }
};

export default protectAuth;
