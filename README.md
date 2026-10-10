# MERN Stack To-Do List

Web Technology (23CSB40B), Assignment 2

**Name:** Parthiv · **Roll No:** 52

A full-stack To-Do List built with MongoDB, Express.js, React.js and Node.js. You can add, view, complete, edit and delete tasks. Every action calls the Express REST API, which reads from and writes to MongoDB. The page updates without a full reload.

## Project Structure

```
backend/
  config/db.js        MongoDB connection (Mongoose)
  models/Task.js      Task schema: title, completed, createdAt
  routes/tasks.js     REST API routes
  server.js           Express entry point
  .env                PORT and MONGO_URI
frontend/
  src/api.js          Axios calls to the backend
  src/App.jsx         State and API wiring
  src/components/     TaskForm, TaskList, TaskItem
  vite.config.js      Dev server (port 3000), proxies /api to the backend
screenshots/
```

## How to Run

**Requirements:** Node.js 18+ and MongoDB (local or MongoDB Atlas).

1. **Set the MongoDB connection string** in `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/todolist
   ```
   For Atlas, use `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/todolist` instead.

2. **Start the backend** (Terminal 1):
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Start the frontend** (Terminal 2):
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Open **http://localhost:3000**

## API Endpoints

| Method | Endpoint         | Description                                                    |
| ------ | ---------------- | -------------------------------------------------------------- |
| GET    | `/api/tasks`     | Fetch all tasks                                                |
| POST   | `/api/tasks`     | Add a task, with body `{ "title": "..." }`                      |
| PUT    | `/api/tasks/:id` | Update a task, with body `{ "completed": true }` and/or `{ "title": "..." }` |
| DELETE | `/api/tasks/:id` | Delete a task                                                  |

## Screenshots

| Adding a task | Completing tasks |
| --- | --- |
| ![Add](screenshots/pic%201.png) | ![Complete](screenshots/pic%202.png) |

| Before delete | After delete |
| --- | --- |
| ![Before delete](screenshots/pic%203.png) | ![After delete](screenshots/pic%204.png) |
