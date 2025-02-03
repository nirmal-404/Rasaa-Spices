# MERN Stack Project

## Project Overview
This project is a MERN (MongoDB, Express, React, Node.js) stack-based web application designed to streamline project management. Each group member has a dedicated branch to implement complete CRUD functionality. Additionally, we utilize modern libraries and tools like Vite, Radix UI, and Shadcn UI to enhance development and user experience.

## Branching Structure
- **Default branch:** `main`
- **Feature branches:** Each group member will have two branches for development. I have created them for you

## Features

---

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (LTS version)
- **npm**
- **MongoDB** (local or cloud instance)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/Manusha-Nirmal-Perera/ITP-group-project.git
   cd ITP-group-project
   ```

2. **Install server dependencies**
   Navigate to the `server` folder and install dependencies:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   Navigate to the `client` folder and install dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup
1. Create a `.env` file in the `server` folder and add the following variables:
   ```env
   MONGO_URI=<your-mongodb-uri>
   PORT=5000 or free port (eg: 3000/4000 )
   JWT_SECRET=<your-secret-key>
   ```

2. For the client, create a `.env` file in the `client` folder:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Starting the Project
1. **Run the server**
   ```bash
   cd server
   npm run start
   ```

2. **Run the client**
   ```bash
   cd client
   npm run dev
   ```

The application will be available at `http://localhost:5173` by default.

---

## Tools and Libraries

### Frontend
- **React**: Library for building user interfaces
- **Vite**: Blazing-fast development tool for modern web applications
- **Radix UI**: Accessible and customizable React components
- **Shadcn UI**: Pre-styled components with Radix under the hood
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

### Backend
- **Node.js**: JavaScript runtime environment
- **Express**: Lightweight web application framework
- **MongoDB**: NoSQL database for storing project data

### State Management
- **Redux**: For managing global state in the application

---

## Contributing
Each team member works on their respective branches. Follow these steps:
1. Switch to your branch:
   ```bash
   git checkout <branch_name>
   ```
2. Stage the changes made
   ````bash
   git add .
   ````
2. Commit your changes with meaningful messages:
   ```bash
   git commit -m "<description>"
   ```
3. Push your changes to the remote branch:
   ```bash
   git push origin <branch_name>
   ```
4. Submit a pull request to the `main` branch when your feature is ready.

---
