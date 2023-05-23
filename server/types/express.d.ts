import { Request } from "express";
import { UserDto } from "../dtos/user-dto";

export interface IRequestAuth extends Request {
  user?: string | JwtPayload;
}
