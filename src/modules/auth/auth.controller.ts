import { Router } from "express";
import AuthService from "./auth.service";
import * as validators from "./auth.validation";
import { validation } from "../../middleware/validation.middleware";
const router: Router = Router();
router.post("/signup", validation(validators.signup), AuthService.signup);
router.post("/login", AuthService.login);

export default router;
