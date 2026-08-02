import { Router } from 'express';

import {
  completeTask,
  createTask,
  deleteTask,
  getTask,
  getTaskStats,
  getTasks,
  updateTask,
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import {
  createTaskValidator,
  listTaskValidator,
  taskIdValidator,
  updateTaskValidator,
} from '../validators/task.validator.js';

const router = Router();

router.use(protect);

router
  .route('/')
  .post(createTaskValidator, validate, createTask)
  .get(listTaskValidator, validate, getTasks);
router.get('/stats', getTaskStats);

router.patch(
  '/:taskId/complete',
  taskIdValidator,
  validate,
  completeTask,
);

router
  .route('/:taskId')
  .get(taskIdValidator, validate, getTask)
  .patch(taskIdValidator, updateTaskValidator, validate, updateTask)
  .delete(taskIdValidator, validate, deleteTask);

export default router;
