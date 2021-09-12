import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export default class RegisterDto {
  @IsNotEmpty()
  public first_name: string | undefined;
  @IsNotEmpty()
  public last_name: string | undefined;
  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;
  @IsNotEmpty()
  @MinLength(8, { message: "Password is too short" })
  public password: string | undefined;
}
