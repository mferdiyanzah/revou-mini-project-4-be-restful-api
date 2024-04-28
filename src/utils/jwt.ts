import jwt from "jsonwebtoken";

const generateToken = (userId: number, email: string, isAdmin: boolean): string => {
  const payload = {
    userId, email, isAdmin
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY ?? "", { expiresIn: "1h", });
};

const decodeToken = (authHeader: string): jwt.JwtPayload => {
  const token = authHeader.split(" ")[1];
  if (token == null) {
    throw new Error("Authorization token is required");
  }
  return jwt.decode(token) as jwt.JwtPayload;
};

const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY ?? "");
};

export {
  generateToken, verifyToken, decodeToken
};
