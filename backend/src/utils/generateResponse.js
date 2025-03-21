const generateResponse = ({ res, code, message, data = null }) => {
    return res.status(code).json({
        message,
        data,
    });
};

export default generateResponse;
