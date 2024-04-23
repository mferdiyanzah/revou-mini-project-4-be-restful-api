import { type UserModel, type UserRegisterRequest } from "../models/user.model";
import { userRepository } from "../repositories";
import { hashPassword, verifyPassword } from "../utils/crypto";
import { generateToken } from "../utils/jwt";

const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  return await userRepository.findUserByEmail(email);
};

const register = async (user: UserRegisterRequest): Promise<string> => {
  const checkIfUserExists = await userRepository.findUserByEmail(user.email);
  if (checkIfUserExists !== null) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  const userId = await userRepository.register(user);

  const token = generateToken(userId, user.email);

  return token;
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
  findUserByEmail,
};

export default UserService;
