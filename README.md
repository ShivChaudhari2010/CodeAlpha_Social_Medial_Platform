# 🚀 Mini Social Media App

A full-stack **Mini Social Media Platform** where users can create profiles, publish posts, like and comment on posts, and follow other users.

The project is built with a simple and practical architecture using **HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB**.

---

## 📌 Project Overview

The Mini Social Media App is designed as a lightweight social networking platform that demonstrates the core functionality of modern social media applications.

Users can:

* Create an account
* Login securely
* Manage their profile
* Create, edit, and delete posts
* Like and unlike posts
* Add and delete comments
* Follow and unfollow users
* View followers and following
* Search users and posts
* Switch between Light and Dark Mode
* Use the application on desktop, tablet, and mobile devices

The application follows a **REST API based architecture**, with a separate frontend and backend.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing
* Protected API routes
* Authentication middleware
* Logout functionality
* Route protection on frontend

### 👤 User Profiles

* View user profile
* Edit username
* Edit bio
* Profile information
* Post count
* Followers count
* Following count
* User's posts

### 📝 Posts

* Create posts
* View posts
* Edit posts
* Delete posts
* Feed page
* Post timestamps
* Post author information

### ❤️ Likes

* Like posts
* Unlike posts
* Display like count
* Show whether current user liked the post

### 💬 Comments

* Add comments
* View comments
* Delete own comments
* Display comment author
* Display comment timestamps
* Empty comment state

### 👥 Follow System

* Follow users
* Unfollow users
* Followers count
* Following count
* Followers list
* Following list

### 🔎 Search

* Search users
* Search posts

### 🎨 UI / UX

* Responsive design
* Light Mode
* Dark Mode
* Persistent theme preference
* Toast notifications
* Loading indicators
* Empty states
* Mobile-friendly interface
* Modern cards and buttons
* Password show/hide functionality

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* LocalStorage
* Responsive CSS

### Backend

* Node.js
* Express.js
* REST API
* JWT
* bcrypt

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman / Thunder Client
* Chrome DevTools

### Deployment

* Frontend: Vercel / Netlify
* Backend: Render
* Database: MongoDB Atlas

---

# 📂 Project Structure

```text
mini-social-media/
│
├── frontend/
│   │
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── feed.html
│   └── profile.html
│   │
│   ├── css/
│   │   ├── home.css
│   │   ├── auth.css
│   │   ├── feed.css
│   │   ├── profile.css
│   │   ├── theme.css
│   │   ├── responsive.css
│   │   ├── loading.css
│   │   └── toast.css
│   │
│   ├── js/
│   │   ├── config.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── guard.js
│   │   ├── feed.js
│   │   ├── postService.js
│   │   ├── commentService.js
│   │   ├── profile.js
│   │   ├── profileService.js
│   │   ├── theme.js
│   │   ├── toast.js
│   │   ├── loading.js
│   │   └── utils.js
│   │
│   └── assets/
│
│
├── backend/
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── .env.example
│   ├── .gitignore
│   │
│   └── src/
│       │
│       ├── app.js
│       │
│       ├── config/
│       │   └── db.js
│       │
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── postController.js
│       │   ├── commentController.js
│       │   └── profileController.js
│       │
│       ├── middleware/
│       │   └── authMiddleware.js
│       │
│       ├── models/
│       │   ├── User.js
│       │   ├── Post.js
│       │   └── Comment.js
│       │
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── postRoutes.js
│       │   ├── commentRoutes.js
│       │   └── profileRoutes.js
│       │
│       └── utils/
│
└── README.md
```

> The exact filenames may differ depending on the final backend implementation.

---

# 🔄 Application Flow

```text
                     ┌──────────────────┐
                     │      User        │
                     └────────┬─────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │    Frontend      │
                    │ HTML/CSS/JS      │
                    └────────┬─────────┘
                             │
                         REST API
                             │
                             ▼
                    ┌──────────────────┐
                    │     Express      │
                    │     Backend      │
                    └────────┬─────────┘
                             │
                   ┌─────────┴─────────┐
                   │                   │
                   ▼                   ▼
             Authentication       Application Logic
                   │                   │
                   └─────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    │   MongoDB Atlas  │
                    └──────────────────┘
```

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/mini-social-media.git
```

Move into the project:

```bash
cd mini-social-media
```

---

# ⚙️ Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/mini_social_media

JWT_SECRET=your_super_secret_jwt_key

NODE_ENV=development
```

For MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/mini_social_media?retryWrites=true&w=majority
```

### Important

Never upload `.env` to GitHub.

Make sure `.gitignore` contains:

```text
node_modules
.env
```

---

# 🗄️ MongoDB Atlas Setup

If using MongoDB Atlas:

1. Create a MongoDB Atlas account.
2. Create a free cluster.
3. Create a database user.
4. Configure Network Access.
5. Add your IP address.
6. Copy the MongoDB connection string.
7. Add it to `.env`.

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mini_social_media
```

---

# ▶️ Start Backend

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The backend should run on:

```text
http://localhost:5000
```

---

# 🌐 Frontend Setup

The frontend is built using plain HTML, CSS, and JavaScript.

You can use **VS Code Live Server**.

Open the frontend folder in VS Code and run:

```text
index.html
```

using Live Server.

Example:

```text
http://127.0.0.1:5500
```

---

# 🔗 API Configuration

Update:

```text
frontend/js/config.js
```

For local development:

```javascript
const CONFIG = {
    API_BASE_URL: "http://localhost:5000/api/v1"
};
```

For production:

```javascript
const CONFIG = {
    API_BASE_URL: "https://your-backend.onrender.com/api/v1"
};
```

---

# 🔐 Authentication Flow

```text
Register
   ↓
POST /auth/register
   ↓
User created
   ↓
Login
   ↓
POST /auth/login
   ↓
JWT Token
   ↓
Token stored in browser
   ↓
Protected API requests
```

Protected requests send:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /api/v1/auth/register
```

Example:

```json
{
    "username": "john",
    "email": "john@example.com",
    "password": "password123"
}
```

### Login

```http
POST /api/v1/auth/login
```

Example:

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

---

# 👤 Profile APIs

### Get Current Profile

```http
GET /api/v1/profile/me
```

### Update Profile

```http
PUT /api/v1/profile/me
```

Example:

```json
{
    "username": "john",
    "bio": "Web Developer"
}
```

---

# 📝 Post APIs

### Create Post

```http
POST /api/v1/posts
```

Example:

```json
{
    "content": "Hello everyone!"
}
```

### Get Posts

```http
GET /api/v1/posts
```

### Update Post

```http
PUT /api/v1/posts/:id
```

### Delete Post

```http
DELETE /api/v1/posts/:id
```

---

# ❤️ Like APIs

### Like Post

```http
POST /api/v1/posts/:id/like
```

### Unlike Post

```http
DELETE /api/v1/posts/:id/like
```

---

# 💬 Comment APIs

### Add Comment

```http
POST /api/v1/posts/:postId/comments
```

Example:

```json
{
    "content": "Great post!"
}
```

### Get Comments

```http
GET /api/v1/posts/:postId/comments
```

### Delete Comment

```http
DELETE /api/v1/comments/:id
```

---

# 👥 Follow APIs

### Follow User

```http
POST /api/v1/users/:id/follow
```

### Unfollow User

```http
DELETE /api/v1/users/:id/follow
```

### Followers

```http
GET /api/v1/users/:id/followers
```

### Following

```http
GET /api/v1/users/:id/following
```

> API paths may be adjusted according to the final backend route implementation.

---

# 🎨 UI Features

## 🌞 Light Mode

The application provides a clean light interface with:

* White cards
* Light backgrounds
* Dark text
* Blue primary actions

## 🌙 Dark Mode

Dark Mode provides:

* Dark background
* Dark cards
* Light text
* Dark inputs
* Proper borders
* Theme-aware buttons
* Persistent theme preference

Theme preference is stored using:

```javascript
localStorage
```

---

# 📱 Responsive Design

The application supports:

```text
Mobile
Tablet
Laptop
Desktop
```

Responsive breakpoints are managed through:

```text
frontend/css/responsive.css
```

---

# 🔔 Toast Notifications

Instead of using browser alerts, the application uses toast notifications for:

* Successful login
* Registration success
* Post creation
* Post deletion
* Like/unlike
* Comment actions
* Profile updates
* Errors

---

# ⏳ Loading Indicators

Loading indicators are displayed during asynchronous operations such as:

* API requests
* Loading posts
* Loading comments
* Profile requests
* Creating posts
* Updating profile

---

# 🧪 Testing

Before deployment, test the following:

### Authentication

* [ ] Register
* [ ] Login
* [ ] Logout
* [ ] Invalid login
* [ ] Duplicate email
* [ ] Protected routes

### Posts

* [ ] Create post
* [ ] Display posts
* [ ] Edit post
* [ ] Delete post

### Likes

* [ ] Like post
* [ ] Unlike post
* [ ] Like count

### Comments

* [ ] Add comment
* [ ] Display comments
* [ ] Delete own comment
* [ ] Empty comments

### Profile

* [ ] View profile
* [ ] Edit profile
* [ ] Posts count
* [ ] Followers count
* [ ] Following count

### UI

* [ ] Light mode
* [ ] Dark mode
* [ ] Mobile layout
* [ ] Tablet layout
* [ ] Desktop layout
* [ ] Toast notifications
* [ ] Loading indicators

---

# 🚀 Deployment

## Backend

Recommended platform:

**Render**

Deployment settings:

```text
Build Command:
npm install

Start Command:
npm start
```

Add environment variables:

```text
PORT
MONGO_URI
JWT_SECRET
NODE_ENV
```

Example:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_production_secret
```

---

## Frontend

Recommended platforms:

* Vercel
* Netlify
* GitHub Pages

Update:

```text
frontend/js/config.js
```

with the deployed backend:

```javascript
const CONFIG = {
    API_BASE_URL:
        "https://your-backend.onrender.com/api/v1"
};
```

---

# 🔒 Security

The project implements basic security practices including:

* Password hashing with bcrypt
* JWT authentication
* Protected routes
* Environment variables
* `.env` excluded from Git
* Authentication middleware
* Input validation
* CORS configuration

### Never commit:

```text
.env
```

or expose:

```text
JWT_SECRET
MongoDB password
Database credentials
```

---

# 📸 Screenshots

Add screenshots of your application here after deployment.

Example:

```markdown
## 📸 Screenshots

### Landing Page

![Landing Page](screenshots/landing.png)

### Login

![Login](screenshots/login.png)

### Feed

![Feed](screenshots/feed.png)

### Profile

![Profile](screenshots/profile.png)

### Dark Mode

![Dark Mode](screenshots/dark-mode.png)
```

Recommended screenshot folder:

```text
screenshots/
├── landing.png
├── login.png
├── register.png
├── feed.png
├── profile.png
└── dark-mode.png
```

---

# 🗺️ Development Roadmap

## Phase 1 — Project Setup

* [x] Express server
* [x] MongoDB connection
* [x] Environment configuration

## Phase 2 — Authentication

* [x] Register
* [x] Login
* [x] JWT authentication
* [x] Password hashing
* [x] Protected routes
* [x] Login/Register UI

## Phase 3 — Posts

* [x] Post model
* [x] Create post
* [x] Edit post
* [x] Delete post
* [x] Feed

## Phase 4 — Profiles

* [x] View profile
* [x] Edit profile
* [x] Post statistics

## Phase 5 — Likes

* [x] Like post
* [x] Unlike post
* [x] Like count

## Phase 6 — Comments

* [x] Comment model
* [x] Add comment
* [x] View comments
* [x] Delete own comments

## Phase 7 — UI & Deployment

* [x] Responsive design
* [x] Toast notifications
* [x] Loading indicators
* [x] Empty states
* [x] Light/Dark Mode
* [ ] Backend deployment
* [ ] Frontend deployment
* [ ] Final production testing

## Future Improvements

* [ ] Image posts
* [ ] Profile image upload
* [ ] User search
* [ ] Post search
* [ ] Followers/following pages
* [ ] Notifications
* [ ] Infinite scrolling
* [ ] Pagination
* [ ] Password reset
* [ ] Email verification
* [ ] Real-time notifications
* [ ] Direct messaging

---

# 📊 Database Design

## User

```text
User
├── username
├── email
├── password
├── bio
├── profileImage
├── followers
├── following
├── createdAt
└── updatedAt
```

## Post

```text
Post
├── author
├── content
├── likes
├── createdAt
└── updatedAt
```

## Comment

```text
Comment
├── post
├── author
├── content
├── createdAt
└── updatedAt
```

---

# 🧩 Main Application Modules

```text
Authentication
      │
      ├── Register
      ├── Login
      └── JWT
      │
      ▼
User Profile
      │
      ├── Profile
      ├── Followers
      └── Following
      │
      ▼
Posts
      │
      ├── Create
      ├── Edit
      └── Delete
      │
      ├──────────────┐
      ▼              ▼
   Likes          Comments
      │              │
      └──────┬───────┘
             ▼
           Feed
```

---

# 💡 Project Highlights

This project demonstrates practical full-stack development concepts including:

* REST API development
* CRUD operations
* Authentication and authorization
* JWT
* Password hashing
* MongoDB database design
* Mongoose models
* Middleware
* Frontend API integration
* LocalStorage
* Responsive UI
* Dark/Light theme system
* Error handling
* Deployment configuration

---

# 🧑‍💻 Author

**Smit Chaudhari**

Computer Engineering Student
Government Engineering College, Modasa, Gujarat

### Skills Demonstrated

```text
HTML
CSS
JavaScript
Node.js
Express.js
MongoDB
Mongoose
REST API
JWT
Git
GitHub
Responsive Design
```

---

# 📄 License

This project is created for **educational, learning, and portfolio purposes**.

You are free to study and modify the code for your own learning.

---

# ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

## 🚀 Final Project

**Mini Social Media App**

A simple full-stack social networking application demonstrating authentication, profiles, posts, likes, comments, follows, responsive UI, and Light/Dark Mode.
