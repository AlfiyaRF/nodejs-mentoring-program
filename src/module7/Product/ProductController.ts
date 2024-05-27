import { Request, Response } from 'express';
import { ProductService } from './ProductService';
import { sendSuccessResponse, sendErrorResponse }from '../common/helpers/responseHelpers';
import { newProductSchema } from './ProductSchema';

export class ProductController {
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      return sendSuccessResponse(res, products);
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static async createProduct(req: Request, res: Response): Promise<void> {
    const { error: productError, value: newProduct } = newProductSchema.validate(req.body);
    if (productError) {
      return sendErrorResponse(res, "Product object is not valid", 400);
    }
    try {
      const product = await ProductService.createProduct(newProduct);
      return sendSuccessResponse(res, {product});
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const product = await ProductService.getProductById(productId);
      if (!product) {
        return sendErrorResponse(res, "No product with such id", 404);
      }
      return sendSuccessResponse(res, product);
    } catch (error) {
      return sendErrorResponse(res, "Internal Server error");
    }
  }
}
