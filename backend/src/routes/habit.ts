import { Router } from "express";
import {
  checkInHabit,
  createHabit,
  deleteHabit,
  getHabitById,
  getHabits,
  updateHabit,
} from "@/controllers/habit/index.js";
import { isOwner } from "@/middleware/isOwner.js";

const router: Router = Router();

router.post("/", createHabit);
router.get("/", getHabits);
router.get("/:id", isOwner, getHabitById);
router.patch("/:id", isOwner, updateHabit);
router.post("/:id/checkin", isOwner, checkInHabit);
router.delete("/:id", isOwner, deleteHabit);

export default router;
