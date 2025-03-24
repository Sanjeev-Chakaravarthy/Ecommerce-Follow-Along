# E-Commerce Application

## 📌 Overview
This is a full-stack **E-Commerce Web Application** built with **Node.js**, **Express**, **MongoDB**, **JWT**, and **React**. It provides an online shopping experience where users can browse products, add them to the cart, place orders, and manage their profiles. Admin users have the ability to manage products, view orders, and handle user data securely.

## 🚀 Features
### 🔒 User Authentication
- Secure **JWT-based authentication** for login and registration.
- Profile management, including updating personal details and passwords.

### 🛍️ Product Management
- Users can browse and filter products by **category, price, and ratings**.
- Admins can **add, update, and delete** products.

### 🛒 Shopping Cart
- Add products to the cart, update quantities, and remove items.
- Real-time cart total updates, including **taxes and shipping costs**.

### 📦 Order Management
- Users can place orders and track their **order history**.
- Admins can manage orders, update order statuses, and track shipments.

### 🎛️ Admin Dashboard
- Dedicated admin panel for managing **users, products, and orders**.

## 🏗️ Tech Stack
### **Frontend**
- ⚛️ **React** – JavaScript library for building user interfaces.
- 🔄 **React Router** – Client-side routing for seamless navigation.
- 📡 **Axios** – Handling API requests efficiently.
- 🎨 **CSS** – For styling the UI.

### **Backend**
- 🟢 **Node.js** – JavaScript runtime for building the server.
- ⚡ **Express.js** – Framework for handling routes and middleware.
- 🍃 **MongoDB** – NoSQL database for storing user data, products, and orders.
- 🛠️ **Mongoose** – ODM (Object Data Modeling) library for MongoDB.
- 🔑 **JWT (JSON Web Token)** – Secure authentication and authorization.

## 🏁 Milestone 1
- ✅ Created a new repository and integrated it with VS Code.
- ✅ Added a **README.md** to document the project.
- ✅ Established the **core idea**: A fully functional **e-commerce platform** where users can browse products, make purchases, and track orders.

---

## 🚀 Milestone 3: Backend Foundation  

- ⚙️ **Environment Setup:** Initialized the backend, configured the environment, and installed all required dependencies.  
- 🌐 **Server Implementation:** Built an Express server with structured routing and implemented robust error handling for smooth operation.  
- 🗄️ **Database Integration:** Established a secure connection to MongoDB using Mongoose for efficient data management.  

---

# 🚀 Milestone 4  

## 👤 User Model  
- Created a basic user model with necessary fields.  

## 🔐 User Controller  
- Created a **POST** method for the `/sign-up` route.  
- Implemented user creation logic securely.  

## 📂 Multer Configuration  
- Configured Multer's destination and filename.  
- Made the `uploads` folder publicly accessible.  

---

# 🚀 Milestone 5  

### 📝 SignUp Implementation  
✅ Created a basic **Sign Up** page using **React**  
✅ Integrated **Axios** to send a **POST request** to the backend  

### 🎨 Styling  
✅ Styled `Signup.jsx` using **Styled Components** for a clean and modern UI  
✅ Applied **basic CSS** for responsiveness and better user experience  

---

## Milestone 6  

🔒 **Encryption:** Implemented password hashing in `userController.js` using `bcryptjs` before storing it in the database.  
🛡 **Secure Data Storage:** Stored user details safely while ensuring passwords remain encrypted.

---

## Milestone 7  

🔑 **Login Authentication:** Implemented a login endpoint in `userController.js` to validate user credentials.  
🔍 **Password Verification:** Used `bcryptjs` to compare the stored hashed password with the user's input.  
✅ **User Validation:** Checked if the user exists before attempting authentication.  

---