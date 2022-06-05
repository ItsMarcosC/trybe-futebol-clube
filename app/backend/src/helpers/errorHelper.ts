import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorCheck = (error: Error, req:Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
  return next();
};

export default errorCheck;
