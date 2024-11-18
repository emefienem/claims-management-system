# Claims Management System

A web application that allows users to upload claims in CSV format, validate and display them in a grid, and generate MRF (Maximum Reimbursement Frequency) files. The application is built with a frontend in React and a backend API built using Hono (Node.js).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Running the Application](#running-the-application)
5. [Dependencies](#dependencies)

## Prerequisites

Before setting up the application, ensure that you have the following software installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/emefienem/claims-management-system.git
   cd claims-management-system
   cd frontend
   npm install
   npm run dev
   ```

## Backend Setup

cd backend
npm install
npm run dev

This will start the backend API at http://localhost:8080.

## Running the Application

Frontend: Open your browser and go to http://localhost:5173 to interact with the frontend.

Backend: The backend will be available at http://localhost:8080. The frontend communicates with the backend to upload claims, generate MRF files, and fetch the list of generated files.

# Login

You can log in as a dummy user by clicking the "Login as Dummy User" button on the frontend.
This will authenticate the user and allow access to the claims upload and MRF generation functionalities.

# File Upload

The "Upload Claims CSV" button allows users to upload CSV files containing claim data.
The application validates the claims and displays any errors in the UI.

# Approve Claims

After uploading the claims, you can approve them by clicking the "Approve Claims" button. This will trigger the creation of an MRF file, which will then be available for download.

# View MRF Files

The generated MRF files will be displayed in the "Generated MRF Files" section.

Dependencies
Frontend
react: The core React library for building the user interface.
react-dom: React's DOM renderer.
mobx: State management library used for the application’s global state.
mobx-react-lite: React bindings for MobX.
mantine/core: A component library for building modern UIs.
ag-grid-react: A grid library for displaying claims data in tabular format.
papaparse: A CSV parsing library to handle file uploads.
Backend
hono: A minimal and fast web framework for Node.js.
zod: A TypeScript-first schema validation library.
axios: HTTP client for making requests to the backend API from the frontend.
fs: File system module to interact with the file system (used to save MRF files).
path: Utility module to work with file and directory paths.
