# MentorApp Project

Welcome to MentorApp! This project is designed to facilitate mentorship connections between mentors and mentees in various fields. Below you will find a detailed explanation of the project's code structure, database architecture, database migration, and seeder scripts.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Code Structure](#code-structure)
3. [Database Architecture](#database-architecture)
4. [Database Migration and Seeders](#database-migration-and-seeders)
5. [Setting Up the Project](#setting-up-the-project)

## Project Overview

MentorApp is a web-based platform that allows users to register as either mentors or mentees. Users can create and edit their profiles, search for other users, and communicate through a chat feature.

## Code Structure

The project follows a standard MVC (with REST API) architecture. Here's a breakdown of the directory structure:


### Backend

- **controllers/**: Contains the application's controllers for handling requests.
- **middlewares/**: Contains middleware functions for request validation and authentication.
- **models/**: Contains the Sequelize models for interacting with the database.
- **routes/**: Contains the route definitions for the application.
- **services/**: Contains business logic for interacting with models and controllers.
- **utils/**: Contains utility functions, such as validators.

### Frontend

- **views/**: Contains EJS templates for rendering HTML pages.
- **public/**: Contains static assets such as CSS and JavaScript files.

## Database Migration and Seeders

### Migrations
Migrations are used to create and update the database schema. You can find migration scripts in the `migrations/` directory.

To run migrations, use:

```sh
npx sequelize-cli db:migrate
```

### Seeders
Seeders are used to populate the database with initial data. You can find seeder scripts in the `seeders/` directory.
To run migrations, use:

```sh
npx sequelize-cli db:seed:all
```

## Setting Up the Project

### Prerequisites
- Node.js
- PostgreSQL
- Sequelize CLI

### Installation
1. **Clone the repository:**
    ```sh
    git clone
    cd mentorApp
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root directory and add the following variables:
        ```plaintext
        DB_HOST=localhost
        DB_USER=your_db_user
        DB_PASS=your_db_password
        DB_NAME=your_db_name
        JWT_SECRET=your_jwt_secret
        ```

4. **Run migrations and seeders:**
    ```sh
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```
[README.md](README.md)
5. **Start the server:**
    ```sh
    npm start
    ```

6. **Access the application at** [http://localhost:3000](http://localhost:3000).

**Note:**
- Ensure PostgreSQL is running and accessible.
- Update the database configuration as per your setup.

## Database Architecture

The database is designed using PostgreSQL. The key tables are:

- **Users**: Stores user information (first name, last name, email, etc.).
- **Fields**: Stores the different fields in which mentorship is offered.
- **Messages**: Stores the messages exchanged between users in chat.

### ER Diagram

```plaintext
+------------+     +------------+     +------------+     +------------+     +------------+
|   Users    |     |   Fields   |     |  Messages  |     |   Chats    |     | User_Chats |
+------------+     +------------+     +------------+     +------------+     +------------+
| id         |     | id         |     | id         |     | id         |     | userId     |
| firstName  |     | title      |     | chatId     |     | createdAt  |     | chatId     |
| lastName   |     +------------+     | userId     |     +------------+     +------------+
| email      |                        | content    |
| type       |                        | createdAt  |
| position   |                        +------------+
| fieldId    |
| description|
| education  |
| experience |
| about      |
+------------+
```
