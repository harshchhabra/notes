# Notes App Backend

This project is a full-stack notes application that allows users to create, search, and list notes. Each note is associated with a random cat fact retrieved from an external API. The project is built using:

### Backend:

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for handling routes and HTTP requests.
- **MongoDB**: NoSQL database for storing notes.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Axios**: For making HTTP requests to external APIs (cat facts API).

## Installation

To get started, clone this repository and follow the instructions below to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/) v14+ or newer
- [MongoDB](https://www.mongodb.com/) running locally or a cloud instance (e.g., MongoDB Atlas)

- Make sure MongoDB is running.
- Navigate to the server directory.
- Create an .env file at the root of the server directory with the following contents:

```
MONGO_URL=<DATABASE_CONNECTION_URL>
```

- Start the server:

```
node server.js
```
