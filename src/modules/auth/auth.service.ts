import type { Response, Request } from "express";
import { ISignupBodyInputsDTO } from "./auth.dto";

class AuthService {
  constructor() {}
  /**
   *
   * @param req - Express.Request
   * @param res - Express.Response
   * @returns - Promise<Response>
   * @example ({ username, email, password }: ISignupBodyInputsDTO)
   * return {message:'Done',statusCode:201}
   */
  signup = async (req: Request, res: Response): Promise<Response> => {
    let { username, email, password }: ISignupBodyInputsDTO = req.body;
    console.log({ username, email, password });
    return res.status(201).json({ message: "Done", data: req.body });
  };
  login = (req: Request, res: Response): Response => {
    return res.json({ message: "Done", data: req.body });
  };
}

export default new AuthService();
