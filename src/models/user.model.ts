interface UserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
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

interface UserFindByEmailRequest {
  email: string;
  username: string;
}

export type {
  UserModel,
  UserRegisterRequest,
  UserLoginRequest,
  UserFindByEmailRequest,
};
