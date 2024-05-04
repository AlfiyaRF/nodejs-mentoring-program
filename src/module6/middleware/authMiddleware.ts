import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { headerSchema } from '../schemas/header';

export const validateUserId = (req: Request, res: Response, next: NextFunction): void => {
  const { error, value } = headerSchema.validate(req.headers);
  if (error) {
    res
      .status(403)
      .json({
        "data": null,
        "error": {
          "message": "You must be authorized user"
        }
      });
  } else {
    const userId = value['x-user-id'];
    const isUserExists = UserService.isUserExists(userId);
    if (!isUserExists) {
      res
        .status(401)
        .json({
          "data": null,
          "error": {
            "message": "User is not authorized"
          }
        });
    } else {
      next();
    }
  }
};
