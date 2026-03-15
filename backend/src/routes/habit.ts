import { Router } from 'express';
import { 
  createHabit, 
  getHabits, 
  getHabitById, 
  updateHabit, 
  checkInHabit, 
  deleteHabit,
} from '../controllers/habitController.js';

const router: Router = Router();

router.post('/', createHabit);
router.get('/', getHabits);
router.get('/:id', getHabitById);
router.put('/:id', updateHabit);
router.post('/:id/checkin', checkInHabit);
router.delete('/:id', deleteHabit);

export default router;
