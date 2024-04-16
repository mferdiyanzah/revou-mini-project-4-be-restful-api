import jwt from 'jsonwebtoken';

const generateToken = (userId: number, email: string) => {
  const payload = { userId, email };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
}

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
}

export { generateToken, verifyToken };