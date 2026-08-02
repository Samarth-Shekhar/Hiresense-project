import * as taskService from '../services/task.service.js';

export const createTask = async (req, res) => {
  const task = await taskService.createTask(req.user.id, req.body);

  res.status(201).json({
    message: 'Task created successfully',
    task,
  });
};

export const getTasks = async (req, res) => {
  const result = await taskService.getTasks(req.user.id, req.query);

  res.status(200).json(result);
};

export const getTaskStats = async (req, res) => {
  const stats = await taskService.getTaskStats(req.user.id);

  res.status(200).json({ stats });
};

export const getTask = async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId, req.user.id);

  res.status(200).json({ task });
};

export const updateTask = async (req, res) => {
  const task = await taskService.updateTask(
    req.params.taskId,
    req.user.id,
    req.body,
  );

  res.status(200).json({
    message: 'Task updated successfully',
    task,
  });
};

export const deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.taskId, req.user.id);

  res.status(200).json({ message: 'Task deleted successfully' });
};

export const updateTaskStatus = async (req, res) => {
  const task = await taskService.updateTask(
    req.params.taskId,
    req.user.id,
    { status: req.body.status },
  );

  res.status(200).json({
    message: 'Task status updated successfully',
    task,
  });
};
