# HireAI - Client Documentation

## Overview

This repository contains the frontend user interface for the **HireAI** application. It is built with **React**, **Vite**, **Material-UI**, and **Tailwind CSS**, and is designed to run separately from the backend.

The client is suitable for deployment on **Vercel**.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Required Environment Variables](#required-environment-variables)
5. [Installation](#installation)
6. [Running the App](#running-the-app)
7. [Build](#build)
8. [Deployment on Vercel](#deployment-on-vercel)
9. [Detailed File and Component Explanation](#detailed-file-and-component-explanation)
   - [App.jsx](#appjsx)
   - [AuthContext.jsx](#authcontextjsx)
   - [Home.jsx](#homejsx)
   - [Login.jsx](#loginjsx)
   - [Register.jsx](#registerjsx)
   - [Dashboard.jsx](#dashboardjsx)
   - [Navbar.jsx](#navbarjsx)
   - [FileUpload.jsx](#fileuploadjsx)
   - [AnalysisResult.jsx](#analysisresultjsx)
   - [ScoreCard.jsx](#scorecardjsx)
   - [api.js](#apijs)
10. [Built-in React Hooks and Imports](#built-in-react-hooks-and-imports)
11. [Troubleshooting](#troubleshooting)

---

## Features

- Client-side routing using React Router DOM
- Authenticated pages with protected routes
- Login and registration flow
- Resume upload interface with drag-and-drop support
- Job role selection before analysis
- AI analysis result display with score cards and lists
- Responsive layout using MUI Grid and Tailwind classes
- Automatic token injection for API requests

---

## Tech Stack

- **React 19.2.4**: UI library
- **Vite**: Fast dev server and build tool
- **Material-UI (MUI) 7.3.9**: Component library
- **Tailwind CSS** via `@tailwindcss/vite`: Utility-first styling
- **React Router DOM 7.14**: Client-side routing
- **Axios 1.14**: HTTP client
- **React Dropzone 15.0.0**: File uploads
- **Emotion**: CSS-in-JS styling engine

---

## Folder Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── AnalysisResult.jsx
│   │   ├── FileUpload.jsx
│   │   ├── Navbar.jsx
│   │   └── ScoreCard.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Required Environment Variables

Create a `.env` file in the client directory if you need a custom API base URL.

```env
VITE_API_URL=https://your-backend-url.com/api
```

### Explanation

- `VITE_API_URL`: Optional. When present, this overrides the backend API base URL used by Axios.
- If omitted, the frontend defaults to `http://localhost:5000/api`.

---

## Installation

Install dependencies in the client folder:

```bash
cd client
npm install
```

---

## Running the App

```bash
npm run dev
```

This starts the Vite development server with hot module replacement.

Open the URL shown in the terminal, usually `http://localhost:5173`.

---

## Build

```bash
npm run build
```

This generates a production build in the `dist/` folder.

---

## Deployment on Vercel

### Recommended Settings

- Framework: `Vite`
- Root Directory: `/client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `VITE_API_URL` → backend API URL

### Notes

- Configure the backend URL for production with `VITE_API_URL`.
- Use the same API base path as your server, e.g. `https://your-render-backend.onrender.com/api`.

---

## Detailed File and Component Explanation

### App.jsx

**Purpose**: The root component that sets up routing, theming, and authentication context.

**Imports**:

- `BrowserRouter as Router`, `Routes`, `Route`, `Navigate` from `react-router-dom`
  - Provides client-side page navigation.
- `ThemeProvider`, `createTheme` from `@mui/material`
  - Provides a theme to all Material-UI components.
- `AuthProvider`, `useAuth` from `./context/AuthContext`
  - Wraps the application with authentication state.
- `Navbar`, `Home`, `Login`, `Register`, `Dashboard`
  - Page and navigation components.

**Key logic**:

- Defines a custom `theme` with primary and secondary colors.
- `ProtectedRoute` prevents unauthenticated access to `/dashboard`.
- `PublicRoute` redirects logged-in users away from `/login` and `/register`.
- The app renders the `Navbar` on every page.

**Why it is required**:

- Central routing and auth protection.
- UI theme consistency across all pages.

---

### AuthContext.jsx

**Purpose**: Provides authentication state and helper functions to the entire app.

**Imports**:

- `createContext`, `useState`, `useEffect`, `useContext` from `react`
- `authAPI` from `../services/api`

**What it stores**:

- `user`: currently logged in user object
- `loading`: whether auth state is being initialized
- `isAuthenticated`: true if user is logged in

**Functions**:

- `login(email, password)`
  - Calls backend login endpoint
  - Saves token and user to `localStorage`
  - Updates state
- `register(email, password)`
  - Calls backend register endpoint
  - Saves token and new user to `localStorage`
  - Updates state
- `logout()`
  - Clears token and user from `localStorage`
  - Resets state

**useEffect behavior**:

- On page load, checks localStorage for token
- If a token exists, calls `authAPI.getMe()` to validate it
- If validation fails, clears stored credentials

**Custom hook**:

- `useAuth()` returns the auth context object
- Throws error if used outside `AuthProvider`

**Why it is required**:

- Centralizes auth logic
- Prevents repeated authentication code in pages
- Provides a single source of truth for login state

---

### Home.jsx

**Purpose**: Landing page for visitors.

**Imports**:

- `Container`, `Typography`, `Button`, `Box`, `Grid`, `Paper` from `@mui/material`
- `Link` from `react-router-dom`
- `useAuth` from `../context/AuthContext`
- Material icons

**What it does**:

- Displays marketing content and hero section
- Shows a button that routes to `/dashboard` if authenticated
- Otherwise routes to `/register`

**Why it is required**:

- Provides the homepage and initial call-to-action.
- Encourages sign-up or login.

---

### Login.jsx

**Purpose**: Login form page.

**Imports**:

- `useState` from `react`
- `Link`, `useNavigate` from `react-router-dom`
- MUI components: `Container`, `Paper`, `TextField`, `Button`, `Typography`, `Box`, `Alert`, `CircularProgress`
- `useAuth` from `../context/AuthContext`

**What it does**:

- Stores email and password in `formData`
- Calls `login()` from auth context
- Shows errors from API failures
- Navigates to `/dashboard` after successful login

**Why it is required**:

- Handles user authentication on the client side.
- Provides a friendly UI for login.

---

### Register.jsx

**Purpose**: User registration page.

**Imports**:

- `useState` from `react`
- `Link`, `useNavigate` from `react-router-dom`
- MUI components: `Container`, `Paper`, `TextField`, `Button`, `Typography`, `Box`, `Alert`, `CircularProgress`
- `useAuth` from `../context/AuthContext`

**What it does**:

- Collects email, password, confirm password
- Validates passwords match and minimum length
- Calls `register()` from auth context
- Navigates to `/dashboard` after successful registration

**Why it is required**:

- Allows users to create new accounts.
- Ensures authentication state is established on sign-up.

---

### Dashboard.jsx

**Purpose**: Main authenticated page for resume upload and results.

**Imports**:

- `useState` from `react`
- `Container`, `Typography`, `Box` from `@mui/material`
- `FileUpload` and `AnalysisResult` components

**What it does**:

- Displays hero text and description
- Renders `FileUpload`
- Stores the analysis result in state
- Shows `AnalysisResult` once analysis is complete
- Scrolls to bottom after analysis

**Why it is required**:

- Central page for the app’s core functionality.
- Connects upload input with result display.

---

### Navbar.jsx

**Purpose**: Application navigation bar.

**Imports**:

- MUI components: `AppBar`, `Toolbar`, `Typography`, `Button`, `Box`
- `Link`, `useNavigate` from `react-router-dom`
- `useAuth` from `../context/AuthContext`

**What it does**:

- Shows app title/logo
- Displays login/register links when user is not authenticated
- Shows email, dashboard link, and logout button when authenticated
- Logs out the user and redirects to `/`

**Why it is required**:

- Provides consistent navigation across the app.
- Reflects user auth state visually.

---

### FileUpload.jsx

**Purpose**: Uploads resume files and triggers analysis.

**Imports**:

- `useState`, `useCallback` from `react`
- `useDropzone` from `react-dropzone`
- MUI components: `Button`, `Box`, `Typography`,`Paper`, `Select`, `MenuItem`, `FormControl`, `InputLabel`, `CircularProgress`, `Alert`
- `CloudUploadIcon` from `@mui/icons-material`
- `resumeAPI` from `../services/api`

**What it does**:

- Accepts PDF and DOCX files via drag-and-drop or click
- Validates file type and size
- Stores selected file and selected job role
- Sends file to backend using multipart form data
- Displays loading state and API error messages

**Why it is required**:

- Handles the file upload interface.
- Connects user input to backend analysis.

---

### AnalysisResult.jsx

**Purpose**: Displays the AI-powered resume analysis.

**Imports**:

- MUI components: `Paper`, `Typography`, `Box`, `Chip`, `LinearProgress`, `Grid`, `Card`, `CardContent`, `Divider`, `CircularProgress`
- Icons: `CheckCircleIcon`, `WarningIcon`, `LightbulbIcon`, `FormatColorTextIcon`

**What it does**:

- Shows an ATS score with a circular progress indicator
- Renders strengths, improvements, missing keywords, and formatting tips
- Uses responsive `Grid` layout to display cards side-by-side on larger screens

**Why it is required**:

- Presents the results of the AI analysis clearly.
- Turns raw AI JSON into a professional dashboard.

---

### ScoreCard.jsx

**Purpose**: Displays a single score card for the result dashboard.

**Imports**:

- MUI components: `Card`, `CardContent`, `Typography`, `Box`, `CircularProgress`

**What it does**:

- Renders a circular progress indicator and score value
- Uses color logic to show green/orange/red based on score

**Why it is required**:

- Provides reusable score visualizations.
- Simplifies the UI for results.

---

### api.js

**Purpose**: Sets up Axios for all API requests.

**Imports**:

- `axios`

**What it does**:

- Creates an Axios instance with base URL `VITE_API_URL` or `http://localhost:5000/api`
- Adds request interceptor to include JWT token from `localStorage`
- Adds response interceptor to handle `401 Unauthorized`
- Exports `authAPI` and `resumeAPI` methods

**Why it is required**:

- Keeps HTTP code centralized and reusable.
- Automatically manages authentication headers.

---

## Built-in React Hooks and Imports

### `useState`

- Manages local component state.
- Used for forms, loading states, and API responses.

### `useEffect`

- Runs code after component mount.
- Used in `AuthContext` to initialize auth state.

### `useContext`

- Reads global auth state from `AuthContext`.
- Used in `App.jsx`, `Navbar.jsx`, and other pages.

### `useCallback`

- Memoizes callback functions.
- Used in `FileUpload.jsx` for `onDrop`.

### `createContext`

- Creates a React context object for auth.
- Used in `AuthContext.jsx`.

### `BrowserRouter`, `Routes`, `Route`, `Navigate`

- Provide page navigation without page reload.
- Protect routes and redirect users.

---

## Troubleshooting

### `Cannot GET /` on frontend

- Make sure Vite is running in `client/`.
- Run `npm run dev` inside the `client` folder.

### `401 Unauthorized`

- Ensure token is stored in `localStorage`.
- Login again if the token is expired.
- Verify the backend URL is correct in `VITE_API_URL`.

### API not reachable

- Ensure backend server is running.
- Confirm API base URL uses `/api` suffix.

---

## Notes for Vercel

- Set `VITE_API_URL` in Vercel environment variables.
- Use the production API URL from Render or your server host.
- Do not store backend secrets in the client repository.
- The client only needs the API URL, not the server JWT secret.
