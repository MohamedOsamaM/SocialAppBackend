import * as validators from "./auth.validation";
import { z } from "zod";
export type ISignupBodyInputsDTO = z.infer<typeof validators.signup.body>;
