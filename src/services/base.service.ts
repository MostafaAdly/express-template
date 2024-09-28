import { compare, hash } from 'bcrypt';

export default class BaseService {
  public static getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

  public static hashPassword = (password: string) => {
    return hash(password, 10);
  };

  public static comparePassword = (password: string, hashedPassword: string) => {
    return compare(password, hashedPassword);
  };
}
