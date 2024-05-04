import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { productIdSchema } from '../schemas/product';

export class ProductController {
  static getAllProducts(req: Request, res: Response): void {
    try {
      const products = ProductService.getAllProducts();
      res
        .status(200)
        .json({
          "data": products,
          "error": null
        });
    } catch (error) {
      res
        .status(500)
        .json({
          "data": null,
          "error": {
            "message": "Internal Server error"
          }
        });
    }
  }

  static getProductById(req: Request, res: Response): void {
    try {
      const { error, value } = productIdSchema.validate(req.params.productId);
      if (error) {
        res
          .status(400)
          .json({
            "data": null,
            "error": {
              "message": `Product id ${value} is not valid`
            }
          });
      } else {
        const productId = value;
        const product = ProductService.getProductById(productId);
        if (!product) {
          res
            .status(404)
            .json({
              "data": null,
              "error": {
                "message": "No product with such id"
              }
            });
        } else {
          res
            .status(200)
            .json({
              "data": product,
              "error": null
            });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({
          "data": null,
          "error": {
            "message": "Internal Server error"
          }
        });
    }
  }
}
