
# Brevto — Phase 1 Blog Website

A basic **MERN stack blog platform** where users can browse blogs, create an account, log in, and publish blogs.

### Features

* View all blogs as a guest or logged-in user
* User signup, login, and logout
* JWT-based authentication
* Create blogs through a modal
* Protected blog creation API
* User profile popup with logout
* Responsive desktop and mobile UI
* MongoDB persistence with secure bcrypt password hashing

### Tech Stack

**Frontend:** React, Vite, React Router, Axios
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
**Configuration:** dotenv

### Phase 1 Scope

This phase includes only the core blogging experience. Features such as likes, comments, follows, search, categories, editing/deleting blogs, image uploads, notifications, and admin functionality are intentionally excluded.

### Project Structure

```text
frontend/
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── context/
    └── App.jsx

backend/
└── src/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── server.js
```
