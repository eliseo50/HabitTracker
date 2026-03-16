import { Router } from "express";
import {
  register,
  login,
  getSession,
  logout,
} from "../controllers/authController.js";
import { protectedRoute } from "../middleware/protected.js";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/session", protectedRoute, getSession);
router.post("/logout", protectedRoute, logout);

export default router;
