import { z } from "zod";
import { generalFields } from "../../middleware/validation.middleware";

export const login = {
  body: z.strictObject({
    email: generalFields.email,
    password: generalFields.password,
    confirmPassword: generalFields.confirmPassword,
  }),
};

export const signup = {
  body: login.body
    .extend({
      username: generalFields.username,
      confirmPassword: generalFields.confirmPassword,
    })
    .superRefine((data, ctx) => {
      console.log({ data, ctx });

      if (data.confirmPassword !== data.password) {
        ctx.addIssue({
          code: "custom",
          path: ["confirm Password"],
          message: "password mismatch confirmPassword",
        });
      }
    }),
};
