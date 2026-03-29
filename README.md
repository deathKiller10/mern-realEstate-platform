# NexEstate: MERN Based Real Estate Brokering Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A full-stack, comprehensive real estate brokering platform designed to seamlessly connect property owners with prospective buyers and renters. 

This platform was developed as a collaborative academic project for the Master of Computer Application program at VIT Vellore by a team of 5 developers, showcasing robust system architecture, relational database management, and modern UI/UX principles.

## Key Features

* **Role-Based Access Control (RBAC):** Secure, dedicated workflows and dashboards for three distinct user types: **Buyers**, **Owners**, and **Admins**.
* **Threaded In-App Messaging:** A fully functional asynchronous inbox allowing buyers and owners to communicate securely within the platform, complete with unread message notifications.
* **Dynamic Property Management:** Owners can list properties, upload physical image files (handled via `multer`), and update property statuses (Available, Rented, Sold) in real-time.
* **Smart Search & Filtering:** A global search engine that queries the MongoDB database for property titles and locations, paired with frontend filtering.
* **Admin Moderation Dashboard:** A secure control panel for platform administrators to monitor listings, delete inappropriate properties, and block malicious users.
* **Defensive UI & Edge-Case Handling:** Automated UI adaptations for deleted properties, sold listings, and self-messaging prevention.

## Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Styling & Responsive Design)
* React Router DOM (Navigation & Protected Routes)
* Axios (API Integration)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database & ODM)
* JSON Web Tokens (JWT) & bcrypt.js (Authentication & Security)
* Multer (Multipart/form-data & Image Uploads)