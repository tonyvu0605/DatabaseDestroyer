import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: 'No token provided',
      });
    }

    const decodedUserId = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedUserId.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
};

export default verifyToken;
