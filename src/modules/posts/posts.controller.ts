import { HttpException } from "@core/exceptions";
import { Request, Response, NextFunction } from "express";
import { IPost } from ".";
import CreatePostDto from "./dtos/create_post_dto";
import PostService from "./posts.service";

export default class PostController {
  private postService = new PostService();
  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postObj: CreatePostDto = req.body;
      const createdPost: IPost = await this.postService.createPost(
        req.user.id,
        postObj
      );
      res.status(200).json(createdPost);
    } catch (error) {
      next(error);
    }
  };
  public updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postObj: CreatePostDto = req.body;
      const post = await this.postService.updatePost(
        req.params.post_id,
        postObj
      );
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  public getAllPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const posts: IPost[] = await this.postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  public getAllPaging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page: number = Number(req.params.page);
      const keyword = req.query.keyword || "";
      const paginationResult = await this.postService.getAllPaging(
        keyword.toString(),
        page
      );
      res.status(200).json(paginationResult);
    } catch (error) {
      next(error);
    }
  };
  public getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const post: IPost = await this.postService.getPostById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deletedPost = await this.postService.deletePost(
        req.user.id,
        req.params.id
      );
      res.status(200).json(deletedPost);
    } catch (error) {
      next(error);
    }
  };
}
