import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const protectRoute = async (req, res, next) => {
    try {
        // Extract the token from the 'Authorization' header
        const authHeader = req.headers.authorization;
     
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized user' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       

        // Check if decodedToken is valid and has userId
        if (!decodedToken || !decodedToken.userId) {
            return res.status(401).json({ error: 'Unauthorized user' });
        }

        const user = await userModel.findById(decodedToken.userId);
        console.log(user);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized user' });
        }

        req.user = user; // Attach user to request
        next(); // Continue to the next middleware/route
    } catch (err) {
        console.error('Error in protectRoute:', err); // Log the error for debugging
        res.status(500).json({ error: err.message });
    }
};
