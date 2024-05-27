import { UserRepository } from './UserRepository';
import { UserEntity } from './UserInterface';

export class UserService {
  static async createUser(name: string): Promise<UserEntity> {
    return UserRepository.createUser(name);
  }

  static async getAllUsers(): Promise<UserEntity[]> {
    return UserRepository.getAllUsers();
  }

  static async deleteUser(id: string): Promise<boolean> {
    return UserRepository.deleteUser(id);
  }

  static async isUserExist(id: string): Promise<boolean> {
    return UserRepository.isUserExist(id);
  }
}
