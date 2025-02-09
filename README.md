# Taskflow - An 1840 Task assignment

This project is a **Task Management Application** built using **React**, **TypeScript**, and **Vite**. It provides an interactive Kanban-style task board with **drag-and-drop** functionality, task creation, and state management using **Zustand**.

## 🚀 Features

- Task creation, updating, and deletion
- **Drag-and-drop** support for task movement
- State management using **Zustand**
- **React Testing Library** with Jest for unit tests
- Built with **Vite** for fast development and optimized builds

## 🛠️ Tech Stack

- **React** (with TypeScript)
- **Vite** (for fast build and development)
- **Zustand** (for global state management)
- **React DnD** (for drag-and-drop support)
- **Jest & React Testing Library** (for unit testing)
- **ESLint & Prettier** (for code linting and formatting)

---

## 📖 Installation & Setup

Ensure you have **Node.js (>=16.0.0)** installed.

### 1️⃣ Clone the repository
```sh
git clone https://github.com/jawnchuks/taskflow-eighteen4orty
cd task-manager
```

### 2️⃣ Install dependencies
```sh
yarn install  # or npm install
```

### 3️⃣ Run the application
```sh
yarn dev  # or npm run dev
```
The app will be available at **http://localhost:5173**.

### 4️⃣ Run tests
```sh
yarn test  # or npm run test
```

---

## 🏗️ Project Structure
```
📂 src
├── 📂 components        # UI components
├── 📂 store             # Zustand state management
├── 📂 types             # TypeScript type definitions
├── 📂 utils             # Utility functions
└── 📂 tests             # Unit tests with Jest
```

---

## 📝 Development Approach

- **State Management:** We use Zustand for a simple yet powerful state management solution.
- **Testing:** We use **React Testing Library** and **Jest** to test key components, including task forms, drag-and-drop interactions, and store logic.
- **Performance Optimization:** Vite is used for **fast hot-module replacement (HMR)** and optimized builds.
- **Component Abstraction:** The UI is broken down into **reusable** components for better maintainability.

---

## ⚠️ Additional Notes

- **ESLint & Prettier** are configured to enforce code quality.
- **React DnD** is used for drag-and-drop task management.
- The application is structured to support **scalability** and further feature additions.

Feel free to contribute or raise issues! 🚀

