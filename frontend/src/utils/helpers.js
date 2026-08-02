export const getErrorMessage = (error) =>
  error.response?.data?.errors?.[0]?.message ||
  error.response?.data?.message ||
  'Unable to complete the request. Please try again.';

export const getSafeRedirectPath = (path, fallback = '/dashboard') => {
  const isInternalPath =
    typeof path === 'string' &&
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !path.includes('\\');

  return isInternalPath ? path : fallback;
};

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));

export const formatDateForInput = (date) => date?.slice(0, 10) || '';

export const formatStatus = (status) =>
  status === 'in-progress' ? 'In progress' : status[0].toUpperCase() + status.slice(1);

export const isTaskOverdue = (task) =>
  task.status !== 'completed' &&
  task.dueDate.slice(0, 10) < new Date().toISOString().slice(0, 10);
