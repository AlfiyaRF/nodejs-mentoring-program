import { v4 as uuidv4 } from 'uuid';
import User from './UserModel';
import { UserEntity } from './UserInterface';

export class UserRepository {
  static async createUser(name: string): Promise<UserEntity> {
    const newUser = new User({
      name,
      id: uuidv4()
    });
    const response = await newUser.save();
    const createdUser = {
      id: response.id,
      name: response.name
    };
    return createdUser;
  }

  static async getAllUsers(): Promise<UserEntity[]> {
    const response = await User.find();
    const users = response.map(u => ({
      id: u.id,
      name: u.name
    }));
    return users;
  };

  static async deleteUser(id: string): Promise<boolean> {
    const response = await User.deleteOne({id});
    const { acknowledged, deletedCount } = response;
    if (acknowledged && deletedCount === 1) {
      return true;
    }
    return false;
  }

  static async isUserExist(id: string): Promise<boolean> {
    const response = await User.findOne({id});
    return Boolean(response);
  }
}
