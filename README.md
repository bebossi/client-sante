# Current in development

# Santê Restaurant

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Authentication](#authentication)
- [User Roles](#user-roles)
- [Delivery Service](#delivery-service)
- [Appointment Booking](#appointment-booking)
- [Setup Instructions](#setup-instructions)

## Introduction

Santê is a restaurant located in Belo Horizonte, Minas Gerais, Brazil. This website was developed to improve the range of the restaurant and to make it easier for customers to learn about the restaurant and its offerings.

Customers can use the website to:

View the restaurant's complete menu with toppings and prices
Schedule an appointment to get their order
Pay for their order securely and conveniently

## Installation

```bash
git clone https://github.com/bebossi/client-sante.git

Navigate to the project directory:
cd client-sante

Install dependencies for both the server and client:
npm install

Set up your database and configure the environment variables for authentication methods, social login, and other project-specific settings.
add an .env file and set this keys:
VITE_APP_GOOGLE_MAPS_API_KEY=

npm run dev

```

## Features

### Authentication

The project uses multiple authentication methods to protect your data, including:

#### Cookies (HttpOnly):

Session management cookies that cannot be accessed by JavaScript, making them more secure.

#### JWT tokens:

Secure user authentication and authorization tokens that can be used to access protected resources.

### User Roles

#### The system supports three user roles:

##### Admin Users:

Have access to protected areas, including management of products, categories, orders, and toppings.

##### Normal Users:

Can interact with the menu, add products to the cart, and place orders.

##### Guest:

Created when a user visits the menu page without being logged in. Guests can interact with the cart and save their products to a database cart. When they log in or sign up, their cart is automatically updated with the products they saved.

Admin Dashboard
Admin users have access to a dashboard with the following information:

### Monthly sales statistics.

Sales reports and graphical representations.
Guest Users
When normal users access the menu page without logging in, a guest user profile is created in the database.
Guest users can interact with the menu and save their cart information in the database.

### Social Login

Users can sign up or log in using social login (e.g., OAuth) methods.
Upon social login, the guest user profile is updated to a normal user with email and password, and their cart information is retained.

### Cart Functionality

Normal users can interact with their cart, adding products, specifying quantities, and adding toppings if available.
Cart information is stored securely in the database for each user.

### End-to-End Testing

End-to-end testing is performed using Cypress in the client to ensure the application functions as expected.
Test scripts and procedures are provided for quality assurance.

### Delivery Service

We understand the importance of convenience for our customers. To enhance your dining experience, we offer a free delivery service for orders placed within a 2-kilometer radius of our restaurant location. This service ensures that your favorite Sante dishes can be enjoyed from the comfort of your home or office.

### Appointment Booking

At Sante, we believe in providing our customers with the utmost convenience. For those who prefer a planned dining experience, our appointment booking feature allows you to reserve a specific time for your order pickup or delivery. This ensures that your meal is ready exactly when you need it.

## License

[MIT](https://choosealicense.com/licenses/mit/)
