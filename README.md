# Task Management System

## Project overview

A small full-stack task manager built as a weekend assignment. Users can create an account, manage their own tasks, track dashboard totals, and search or filter their workload.

## Features

- JWT authentication using HTTP-only cookies
- Register, login, logout, and session restoration
- User-scoped task CRUD and mark-complete action
- Dashboard totals for completed and outstanding work
- Search across task titles and descriptions
- Priority, status, and due-date filters
- Configurable sorting and server-side pagination
- Responsive card and table layouts
- Persistent light and dark themes
- Central API errors and request validation

## Screenshots

### Dashboard

![Taskboard dashboard](docs/screenshots/dashboard.png)

### Task list

![Task list with search, filters and task actions](docs/screenshots/task-list.png)

### Create task

![Create task form](docs/screenshots/create-task.png)

### Authentication

| Login | Registration |
| --- | --- |
| ![Taskboard login screen](docs/screenshots/login.png) | ![Taskboard registration screen](docs/screenshots/register.png) |

## Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, express-validator

**Frontend:** React, React Router, Axios, Tailwind CSS, React Hook Form, React Hot Toast

## Project structure

```text
backend/
  src/
    config/       Database and environment configuration
    controllers/  HTTP request and response handling
    middleware/   Authentication, validation, and errors
    models/       Mongoose schemas
    routes/       Express route definitions
    services/     Authentication and task business logic
    utils/        Tokens, errors, and pagination
    validators/   express-validator rules

frontend/
  src/
    components/   Shared navigation, forms, and task views
    context/      Authentication state
    hooks/        Authentication hook
    pages/        Route-level screens
    services/     Axios configuration
    utils/        Display constants and formatting

api/
  index.js        Vercel serverless entry point for the Express API

vercel.json       One-project frontend and API deployment configuration
```

## Database schema

### User

| Field | Type | Notes |
| --- | --- | --- |
| `name` | String | Required, maximum 60 characters |
| `email` | String | Required, unique and normalized |
| `password` | String | Required, bcrypt hash excluded from normal queries |
| `createdAt`, `updatedAt` | Date | Managed by Mongoose timestamps |

### Task

| Field | Type | Notes |
| --- | --- | --- |
| `user` | ObjectId | Required reference to the task owner |
| `title` | String | Required, maximum 120 characters |
| `description` | String | Optional, maximum 1,000 characters |
| `priority` | String | `low`, `medium`, or `high` |
| `status` | String | `pending`, `in-progress`, or `completed` |
| `dueDate` | Date | Required |
| `createdAt`, `updatedAt` | Date | Managed by Mongoose timestamps |

## Requirements

- Node.js 22.12 or newer
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## Environment variables

| Variable | Application | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Backend | MongoDB connection string |
| `JWT_SECRET` | Backend | Secret used to sign authentication tokens |
| `JWT_EXPIRES_IN` | Backend | Token lifetime, such as `7d` |
| `COOKIE_EXPIRES_IN_DAYS` | Backend | Authentication cookie lifetime |
| `CLIENT_URL` | Backend | Optional frontend origin for CORS during local development |
| `NODE_ENV` | Backend | Runtime environment |
| `VITE_API_URL` | Frontend | API base URL for local development |

## Setup instructions

### 1. Backend

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, then update the values if needed:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task_management
JWT_SECRET=use-a-long-random-development-secret
JWT_EXPIRES_IN=7d
COOKIE_EXPIRES_IN_DAYS=7
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the API:

```bash
npm run dev
```

The health endpoint is available at `http://localhost:5000/api/health`.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the client:

```bash
npm run dev
```

Open `http://localhost:5173`.

## API documentation

All task routes require the JWT cookie created during registration or login.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get the current user |
| POST | `/api/auth/logout` | Clear the session |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks/stats` | Get dashboard totals |
| GET | `/api/tasks/:taskId` | Get one task |
| PUT | `/api/tasks/:taskId` | Update a task |
| PATCH | `/api/tasks/:taskId/status` | Update a task status |
| DELETE | `/api/tasks/:taskId` | Delete a task |

The list endpoint accepts `search`, `priority`, `status`, `dueDate`, `sort`, `page`, and `limit`. See the included Postman collection for examples.

## Postman

Import `postman/Task-Management.postman_collection.json` into Postman. The collection uses `http://localhost:5000/api` by default and keeps the authentication cookie automatically.

Run Register first, then Create Task. The create request stores the returned task ID in the collection variable used by the read, update, complete, and delete requests.

## Deployment

The frontend and API deploy together as one Vercel project and use the same
origin. Vercel serves the React application from `/` and runs Express as a
serverless function under `/api`.

### 1. Prepare MongoDB Atlas

A deployed application cannot connect to a MongoDB instance at
`mongodb://127.0.0.1`. Create or select a MongoDB Atlas cluster, create a database
user, and copy its application connection string.

In Atlas Network Access, allow connections from the deployed application.
Vercel deployments do not have a fixed outbound IP by default, so a development
or demonstration deployment may need `0.0.0.0/0`. Use strong database
credentials and restrict access further when fixed egress is available. URL
encode special characters in the database username or password.

### 2. Push the deployment configuration

Commit the application and deployment files, then push the production branch:

```bash
git add README.md api package.json vercel.json backend/src/app.js backend/src/config/env.js backend/src/controllers/auth.controller.js frontend/src/services/api.js
git commit -m "feat: deploy full app on Vercel"
git push origin main
```

Environment files are ignored by Git and must never be committed.

### 3. Create the Vercel project

1. Open the [Vercel dashboard](https://vercel.com/new), select **Add New**, and
   then select **Project**.
2. Import this Git repository.
3. Keep **Root Directory** set to `./` (the repository root), not `frontend` or
   `backend`.
4. Select **Other** as the framework preset if Vercel asks for one.
5. Do not override the install command, build command, or output directory. They
   are defined in `vercel.json`.

### 4. Configure environment variables

Add the following variables before the first deployment. Apply them to both
Production and Preview when preview deployments should be functional.

| Variable | Required | Example or purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB Atlas application connection string |
| `JWT_SECRET` | Yes | Random secret containing at least 32 characters |
| `JWT_EXPIRES_IN` | No | `7d` |
| `COOKIE_EXPIRES_IN_DAYS` | No | `7` |

Do not add `PORT`, `CLIENT_URL`, or `VITE_API_URL` in Vercel. Vercel provides
the function port, and the browser calls `/api` on the same deployment domain.
`CLIENT_URL` and `VITE_API_URL` are only used by the two-port local development
setup.

### 5. Deploy and verify

Select **Deploy** in Vercel. After the deployment reaches the Ready state, open:

```text
https://your-project.vercel.app
https://your-project.vercel.app/api/health
```

The health endpoint should return:

```json
{
  "message": "API is running"
}
```

Register a new account, log in, and create a task to verify the database and
authentication cookie. Future pushes to `main` will create new production
deployments automatically.

### Troubleshooting deployment

- **API initialization failed:** verify `MONGODB_URI`, the Atlas database user,
  Atlas Network Access, and `JWT_SECRET`.
- **Frontend loads but `/api` returns 404:** confirm the Vercel Root Directory is
  the repository root and that the settings from `vercel.json` were not
  overridden.
- **Environment variable changes have no effect:** redeploy after saving the
  variables; changes do not modify an already-created deployment.
- **Client-side route returns 404 after refresh:** confirm the SPA fallback
  rewrite from `vercel.json` is present in the deployed commit.

## Useful commands

```bash
# Backend development
cd backend && npm run dev

# Backend production start
cd backend && npm start

# Frontend development
cd frontend && npm run dev

# Frontend production build
cd frontend && npm run build
```
