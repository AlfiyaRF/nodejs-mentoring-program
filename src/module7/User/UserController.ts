import { Request, Response } from 'express';
import { UserService } from './UserService';
import { userNameSchema, userIdSchema } from './UserSchema';
import { sendSuccessResponse, sendErrorResponse }from '../common/helpers/responseHelpers';

export class UserController {
  static async createUser(req: Request, res: Response): Promise<void> {
    const { error: userError, value: userName } = userNameSchema.validate(req.body);
    if (userError) {
      return sendErrorResponse(res, "User name is not valid", 400);
    }
    try {
      const { name } = userName;
      const user = await UserService.createUser(name);
      return sendSuccessResponse(res, {user});
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      return sendSuccessResponse(res, {users});
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const { error: userError, value: userId } = userIdSchema.validate(req.body);
    if (userError) {
      return sendErrorResponse(res, "User id is not valid", 400);
    }
    try {
      const { id } = userId;
      const success = await UserService.deleteUser(id);
      return sendSuccessResponse(res, {success});
    } catch (err) {
      return sendErrorResponse(res, "Internal Server error");
    }
  };
}
