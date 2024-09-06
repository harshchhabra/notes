# Notes App Frontend

This project is a full-stack notes application that allows users to create, search, and list notes. Each note is associated with a random cat fact retrieved from an external API. The project is built using:

### Frontend:

- **React 18**: For building the user interface.
- **TypeScript**: For static type checking.
- **React Query**: For data fetching, caching, and synchronizing server state.
- **React Hook Form**: For form handling.
- **Yup**: For form validation.
- **Tailwind CSS**: For UI styling (used in classes).

## Installation

To get started, clone this repository and follow the instructions below to set up the project locally.

- Create an .env file at the root of the server directory with the following contents:

```
VITE_API_HOST=<YOUR_BACKEND_API_URL>
```

- Start the server

```
npm i
npm run dev
```

The frontend will start on http://localhost:5173.
