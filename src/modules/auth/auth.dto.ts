import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export default class LoginDto {
  @IsNotEmpty()
  public email: string | undefined;
  @IsNotEmpty()
  @MinLength(8, { message: "Password is too short" })
  public password: string | undefined;
}
