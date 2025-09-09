import { Router } from "express";
import userService from "./user.service";
import {
  authentication,
  authorization,
} from "../../middleware/authentication.middleware";
import { validation } from "../../middleware/validation.middleware";
import * as validators from "./user.validation";
import { TokenEnum } from "../../utils/security/token.security";
import {
  cloudFileUpload,
  fileValidation,
  StorageEnum,
} from "../../utils/multer/cloud.multer";
import { endpoint } from "./user.authorization";
const router = Router();
router.delete(
  "{/:userId}/freeze-account",
  authentication(),
  validation(validators.freezeAccount),
  userService.freezeAccount
);

router.delete(
  "/:userId",
  authorization(endpoint.hardDelete),
  validation(validators.hardDelete),
  userService.hardDeleteAccount
);

router.patch(
  "/:userId/restore-account",
  authorization(endpoint.restoreAccount),
  validation(validators.restoreAccount),
  userService.restoreAccount
);

router.get("/", authentication(), userService.profile);
router.patch("/profile-image", authentication(), userService.profileImage);
router.patch(
  "/profile-cover-image",
  authentication(),
  cloudFileUpload({
    validation: fileValidation.image,
    storageApproach: StorageEnum.disk,
  }).array("images", 2),
  userService.profileCoverImage
);
router.post(
  "/refresh-token",
  authentication(TokenEnum.refresh),
  userService.refreshToken
);
router.post(
  "/logout",
  authentication(),
  validation(validators.logout),
  userService.logout
);

export default router;
