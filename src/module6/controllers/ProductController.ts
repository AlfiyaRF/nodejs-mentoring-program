import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { sendSuccessResponse, sendErrorResponse } from '../common/helpers/responseHelpers';
import { productIdSchema } from '../schemas/product';

export class ProductController {
  static getAllProducts(req: Request, res: Response): void {
    try {
      const products = ProductService.getAllProducts();
      return sendSuccessResponse(res, products);
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static getProductById(req: Request, res: Response): void {
    try {
      const { productId } = req.params;
      const product = ProductService.getProductById(productId);
      if (!product) {
        return sendErrorResponse(res, "No product with such id", 404);
      }
      return sendSuccessResponse(res, product);
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }
}
