import { Router } from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  getSession,
  login,
  logout,
  register,
} from "../controllers/auth/index.js";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/session", protectedRoute, getSession);
router.post("/logout", protectedRoute, logout);

export default router;
