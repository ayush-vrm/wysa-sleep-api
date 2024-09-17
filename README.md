This project provides a RESTful API for managing sleep assessments. It allows users to create, view, update, and delete sleep assessments, providing insights into sleep quality and duration.

Features: 
User Authentication: Secure authentication with JWT (JSON Web Tokens).
Create Sleep Assessments: Users can log sleep quality, duration, and notes.
Get User's Assessments: Retrieve all sleep assessments for a user.
Update Sleep Assessment: Modify existing sleep assessment details.

Technologies Used: 
Backend: Node.js, Express.js
Database: MongoDB (NoSQL)
Authentication: JSON Web Tokens (JWT)
Validation: Mongoose
API Endpoints

Installation
Prerequisites
Node.js
MongoDB

Steps:
1. Clone the repository:
git clone https://github.com/ayush-vrm/wysa-sleep-api.git

2.Install dependencies:
cd wysa-sleep-api
npm install

3. Environment Variables: Create a .env file in the root of your project and set up the following environment variables:

MONGODB_URL = "mongo_url"
PORT = 4000
JWT_SECRET = your_jwt_secret


