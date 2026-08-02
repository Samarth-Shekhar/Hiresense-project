import Task from '../models/Task.js';
import ApiError from '../utils/ApiError.js';
import {
  getPagination,
  getPaginationMeta,
} from '../utils/pagination.js';

const sortOptions = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  'due-soonest': { dueDate: 1, createdAt: -1 },
  'due-latest': { dueDate: -1, createdAt: -1 },
  'title-asc': { title: 1 },
  'title-desc': { title: -1 },
};

const editableFields = [
  'title',
  'description',
  'priority',
  'status',
  'dueDate',
];

const getTaskData = (input) =>
  editableFields.reduce((taskData, field) => {
    if (Object.hasOwn(input, field)) {
      taskData[field] = input[field];
    }

    return taskData;
  }, {});

const findUserTask = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });

  if (!task) {
    throw new ApiError('Task not found', 404);
  }

  return task;
};

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getDueDateRange = (dueDateFilter) => {
  if (!dueDateFilter) {
    return null;
  }

  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  const ranges = {
    overdue: { $lt: today },
    today: { $gte: today, $lt: tomorrow },
    upcoming: { $gte: tomorrow },
  };

  return ranges[dueDateFilter];
};

export const createTask = (userId, input) =>
  Task.create({
    ...getTaskData(input),
    user: userId,
  });

export const getTasks = async (userId, options) => {
  const { search, priority, status, dueDate, sort = 'newest' } = options;
  const pagination = getPagination(options.page, options.limit);
  const query = { user: userId };

  if (search) {
    const searchPattern = new RegExp(escapeRegex(search), 'i');
    query.$or = [
      { title: searchPattern },
      { description: searchPattern },
    ];
  }

  if (priority) {
    query.priority = priority;
  }

  if (status) {
    query.status = status;
  }

  const dueDateRange = getDueDateRange(dueDate);
  if (dueDateRange) {
    query.dueDate = dueDateRange;
  }

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .sort(sortOptions[sort])
      .skip(pagination.skip)
      .limit(pagination.limit),
    Task.countDocuments(query),
  ]);

  return {
    tasks,
    pagination: getPaginationMeta({ ...pagination, total }),
  };
};

export const getTaskStats = async (userId) => {
  const [total, completed] = await Promise.all([
    Task.countDocuments({ user: userId }),
    Task.countDocuments({ user: userId, status: 'completed' }),
  ]);

  return {
    total,
    completed,
    pending: total - completed,
  };
};

export const getTaskById = (taskId, userId) =>
  findUserTask(taskId, userId);

export const updateTask = async (taskId, userId, input) => {
  const task = await findUserTask(taskId, userId);

  Object.assign(task, getTaskData(input));
  return task.save();
};

export const deleteTask = async (taskId, userId) => {
  const task = await findUserTask(taskId, userId);

  await task.deleteOne();
};

export const completeTask = async (taskId, userId) => {
  const task = await findUserTask(taskId, userId);

  task.status = 'completed';
  return task.save();
};
