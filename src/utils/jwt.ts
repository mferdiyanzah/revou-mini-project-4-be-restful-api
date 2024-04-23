import jwt from "jsonwebtoken";

const generateToken = (userId: number, email: string): string => {
  const payload = { userId, email };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY ?? "", { expiresIn: "1h", });
};

const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY ?? "");
};

export { generateToken, verifyToken };
