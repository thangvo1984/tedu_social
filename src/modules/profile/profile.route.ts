import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middleware";
import { Router } from "express";
import CreateProfileDto from "./dtos/create_profile.dto";
import ProfileController from "./profile.controller";

class ProfileRoute implements Route {
  public path = "/api/v1/profile";
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      this.path + "/user/:id",
      this.profileController.getByUserId
    );
    this.router.get(
      this.path + "/me",
      authMiddleware,
      this.profileController.getCurrentProfile
    );
    this.router.get(
      this.path,
      authMiddleware,
      this.profileController.getAllProfiles
    );
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreateProfileDto, true),
      this.profileController.createProfile
    );
    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.profileController.deleteProfile
    );
    this.router.put(
      this.path + "/experience",
      authMiddleware,
      this.profileController.createExperience
    );
    this.router.delete(
      this.path + "/experience/:exp_id",
      authMiddleware,
      this.profileController.deleteExperience
    );
    this.router.put(
      this.path + "/education",
      authMiddleware,
      this.profileController.createEducation
    );
    this.router.delete(
      this.path + "/education/:edu_id",
      authMiddleware,
      this.profileController.deleteEducation
    );
  }
}

export default ProfileRoute;
