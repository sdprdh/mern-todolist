import bcrypt from 'bcrypt';

const generateHashedPassword = (password) => {
    return bcrypt.hash(password, 10);
};

export default generateHashedPassword;
