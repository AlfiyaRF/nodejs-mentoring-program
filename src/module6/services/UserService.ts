import { UserEntity } from '../interfaces/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getAllUsers(): UserEntity[] {
    return this.userRepository.getAllUsers();
  }

  getUserById(id: string): UserEntity | undefined {
    return this.userRepository.getUserById(id);
  }

  isUserExist(id: string): Boolean {
    return this.userRepository.isUserExist(id);
  }
}
