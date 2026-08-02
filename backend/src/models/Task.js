import mongoose from 'mongoose';

export const TASK_PRIORITIES = ['low', 'medium', 'high'];
export const TASK_STATUSES = ['pending', 'in-progress', 'completed'];

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    priority: {
      type: String,
      enum: TASK_PRIORITIES,
      default: 'medium',
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: 'pending',
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ user: 1, status: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
