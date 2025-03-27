import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    // First name, ObjectId, 
    payload = {
        first_name: user.first_name,
        id: user._id,
        email: user.email,
    };
    const token = jwt.sign((payload, process.env.JWT_SECRET,{ expiresIn: '1d' }))
    return token;
}

export default generateToken;