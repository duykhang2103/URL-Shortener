import User from "./user.model";
import { ICreateUser, IUser } from "./user.interfaces";

const create = async (data: ICreateUser): Promise<IUser> => {
  return User.create(data);
};

const find = async (): Promise<IUser[]> => {
  return User.find();
};

const findOne = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const update = async (id: string, data: ICreateUser): Promise<IUser> => {
  const user = await User.findOneAndUpdate({ _id: id }, data, { new: true });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export default {
  create,
  find,
  findOne,
  update,
};
