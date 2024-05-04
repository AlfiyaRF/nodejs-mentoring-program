import { Request, Response } from 'express';
import { CartService } from '../services/CartService';
import { headerSchema } from '../schemas/header';
import { productSchema } from '../schemas/product';
import { CustomError } from '../interfaces/Error';

export class CartController {
  static getCart(req: Request, res: Response): void {
    const { error, value } = headerSchema.validate(req.headers);
    if (error) {
      res
        .status(400)
        .json({
          "data": null,
          "error": {
            "message": `User id ${value['x-user-id']} is not valid`
          }
        });
    } else {
      try {
        const userId = value['x-user-id'];
        const cart = CartService.getCartByUserId(userId);
        res
          .status(200)
          .json({
            "data": cart,
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
  }

  static updateCart(req: Request, res: Response): void {
    const { error: headerError, value: headerValue } = headerSchema.validate(req.headers);
    const userId = headerValue['x-user-id'];
    if (headerError) {
      res
        .status(400)
        .json({
          "data": null,
          "error": {
            "message": `User id ${userId} is not valid`
          }
        });
    } else {
      const { error: productError, value: product } = productSchema.validate(req.body);
      if (productError) {
        res
          .status(400)
          .json({
            "data": null,
            "error": {
              "message": 'Products are not valid'
            }
          });
      } else {
        try {
          const cart = CartService.updateCart(userId, product);
          res
            .status(200)
            .json({
              "data": cart,
              "error": null
            });
        } catch (error) {
          if ((error as CustomError).status === 404) {
            res
            .status((error as CustomError).status)
            .json({
              "data": null,
              "error": {
                "message": (error as CustomError).message
              }
            });
          }
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
  }

  static deleteCart(req: Request, res: Response): void {
    const { error: headerError, value: headerValue } = headerSchema.validate(req.headers);
    const userId = headerValue['x-user-id'];
    if (headerError) {
      res
        .status(400)
        .json({
          "data": null,
          "error": {
            "message": `User id ${userId} is not valid`
          }
        });
    } else {
      try {
        const success = CartService.deleteCart(userId);
        if (success) {
          res
          .status(200)
          .json({
            "data": {
              "success": true
            },
            "error": null
          });
        } else {
          res
            .status(500)
            .json({
              "data": null,
              "error": {
                "message": "Internal Server error"
              }
            });
        }
      } catch (error) {
        if ((error as CustomError).status === 404) {
          res
          .status((error as CustomError).status)
          .json({
            "data": null,
            "error": {
              "message": (error as CustomError).message
            }
          });
        }
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

  static createOrder(req: Request, res: Response): void {
    const { error: headerError, value: headerValue } = headerSchema.validate(req.headers);
    const userId = headerValue['x-user-id'];
    if (headerError) {
      res
        .status(400)
        .json({
          "data": null,
          "error": {
            "message": `User id ${userId} is not valid`
          }
        });
    } else {
      try {
        const order = CartService.getOrder(userId);
        if (order) {
          res
            .status(200)
            .json({
              "data": order,
              "error": null
            });
        } else {
          res
            .status(400)
            .json({
              "data": null,
              "error": {
                "message": "Cart is empty"
              }
            });
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
}