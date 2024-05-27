import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../User/UserService';
import { sendErrorResponse } from '../helpers/responseHelpers';

interface RequestWithLocals extends Request {
  locals: { [key: string]: any };
}

export const validateUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return sendErrorResponse(res, "You must be authorized user", 401);
  }
  const id = Array.isArray(userId) ? userId[0] : userId;
  const isUserExists = await UserService.isUserExist(id);
  if (!isUserExists) {
    return sendErrorResponse(res, "User is not authorized", 403);
  }
  const reqWithLocals = req as RequestWithLocals;
  if (!reqWithLocals.locals) {
    reqWithLocals.locals = {};
  }
  reqWithLocals.locals.userId = id;
  return next();
};
