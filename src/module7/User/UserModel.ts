import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './UserInterface';

const UserSchema: Schema = new Schema<UserEntity>({
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  }
});

const User = model<UserEntity>('User', UserSchema);

export default User;
