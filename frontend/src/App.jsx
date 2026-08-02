import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import CreateTask from './pages/CreateTask/CreateTask.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import EditTask from './pages/EditTask/EditTask.jsx';
import Login from './pages/Login/Login.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Register from './pages/Register/Register.jsx';
import Tasks from './pages/Tasks/Tasks.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/tasks/new" element={<CreateTask />} />
      <Route path="/tasks/:taskId/edit" element={<EditTask />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
