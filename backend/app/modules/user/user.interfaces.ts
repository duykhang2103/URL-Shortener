export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {
  toJSON(): any;
}
