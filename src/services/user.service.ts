import { UserRepository } from "../repositories";
import { UserRegisterRequest } from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/crypto";
import { generateToken } from "../utils/jwt";

const UserService = () => {
  const userRepostiroty = UserRepository();

  const register = async (user: UserRegisterRequest) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    return userRepostiroty.register(user);
  }

  // const login = async (email: string, password: string) => {
  //   const user = await userRepostiroty.findByEmail(email);
  //   const isPasswordMatch = await verifyPassword(password, user.password);
  //   if (!isPasswordMatch || !user) {
  //     throw new Error('Invalid credentials');
  //   }

  //   const token = generateToken(user.id, user.email);
  //   return token;
  // }

  return {
    register,
    // login
  }
};

export default UserService;