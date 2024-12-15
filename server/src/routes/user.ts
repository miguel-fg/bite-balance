import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user";
import { authGuard } from "../middleware/authGuard";

const router = Router();

router.get("/me", authGuard, getProfile);
router.patch("/me", authGuard, updateProfile);

export default router;
