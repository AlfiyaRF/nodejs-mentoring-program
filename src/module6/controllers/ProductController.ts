import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { sendSuccessResponse, sendErrorResponse }from './helpers';
import { productIdSchema } from '../schemas/product';

export class ProductController {
  static getAllProducts(req: Request, res: Response): void {
    try {
      const products = ProductService.getAllProducts();
      sendSuccessResponse(res, products);
    } catch (error) {
      sendErrorResponse(res, "Internal Server error");
    }
  }

  static getProductById(req: Request, res: Response): void {
    try {
      const { error, value } = productIdSchema.validate(req.params.productId);
      if (error) {
        return sendErrorResponse(res, `Product id ${value} is not valid`, 400);
      }
      const productId = value;
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
