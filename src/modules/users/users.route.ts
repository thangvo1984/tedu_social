import { Route } from "@core/interfaces";
import { Router } from "express";
import UserController from "./users.controller";

export default class UsersRoute implements Route {
  public path = "/api/users";
  public router = Router();

  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.userController.register); // POST: http://localhost:5000/api/users
  }
}
