import { UserEntity } from '../interfaces/User';
import { users } from '../models/userData';

export class UserService {
  static getAllUsers(): UserEntity[] {
    return users;
  }

  static getUserById(userId: string): UserEntity | undefined {
    const users = UserService.getAllUsers();
    const user = users.find(user => user.id === userId);
    return user;
  }

  static isUserExists(userId: string): boolean {
    const user = UserService.getUserById(userId);
    return Boolean(user);
  }
}
