# MyContacts Backend

REST API for managing personal contacts with user registration, login, JWT authentication, and protected CRUD operations.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Features

- User registration
- User login
- JWT-based authorization
- Get current authorized user
- Create, read, update, and delete contacts
- User-specific contacts: each user can access only their own contacts
- Centralized error handling middleware

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
port=5001
CONNECTION_STRING=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```

## Run

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Users

Register a new user:

```http
POST /api/users/register
```

Body:

```json
{
  "username": "Maryna",
  "email": "maryna@example.com",
  "password": "password123"
}
```

Login:

```http
POST /api/users/login
```

Body:

```json
{
  "email": "maryna@example.com",
  "password": "password123"
}
```

Get current user:

```http
GET /api/users/current
```

Authorization:

```http
Bearer <accessToken>
```

### Contacts

All contact routes require a Bearer token.

Get all contacts:

```http
GET /api/contacts
```

Create contact:

```http
POST /api/contacts
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+380991112233"
}
```

Get contact by id:

```http
GET /api/contacts/:id
```

Update contact:

```http
PUT /api/contacts/:id
```

Body:

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "phone": "+380991112244"
}
```

Delete contact:

```http
DELETE /api/contacts/:id
```

## Authentication

After login, copy the `accessToken` from the response and send it in protected requests using the Authorization header:

```http
Authorization: Bearer <accessToken>
```

In Postman, select `Authorization`, choose `Bearer Token`, and paste only the token value.
