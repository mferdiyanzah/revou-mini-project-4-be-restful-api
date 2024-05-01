import { userRepository } from "../../src/repositories";
import { userService } from "../../src/services";
import { verifyPassword } from "../../src/utils/crypto";

jest.mock("../../src/repositories");
jest.mock("../../src/utils/crypto");

describe("User Service", () => {
  const userMock = {
    username: "user",
    email: "user@mail.com",
    password: "password",
    isAdmin: false,
  };
  describe("find user by email", () => {
    it("should return user", async () => {
      const email = "user@mail.com";
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(userMock);

      const user = await userService.findUserByEmail(email);

      expect(user).toBeDefined();
      expect(user?.email).toEqual(email);
    });
  });

  describe("register", () => {

    it("should return token", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);
      (userRepository.register as jest.Mock).mockResolvedValue(1);

      const token = await userService.register(userMock);

      expect(token).toBeDefined();
    });

    it("should throw error if user already exists", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(userMock);

      await expect(userService.register(userMock)).rejects.toThrow(
        "User already exists"
      );
    });
  });

  describe("login", () => {
    it("should return token", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(userMock);
      (verifyPassword as jest.Mock).mockResolvedValue(true);

      const token = await userService.login(userMock);

      expect(token).toBeDefined();
    });

    it("should throw error if user not found", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(userService.login(userMock)).rejects.toThrow(
        "Invalid credentials"
      );
    });

    it("should throw error if password not match", async () => {
      (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(userMock);
      (verifyPassword as jest.Mock).mockResolvedValue(false);

      await expect(userService.login(userMock)).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });
});