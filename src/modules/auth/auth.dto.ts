import * as validators from "./auth.validation";
import { z } from "zod";
export type ISignupBodyInputsDTO = z.infer<typeof validators.signup.body>;
export type IConfirmEmailBodyInputsDTto = z.infer<
  typeof validators.confirmEmail.body
>;
export type ILoginBodyInputsDTto = z.infer<typeof validators.login.body>;
export type IForgotCodeBodyInputsDTto = z.infer<
  typeof validators.sendForgotPasswordCode.body
>;
export type IVerifyForgotPasswordBodyInputsDTto = z.infer<
  typeof validators.verifyForgotPassword.body
>;
export type IResetForgotPasswordBodyInputsDTto = z.infer<
  typeof validators.ResetForgotPassword.body
>;
export type IGmail = z.infer<typeof validators.signupWithGmail.body>;
