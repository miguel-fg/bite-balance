import { Router } from "express";
import {
  redirectGoogle,
  validateGoogleAuthCode,
  redirectGitHub,
  validateGitHubAuthCode,
} from "src/controllers/oauth";

const router = Router();

router.get("/google", redirectGoogle);
router.get("/google/callback", validateGoogleAuthCode);

router.get("/github", redirectGitHub);
router.get("/github/callback", validateGitHubAuthCode);

export default router;
