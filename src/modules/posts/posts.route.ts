import { Route } from "@core/interfaces";
import { authMiddleware } from "@core/middleware";
import { Router } from "express";
import PostController from "./posts.controller";

export default class PostRoute implements Route {
  public path = "/api/v1/posts";
  public router = Router();
  public postController = new PostController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, authMiddleware, this.postController.createPost);
    this.router.put(
      this.path + "/:post_id",
      authMiddleware,
      this.postController.updatePost
    );
    this.router.get(this.path, authMiddleware, this.postController.getAllPost);
    this.router.get(
      this.path + "/:id",
      authMiddleware,
      this.postController.getPostById
    );
    this.router.get(
      this.path + "/paging/:page",
      this.postController.getAllPaging
    );
    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.postController.deletePost
    );
  }
}
