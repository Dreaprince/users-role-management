<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

This API allows for the management of users and their associated roles within the system. It includes features for user registration, authentication, role assignment, and role-based access control to ensure secure interactions with the application. The API is built using NestJS and Prisma ORM, and it follows RESTful conventions.

## Technologies Used

- **Backend Framework:** NestJS (TypeScript)
- **ORM:** Prisma
- **Database:** SQL (e.g., PostgreSQL, MySQL)
- **Authentication:** JWT (JSON Web Tokens)

## API Endpoints

### Authentication

1. **Login User**
   - **Endpoint:** `POST /auth/login`
   - **Description:** Authenticates a user and returns a JWT token.
   - **Request Body:**
     ```json
     {
       "username": "user@example.com",
       "password": "userpassword"
     }
     ```
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
     ```json
     {
       "statusCode": "00",
       "message": "Login Successful",
       "data": {
         "user": {
           "id": 1,
           "firstName": "Toheeb",
           "lastName": "Odusoga",
           "email": "toheebodus@gmail.com",
           "createdAt": "2024-10-20T18:42:51.133Z"
         },
         "accessToken": "jwt-token-here"
       }
     }
     ```

2. **Register User**
   - **Endpoint:** `POST /auth/register`
   - **Description:** Registers a new user.
   - **Request Body:**
     ```json
     {
       "firstName": "Toheeb",
       "lastName": "Odusoga",
       "email": "toheebodus@gmail.com",
       "passwordHash": "userpassword"
     }
     ```
   - **Response:**
     - **Status Code:** 201 Created
     - **Body:**
     ```json
     {
       "statusCode": "00",
       "message": "Signup successful",
       "data": {
         "user": {
           "id": 1,
           "firstName": "Toheeb",
           "lastName": "Odusoga",
           "email": "toheebodus@gmail.com",
           "createdAt": "2024-10-20T18:42:51.133Z"
         },
         "accessToken": "jwt-token-here"
       }
     }
     ```

### User Management

3. **Assign Role to User**
   - **Endpoint:** `POST /users/assign-role`
   - **Description:** Assigns a role to a user.
   - **Request Body:**
     ```json
     {
       "userId": 1,
       "roleId": 2
     }
     ```
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
     ```json
     {
       "statusCode": "00",
       "message": "Role assigned successfully",
       "data": {
         "user": {
           "id": 1,
           "firstName": "Toheeb",
           "lastName": "Odusoga",
           "email": "toheebodus@gmail.com",
           "createdAt": "2024-10-20T18:42:51.133Z",
           "roles": [
             {
               "id": 2,
               "name": "User"
             }
           ]
         }
       }
     }
     ```

4. **Fetch All Users**
   - **Endpoint:** `GET /users`
   - **Description:** Fetches all users along with their assigned roles.
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
     ```json
     {
       "statusCode": "00",
       "message": "Users fetched successfully",
       "data": {
         "users": [
           {
             "id": 1,
             "firstName": "Toheeb",
             "lastName": "Odusoga",
             "email": "toheebodus@gmail.com",
             "createdAt": "2024-10-20T18:42:51.133Z",
             "roles": [
               {
                 "id": 1,
                 "name": "Admin",
                 "permissions": [
                   "READ",
                   "WRITE"
                 ]
               }
             ]
           }
         ]
       }
     }
     ```

5. **Delete User**
   - **Endpoint:** `DELETE /users/:id`
   - **Description:** Deletes a user (Admin only).
   - **Parameters:**
     - `id`: The ID of the user to delete.
   - **Response:**
     - **Status Code:** 204 No Content
     - **Body:** None
     - **OR (if user not found):**
     - **Status Code:** 404 Not Found
     - **Body:**
     ```json
     {
       "statusCode": "04",
       "message": "User not found"
     }
     ```

### Role Management

6. **Create Role**
   - **Endpoint:** `POST /role`
   - **Description:** Creates a new role.
   - **Request Body:**
     ```json
     {
       "name": "Admin",
       "permissions": ["READ", "WRITE", "DELETE"]
     }
     ```
   - **Response:**
     - **Status Code:** 201 Created
     - **Body:**
     ```json
     {
       "statusCode": "00",
       "message": "Role created successfully",
       "data": {
         "role": {
           "id": 1,
           "name": "Admin",
           "permissions": ["READ", "WRITE", "DELETE"]
         }
       }
     }
     ```

7. **Fetch All Roles**
   - **Endpoint:** `GET /role`
   - **Description:** Fetches all roles in the system.
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
     ```json
     {
       "statusCode": "00",
       "message": "Roles fetched successfully",
       "data": {
         "roles": [
           {
             "id": 1,
             "name": "Admin",
             "permissions": ["READ", "WRITE", "DELETE"]
           },
           {
             "id": 2,
             "name": "User",
             "permissions": ["READ"]
           }
         ]
       }
     }
     ```

8. **Fetch Role by ID**
   - **Endpoint:** `GET /role/:id`
   - **Description:** Fetches a specific role by its ID.
   - **Parameters:**
     - `id`: The ID of the role to retrieve.
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
     ```json
     {
       "statusCode": "00",
       "message": "Role fetched successfully",
       "data": {
         "role": {
           "id": 1,
           "name": "Admin",
           "permissions": ["READ", "WRITE", "DELETE"]
         }
       }
     }
     ```

9. **Update Role**
   - **Endpoint:** `PATCH /role/:id`
   - **Description:** Updates a specific role.
   - **Parameters:**
     - `id`: The ID of the role to update.
   - **Request Body:**
     ```json
     {
       "name": "SuperAdmin",
       "permissions": ["READ", "WRITE", "DELETE", "MANAGE_USERS"]
     }
     ```
   - **Response:**
     - **Status Code:** 200 OK
     - **Body:**
     ```json
     {
       "statusCode": "00",
       "message": "Role updated successfully",
       "data": {
         "role": {
           "id": 1,
           "name": "SuperAdmin",
           "permissions": ["READ", "WRITE", "DELETE", "MANAGE_USERS"]
         }
       }
     }
     ```

10. **Delete Role**
    - **Endpoint:** `DELETE /role/:id`
    - **Description:** Deletes a specific role by its ID.
    - **Parameters:**
      - `id`: The ID of the role to delete.
    - **Response:**
      - **Status Code:** 204 No Content
      - **Body:** None
      - **OR (if role not found):**
      - **Status Code:** 404 Not Found
      - **Body:**
      ```json
      {
        "statusCode": "04",
        "message": "Role not found"
      }
      ```

## Security & Validation

- **Password Storage:** Passwords are hashed using bcrypt before being stored in the database to ensure security.
- **Input Validation:** All incoming requests are validated using class-validator to ensure they meet the expected format and requirements.
- **JWT Authentication:** Each protected endpoint checks for a valid JWT token before allowing access, enforcing role-based access control.

## Running the Application

To run the application, follow these steps:

1. **Install Dependencies:** Make sure you have all required dependencies installed. In the project root, run:
   ```bash
   npm install

   
2. Set Up Environment Variables: Create a .env file in the root of your project and configure your database and other necessary settings. An example configuration might look like this:

bash

DATABASE_URL=postgresql://username:password@localhost:5432/mydb
JWT_SECRET=your_jwt_secret

Run Migrations: If you are using Prisma, ensure that your database schema is up to date by running:

bash

npx prisma migrate dev

Start the Application: You can now run the application in development mode:

bash

    npm run start:dev

Running Tests

To ensure the quality of the application, run the tests using the following command:

bash

npm run test