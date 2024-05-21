import { Request, Response } from 'express';
import { CartService } from '../services/CartService';
import { sendSuccessResponse, sendErrorResponse }from '../common/helpers/responseHelpers';
import { productSchema } from '../schemas/product';
import { CustomError } from '../interfaces/Error';

const cartService = new CartService();

interface RequestWithLocals extends Request {
  locals: { [key: string]: any };
}

export class CartController {
  static getCart(req: Request, res: Response): void {
    try {
      const reqWithLocals = req as RequestWithLocals;
      const userId = reqWithLocals.locals.userId;
      const cart = cartService.getOrCreateCart(userId);
      return sendSuccessResponse(res, cart);
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static updateCart(req: Request, res: Response): void {
    const { error: productError, value: productValue } = productSchema.validate(req.body);
    if (productError) {
      return sendErrorResponse(res, "Products are not valid", 400);
    }
    try {
      const reqWithLocals = req as RequestWithLocals;
      const { userId } = reqWithLocals.locals;
      const cart = cartService.updateCart(userId, productValue);
      return sendSuccessResponse(res, cart);
    } catch (error) {
      if (error as CustomError) {
        return sendErrorResponse(res, (error as CustomError).message, 404);
      }
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static deleteCart(req: Request, res: Response): void {
    try {
      const reqWithLocals = req as RequestWithLocals;
      const userId = reqWithLocals.locals.userId;
      const success = cartService.deleteCart(userId);
      if (success) {
        return sendSuccessResponse(res, {success});
      }
      return sendErrorResponse(res, "Internal Server error");
    } catch (error) {
      if (error as CustomError) {
        return sendErrorResponse(res, (error as CustomError).message, 404);
      }
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static createOrder(req: Request, res: Response): void {
    try {
      const reqWithLocals = req as RequestWithLocals;
      const userId = reqWithLocals.locals.userId;
      const order = cartService.getOrder(userId);
      if (order) {
        return sendSuccessResponse(res, order);
      } else {
        return sendErrorResponse(res, "Cart is empty", 400);
      }
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }
}