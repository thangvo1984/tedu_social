import { HttpException } from "@core/exceptions";
import { Logger } from "@core/utils";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = error.status || 500;
  const message: string = error.message || "Something wrong";
  console.log("error la==============", error);
  console.log(
    "het log error ======================================================="
  );

  Logger.error(`[Error] - ${status} - ${message}`);
  res.status(status).json({ message: message });
};

export default errorMiddleware;
