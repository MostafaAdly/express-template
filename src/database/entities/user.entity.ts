import { compare } from 'bcrypt';
import { Column, Entity } from 'typeorm';

import { BaseModel } from './base.entity';

@Entity()
export class User extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  hashed_password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'boolean', default: false })
  isSuperuser: boolean;

  public comparePassword = async (password: string): Promise<boolean> => {
    return compare(password, this.hashed_password);
  };

  public toObject = (): User => {
    const user = { ...this };
    type OptionalPassword = Omit<User, 'hashed_password'> & { hashed_password?: string };
    delete (user as OptionalPassword).hashed_password;
    return user as User;
  };

  public getFullName = (): string => `${this.first_name} ${this.last_name}`;
}
