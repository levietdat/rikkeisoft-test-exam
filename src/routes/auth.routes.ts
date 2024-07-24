import { Router } from "express";
import { login, logout, getMe } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticateJWT, getMe);

export default router;
