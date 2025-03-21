import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import generateHashedPassword from '../utils/generateHashedPassword.js';
import generateResponse from '../utils/generateResponse.js';
import generateToken from '../utils/generateToken.js';

export const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return generateResponse({ res, code: 400, message: 'All fields required' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return generateResponse({ res, code: 409, message: 'User already exist' });
        }

        const hashedPassword = await generateHashedPassword(password);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return generateResponse({
            res,
            code: 201,
            message: 'Register successfully',
            data: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return generateResponse({ res, code: 500, message: error.message });
    }
};

export const loginController = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return generateResponse({ res, code: 400, message: 'All fields required' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return generateResponse({ res, code: 404, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return generateResponse({ res, code: 400, message: 'Wrong email or password' });
        }

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return generateResponse({
            res,
            code: 200,
            message: 'Login successfully',
            data: {
                username: user.username,
                email: user.email,
                token
            },
        });
    } catch (error) {
        return generateResponse({ res, code: 500, message: error.message });
    }
};

export const logoutController = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });

    return generateResponse({
        res,
        code: 200,
        message: 'Logout successfully',
    });
};

export const getUserController = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return generateResponse({ res, code: 400, message: 'id is required' });
    }

    try {
        const user = await User.findById(id).select('-__v -password').lean();

        if (!user) {
            return generateResponse({ res, code: 404, message: 'User not found' });
        }

        return generateResponse({ res, code: 200, message: 'success', data: user });
    } catch (error) {
        return generateResponse({ res, code: 500, message: error.message });
    }
};
