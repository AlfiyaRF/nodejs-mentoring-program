import { UserEntity, UserRepositoryEntity } from '../interfaces/User';
import { users } from '../models/userData';

export class UserRepository implements UserRepositoryEntity {
  getAllUsers(): UserEntity[] {
    return users;
  }

  getUserById(id: string): UserEntity | undefined {
    const users = this.getAllUsers();
    const user = users.find(user => user.id === id);
    return user;
  }

  isUserExist(id: string): Boolean {
    const user = this.getUserById(id);
    return Boolean(user);
  }
}
