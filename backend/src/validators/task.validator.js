import { body, param, query } from 'express-validator';

import { TASK_PRIORITIES, TASK_STATUSES } from '../models/Task.js';

const titleValidator = () =>
  body('title')
    .isString()
    .withMessage('Title must be text')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 120 })
    .withMessage('Title cannot exceed 120 characters');

const descriptionValidator = () =>
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be text')
    .bail()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters');

const priorityValidator = () =>
  body('priority')
    .optional()
    .isIn(TASK_PRIORITIES)
    .withMessage(`Priority must be ${TASK_PRIORITIES.join(', ')}`);

const statusValidator = () =>
  body('status')
    .optional()
    .isIn(TASK_STATUSES)
    .withMessage(`Status must be ${TASK_STATUSES.join(', ')}`);

const dueDateValidator = (optional = false) => {
  const validator = body('dueDate');

  if (optional) {
    validator.optional();
  } else {
    validator.notEmpty().withMessage('Due date is required').bail();
  }

  return validator
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage('Enter a valid due date')
    .toDate();
};

export const taskIdValidator = [
  param('taskId').isMongoId().withMessage('Invalid task ID'),
];

export const listTaskValidator = [
  query('search')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search cannot exceed 100 characters'),
  query('priority')
    .optional({ checkFalsy: true })
    .isIn(TASK_PRIORITIES)
    .withMessage(`Priority must be ${TASK_PRIORITIES.join(', ')}`),
  query('status')
    .optional({ checkFalsy: true })
    .isIn(TASK_STATUSES)
    .withMessage(`Status must be ${TASK_STATUSES.join(', ')}`),
  query('dueDate')
    .optional({ checkFalsy: true })
    .isIn(['overdue', 'today', 'upcoming'])
    .withMessage('Due date filter must be overdue, today, or upcoming'),
  query('sort')
    .optional({ checkFalsy: true })
    .isIn([
      'newest',
      'oldest',
      'due-soonest',
      'due-latest',
      'title-asc',
      'title-desc',
    ])
    .withMessage('Invalid sort option'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
    .toInt(),
];

export const createTaskValidator = [
  titleValidator(),
  descriptionValidator(),
  priorityValidator(),
  statusValidator(),
  dueDateValidator(),
];

export const updateTaskValidator = [
  body().custom((value) => {
    const editableFields = [
      'title',
      'description',
      'priority',
      'status',
      'dueDate',
    ];

    if (!editableFields.some((field) => Object.hasOwn(value, field))) {
      throw new Error('Provide at least one task field to update');
    }

    return true;
  }),
  titleValidator().optional(),
  descriptionValidator(),
  priorityValidator(),
  statusValidator(),
  dueDateValidator(true),
];
