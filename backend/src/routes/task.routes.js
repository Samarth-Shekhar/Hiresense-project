import { Router } from 'express';

import {
  createTask,
  deleteTask,
  getTask,
  getTaskStats,
  getTasks,
  updateTask,
  updateTaskStatus,
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import {
  createTaskValidator,
  listTaskValidator,
  taskIdValidator,
  updateTaskStatusValidator,
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
  '/:taskId/status',
  taskIdValidator,
  updateTaskStatusValidator,
  validate,
  updateTaskStatus,
);

router
  .route('/:taskId')
  .get(taskIdValidator, validate, getTask)
  .put(taskIdValidator, updateTaskValidator, validate, updateTask)
  .delete(taskIdValidator, validate, deleteTask);

export default router;
