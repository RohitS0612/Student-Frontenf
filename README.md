# 🎓 Students Management App

A modern, clean, and intuitive Student Management Application built with React 18, Vite, and Material UI. This app allows for full CRUD operations on student records, including search, pagination, and Excel export.

## ✨ Features

- **Add Student**: Quick-entry form with inline validation.
- **Student List**: Beautifully styled table with Material UI.
- **Live Search**: Filter students by Name, Email, or Age instantly.
- **Edit/Update**: Update student records via a professional modal dialog.
- **Delete**: Secure deletion with a confirmation dialog.
- **Excel Export**: Export the entire student list to a `.xlsx` file.
- **Responsive**: Fully functional on various screen sizes.
- **Premium UI**: White theme with clean spacing and high-quality Material UI components.

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Framework**: [Material UI (v5)](https://mui.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Utilities**: [XLSX](https://www.npmjs.com/package/xlsx) for Excel exports

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A running API server (default: `http://localhost:3000/api`)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
src/
├── api/            # API service calls
├── components/     # Reusable UI components
├── hooks/          # Custom hooks (data management, form logic)
├── App.jsx         # Main application layout
└── main.jsx        # Entry point
```

## 🎨 Theme Details
- **Primary Color**: #1976d2 (Blue)
- **Backgrounds**: #ffffff (Paper), #f9fafb (Page)
- **Typography**: Roboto / Inter

