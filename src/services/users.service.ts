import { User } from 'database/entities/user.entity';
import { DeepPartial } from 'typeorm';

export type IUserIdentityObject = ReturnType<typeof UsersService.getUserIdentityObject>;

export default class UsersService {
  public static getUserIdentityObject = (user: User) => {
    return {
      id: user.id,
    };
  };

  public static getUsers = async () => {
    return (await User.find()).map((user) => user.toObject());
  };

  public static getUserByEmail = async (email: string) => {
    return (await User.findOne({ where: { email } }))?.toObject();
  };

  public static createUser = async (user: DeepPartial<User>) => {
    return (await User.create(user).save()).toObject();
  };

  public static getUserById = async (id: string) => {
    return (await User.findOne({ where: { id } }))?.toObject();
  };
}
