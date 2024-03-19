import jwt from 'jsonwebtoken';

export const verifyUser = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(400).json({message: 'Login first'});

        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        req.userId = decodedToken.userId;

        const id = req.params.id;

        if(id !== decodedToken.userId) return res.status(403).json({message: 'Access denied'});
        next();
    } catch (error) {
        return res.status(500).json({error:error});
    }
}