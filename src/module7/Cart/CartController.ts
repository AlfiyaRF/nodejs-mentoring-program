import { Request, Response } from 'express';
import { CartService } from './CartService';
import { sendSuccessResponse, sendErrorResponse }from '../common/helpers/responseHelpers';
import { productSchema } from '../Product/ProductSchema';
import { CustomError } from '../Error/ErrorInterface';

interface RequestWithLocals extends Request {
  locals: { [key: string]: any };
}

export class CartController {
  static async getCart(req: Request, res: Response): Promise<void> {
    try {
      const reqWithLocals = req as RequestWithLocals;
      const userId = reqWithLocals.locals.userId;
      const cart = await CartService.getOrCreateCart(userId);
      return sendSuccessResponse(res, cart);
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static async updateCart(req: Request, res: Response): Promise<void> {
    const { error: productError, value: product } = productSchema.validate(req.body);
    if (productError) {
      return sendErrorResponse(res, "Products are not valid", 400);
    }
    try {
      const reqWithLocals = req as RequestWithLocals;
      const { userId } = reqWithLocals.locals;
      const cart = await CartService.updateCart(userId, product);
      return sendSuccessResponse(res, cart);
    } catch (error) {
      if (error as CustomError) {
        return sendErrorResponse(res, (error as CustomError).message, 404);
      }
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static async deleteCart(req: Request, res: Response): Promise<void> {
    try {
      const reqWithLocals = req as RequestWithLocals;
      const { userId } = reqWithLocals.locals;
      const success = await CartService.deleteCart(userId);
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

  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const reqWithLocals = req as RequestWithLocals;
      const { userId } = reqWithLocals.locals;
      const order = await CartService.getOrder(userId);
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
