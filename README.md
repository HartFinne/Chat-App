# Basic Chat App (Still not done)

A **MERN** (MongoDB, Express, React, Node.js) real-time chat application that allows users to sign up, authenticate, and exchange messages securely.

## Features
- User Authentication (Signup, Login, Logout)
- Real-time Messaging
- JWT-based Authentication
- Secure Cookie Handling
- MongoDB for Data Storage
- RESTful API with Express.js
- React Frontend with Hooks
- WebSockets for Live Messaging (Optional)

## Tech Stack
- **Frontend:** React.js, Hooks, Tailwind CSS (or any styling library)
- **Backend:** Node.js, Express.js, JWT, WebSockets (optional)
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JSON Web Tokens (JWT), Cookies
- **Real-time:** Socket.io (optional)

## Installation

### Prerequisites
- Node.js & npm installed
- MongoDB installed & running

### Setup
```sh
# Clone the repository
git clone https://github.com/YOUR_GITHUB_USERNAME/Chat-App.git
cd Chat-App

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables
Create a `.env` file inside the `backend` folder and add the following:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Running the App
```sh
# Start the backend server
cd backend
npm start

# Start the frontend server
cd ../frontend
npm start
```

## Usage
1. Sign up or log in.
2. Start a chat with another user.
3. Send and receive messages in real-time.

## API Endpoints
**Auth Routes**
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Logout user

**Message Routes**
- `POST /api/messages/send` - Send a message
- `GET /api/messages` - Fetch messages

## Contributing
Feel free to submit a pull request if you'd like to contribute!

## License
This project is licensed under the **MIT License**.

