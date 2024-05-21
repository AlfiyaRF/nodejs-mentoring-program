import { Response } from 'express';

export const sendSuccessResponse = (res: Response, data: any, statusCode: number = 200) => {
  res
    .status(statusCode)
    .json({
      "data": data,
      "error": null
    });
};

export const sendErrorResponse = (res: Response, error: unknown, statusCode: number = 500) => {
  const errorMessage = typeof error === 'string'
    ? error
    : (error instanceof Error ? error.message : 'Unknown error');

  res
    .status(statusCode)
    .json({
      "data": null,
      "error": {
        "message": errorMessage
      }
    });
};