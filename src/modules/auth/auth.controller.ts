import { TokenData } from "@modules/auth";
import { IUser } from "@modules/users";
import { NextFunction, Request, Response } from "express";
import LoginDto from "./auth.dto";
import AuthService from "./auth.service";

export default class AuthController {
  private authService = new AuthService();
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: LoginDto = req.body;
      const tokenData: TokenData = await this.authService.login(model);
      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
  public getCurrentLoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: IUser = await this.authService.getCurrentLoginUser(
        req.user.id
      );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
