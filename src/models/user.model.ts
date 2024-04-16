interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserRegisterRequest {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface UserLoginRequest {
  email: string;
  password: string;
}

export {
  UserModel,
  UserRegisterRequest,
  UserLoginRequest
}