---
title: Build a REST API with Node.js and Express
description: Step-by-step guide to building a production-ready REST API using Node.js, Express, and best practices for error handling, validation, and structure.
category: Backend
published: true
createdAt: 2025-05-10T09:00:00.000Z
image: /assets/python-requests.webp
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 8 min read
tags: ['backend']
proficiency: Intermediate
---

Building a REST API from scratch is one of the most valuable skills a developer can have. In this post, I'll show you how to build a clean, production-ready API using Node.js and Express.

## Project Setup

```bash
mkdir my-api && cd my-api
npm init -y
npm install express cors dotenv
npm install -D nodemon
```

Set up your project structure:

```
src/
  routes/
    users.js
  middleware/
    errorHandler.js
  controllers/
    userController.js
index.js
.env
```

## The Entry Point

```js
// index.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRoutes from './src/routes/users.js'
import { errorHandler } from './src/middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
```

## Route + Controller Pattern

```js
// src/routes/users.js
import { Router } from 'express'
import { getUsers, getUserById } from '../controllers/userController.js'

const router = Router()
router.get('/', getUsers)
router.get('/:id', getUserById)
export default router
```

```js
// src/controllers/userController.js
export const getUsers = async (req, res, next) => {
  try {
    // Query your database here
    res.json({ users: [] })
  } catch (err) {
    next(err)
  }
}
```

## Error Handling Middleware

```js
// src/middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
}
```

## Key Takeaways

- Always use a controller/route separation — it keeps files small and focused
- Pass errors to `next(err)` instead of try-catching in every route
- Use environment variables for all config
- Add input validation with `zod` or `joi` before going to production

This pattern scales well as your API grows. Add authentication middleware next!
