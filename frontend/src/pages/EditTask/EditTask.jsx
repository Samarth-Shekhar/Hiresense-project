import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import TaskForm from '../../components/TaskForm/TaskForm.jsx';
import api from '../../services/api.js';
import {
  formatDateForInput,
  getErrorMessage,
} from '../../utils/helpers.js';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      try {
        const { data } = await api.get(`/tasks/${taskId}`);
        setTask(data.task);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId]);

  const updateTask = async (taskData) => {
    setError('');

    try {
      await api.put(`/tasks/${taskId}`, taskData);
      toast.success('Task updated successfully');
      navigate('/tasks');
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  const initialValues = task
    ? {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: formatDateForInput(task.dueDate),
      }
    : null;

  return (
    <div className="min-h-screen bg-[#f1f2ed] dark:bg-[#07110f]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:flex md:gap-8">
        <Sidebar />
        <main className="min-w-0 flex-1 py-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Tasks
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#14211d] dark:text-white">
            Edit task
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Update the task details or change its current status.
          </p>

          {error && (
            <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </p>
          )}

          {loading ? (
            <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">Loading task...</p>
          ) : initialValues ? (
            <div className="mt-8 max-w-3xl">
              <TaskForm
                initialValues={initialValues}
                onSubmit={updateTask}
                submitLabel="Save changes"
              />
            </div>
          ) : (
            <Link
              to="/tasks"
              className="mt-6 inline-block text-sm font-bold text-[#29463f] dark:text-[#b9f227]"
            >
              Return to tasks
            </Link>
          )}
        </main>
      </div>
    </div>
  );
};

export default EditTask;
