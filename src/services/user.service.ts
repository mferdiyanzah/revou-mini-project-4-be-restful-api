import { type UserRegisterRequest } from "../models/user.model";
import { userRepository } from "../repositories";
import { hashPassword, verifyPassword } from "../utils/crypto";
import { generateToken } from "../utils/jwt";



const register = async (user: UserRegisterRequest): Promise<number> => {
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  return await userRepository.register(user);
};

const login = async (email: string, password: string): Promise<string> => {
  const user = await userRepository.findUserByEmail(email);
  if (user == null) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch = await verifyPassword(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id, user.email);
  return token;
};

const UserService = {
  register,
  login,
};

export default UserService;
