import { Route } from "@core/interfaces";
import { Router } from "express";
import RegisterDto from "./dtos/register.dto";
import UserController from "./users.controller";
import { validationMiddleware } from "@core/middleware";

export default class UsersRoute implements Route {
  public path = "/api/users";

  public router = Router();

  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(RegisterDto, true),
      this.userController.register
    ); // POST: http://localhost:5000/api/users
  }
}
