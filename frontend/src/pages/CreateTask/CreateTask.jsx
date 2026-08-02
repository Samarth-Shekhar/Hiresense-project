import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import TaskForm from '../../components/TaskForm/TaskForm.jsx';
import api from '../../services/api.js';
import { getErrorMessage } from '../../utils/helpers.js';

const CreateTask = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const createTask = async (taskData) => {
    setError('');

    try {
      await api.post('/tasks', taskData);
      toast.success('Task created successfully');
      navigate('/tasks');
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

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
            Create a task
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Add the details you need to plan and prioritize the work.
          </p>

          {error && (
            <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </p>
          )}

          <div className="mt-8 max-w-3xl">
            <TaskForm onSubmit={createTask} submitLabel="Create task" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateTask;
