# MERN Stack Project

## Project Overview
This project is a MERN (MongoDB, Express, React, Node.js) stack-based web application designed to demonstrate the actions of an ecommerce system. Each group member has a dedicated branch to implement complete CRUD functionality. Additionally, we utilize modern libraries and tools like Vite, Radix UI, and Shadcn UI to enhance development and user experience.

## Branching Structure
- **Default branch:** `main`
- **Feature branches:** Each group member will have a branch for development.

## Features
   - **Add new products**
   - **Edit info of existing products**
   - **Delete/remove existing products**
     
   - **Add items to cart**
   - **Update cart quantity**
   - **Remove items from cart**

   - **Add new addresses (upto 3)**
   - **Edit address info**
   - **Delete addresses**
     
   - **Checkout**
      - paypal
      - payhere
     
   - **Add items to wishlist**
   - **Update wishlist items quantity**
   - **Remove items from wishlist**

---

## Getting Started

### Environment Setup
1. Create a `.env` file in the `client` folder and add the following variables:
   ```env
   MONGO_URI=<your-mongodb-uri>
   PORT=5000 or free port (eg: 3000/4000 )
   JWT_SECRET=<your-secret-key>
   ```

2. For the server, create a `.env` file in the `server` folder:
   ```env
   MONGO_URI=
   PORT=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   PAYPAL_CLIENT_ID=
   PAYPAL_CLIENT_SECRET=
   CLIENT_BASE_URL=
   ```

---

## Tools and Libraries

### Frontend
- **React**: Library for building user interfaces
- **Vite**: Blazing-fast development tool for modern web applications
- **Radix UI**: Accessible and customizable React components
- **Shadcn UI**: Pre-styled components with Radix under the hood
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

### Backend
- **Node.js**
- **Express**
- **MongoDB**

### State Management
- **Redux**: For managing global state in the application

---
