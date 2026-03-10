# Students Management System

A clean, professional Students Management application built with **React 18**, **Vite**, and **Material UI**. This application allows you to manage student records with full CRUD (Create, Read, Update, Delete) functionality and includes advanced features like real-time filtering and Excel export.

## 🚀 Features

- **Dynamic Student Management**: Add, update, and delete student records with instant UI updates.
- **Real-time Search Filter**: Filter the student list by name, email, or age instantly.
- **Excel Export**: Download the entire student list as an `.xlsx` file for offline use.
- **Responsive Table**: Paginated data table with customizable rows per page (5, 10, 25).
- **Form Validation**: Clean, inline validation for all student fields (Name, Email, Age).
- **Notifications**: Snackbar alerts for every action (success or error).
- **Premium UI**: Minimalist white theme using Material UI with a professional aesthetic.

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **UI Framework**: Material UI (MUI)
- **HTTP Client**: Axios
- **Excel Library**: xlsx
- **Icons**: MUI Icons

## ⚙️ Environment Configuration

The application is configured to communicate with a production backend. Create a `.env` file in the root directory with the following content:

```env
API_URL=https://student-backend-production-2228.up.railway.app/api
```

> [!NOTE]  
> The `vite.config.js` is pre-configured to support the `API_` environment variable prefix.

## 📦 Installation & Setup

1. **Clone the repository** (or copy the files).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up the environment**:
   Create a `.env` file with the `API_URL` as shown above.
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open the app**:
   Navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## 📡 API Integration

The app uses the following endpoints:

- **GET** `/students/all` - Fetch all students
- **POST** `/students` - Create a new student
- **PUT** `/students/:id` - Update an existing student record
- **DELETE** `/students/:id` - Remove a student

---

*Built with ❤️ for student data management efficiency.*
