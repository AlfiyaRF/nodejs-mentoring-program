export interface UserEntity {
  id: string; // uuid
};

export interface UserRepositoryEntity {
  getAllUsers(): UserEntity[];
  getUserById(id: string): UserEntity | undefined;
  isUserExist(id: string): Boolean;
}
