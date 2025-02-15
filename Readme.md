# Electronics E-commerce Website

Welcome to the Electronics E-commerce Website! This project is a comprehensive online platform for purchasing electronic products, built using the MERN stack (MongoDB, Express, React, Node.js). The website offers a seamless and user-friendly shopping experience with secure payment options and efficient order management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [User Groups and Functionality](#user-groups-and-functionality)
- [Pages and Navigation](#pages-and-navigation)
- [Security and Authentication](#security-and-authentication)
- [API Testing](#api-testing)
- [Challenges and Learnings](#challenges-and-learnings)

## Features

- User-friendly navigation and responsive design
- Secure user authentication and authorization
- Comprehensive product listings with filtering options
- Detailed product information with images and specifications
- Shopping cart functionality with quantity updates and removal options
- Seamless checkout process with multiple payment options (Cash on Delivery, Razorpay)
- Order history tracking and profile management for users
- Admin functionalities for managing products, categories, and orders
- Efficient file uploads and image management using Multer and Cloudinary

## Technologies Used

- **Frontend**: React, Material UI, React Router DOM, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Payment Gateway**: Razorpay API
- **File Handling**: Multer, Cloudinary
- **Other Tools**: Postman (API testing), environment variables for sensitive data

## User Groups and Functionality

### Users:

- View, search, and add products to the shopping cart
- Update product quantities and remove products from the cart
- Place orders with secure payment options
- View order history and track order status
- Manage profile information

### Admin:

- Add, edit, and delete products
- Update stock quantities and prices
- Manage product categories
- View and update customer order statuses
- View user account details

## Pages and Navigation

- **Login / Sign Up**: User registration and login
- **User Home**: Featured products and categories
- **Product Listing**: All electronic products with filtering options
- **Product Detail**: Comprehensive product information
- **Shopping Cart**: Items in the cart with quantity updates and removal options
- **Checkout**: Payment methods and order review
- **Order History**: View past and current orders
- **User Profile**: Manage personal information
- **Admin Dashboard**: Overview of product quantity, orders, sales, and clients
- **Product Management**: Manage product details and stock
- **Category Management**: Manage product categories
- **Order Management**: View and update customer orders
- **Client Details**: View user accounts
- **Privacy Policy**: How customer information is collected and protected
- **Shipping Policy**: Shipping procedures, costs, and delivery times

## Security and Authentication

- JWT for secure user authentication and authorization
- bcrypt for hashing and securing passwords
- Environment variables for storing sensitive data

## API Testing

- Postman used for testing and validating backend APIs

## Challenges and Learnings

- **Complexity in Authentication**: Ensuring secure authentication using JWT
- **File Handling**: Managing file uploads and image storage with Multer and Cloudinary
- **Payment Integration**: Smooth integration of Razorpay API for payment processing
- **Cross-browser Compatibility**: Ensuring consistent functionality across different browsers and devices
