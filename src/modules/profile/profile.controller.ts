import { IUser } from "@modules/users";
import { Request, Response, NextFunction } from "express";
import AddEducationDto from "./dtos/add_education.dto";
import AddExperienceDto from "./dtos/add_experience.dto";
import CreateProfileDto from "./dtos/create_profile.dto";
import { IProfile } from "./profile.interface";
import ProfileService from "./profile.service";

class ProfileController {
  private profileService = new ProfileService();

  public getCurrentProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.id;
      const resultObj: Partial<IUser> =
        await this.profileService.getCurrentProfile(userId);
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public getAllProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resultObj: Partial<IUser>[] =
        await this.profileService.getAllProfiles();
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateProfileDto = req.body;
    const userId = req.user.id;
    try {
      const createUserData: IProfile = await this.profileService.createProfile(
        userId,
        userData
      );
      res.status(200).json(createUserData);
    } catch (error) {
      next(error);
    }
  };

  public getByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id;
    try {
      const updateUserData: Partial<IUser> =
        await this.profileService.getCurrentProfile(userId);
      res.status(200).json({ data: updateUserData, message: "Updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.id;
    try {
      const deletedProfile = await this.profileService.deleteProfile(userId);
      res.status(200).json(deletedProfile);
    } catch (error) {
      next(error);
    }
  };

  public createExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const experieneData: AddExperienceDto = req.body;
    const userId = req.user.id;
    try {
      const createExperienceData: IProfile =
        await this.profileService.addExperience(userId, experieneData);
      res.status(200).json(createExperienceData);
    } catch (error) {
      next(error);
    }
  };

  public deleteExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const expId = req.params.exp_id;
    try {
      const profile = await this.profileService.deleteExperience(
        req.user.id,
        expId
      );
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };

  public createEducation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const educationData: AddEducationDto = req.body;
    const userId = req.user.id;
    try {
      const createEducationData: IProfile =
        await this.profileService.addEducation(req.user.id, educationData);
      res.status(200).json(createEducationData);
    } catch (error) {
      next(error);
    }
  };

  public deleteEducation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const eduId = req.params.edu_id;
    try {
      const profile = await this.profileService.deleteEducation(
        req.user.id,
        eduId
      );
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileController;
