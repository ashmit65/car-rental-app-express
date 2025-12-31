# Central Cart Rental - Project Explanation

## **Project Overview**

A full-stack car rental management system built with Node.js and Express.js. This project demonstrates a complete web application with both public-facing website and admin dashboard functionality.

---

## **Tech Stack**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **View Engine:** Handlebars (HBS) for server-side rendering
- **Authentication:** Express-session with MongoDB session store
- **File Upload:** Multer for handling image uploads
- **Styling:** Bootstrap CSS framework

---

## **Architecture**

- **MVC Pattern** - Clean separation of concerns with Models, Views, and Controllers
- **Modular Routing** - Separate route files for frontend and admin sections
- **Middleware** - Custom middleware for authentication, body parsing, and role checking

---

## **Key Features**

### **Frontend (Public Website)**
- Homepage with car listings and featured content
- Car catalog page displaying available rental vehicles
- Testimonials section showcasing customer reviews
- Contact form for customer inquiries
- Additional pages: About, Services, Features

### **Admin Panel**
- **Car Management:** Full CRUD operations for rental cars
  - Add/edit car details (name, rating, rent, seating capacity, fuel type, transmission mode)
  - Upload and manage car images
  - Activate/deactivate cars
  
- **User Management:** Admin user CRUD operations
  - Create, read, update, and delete admin users
  - User profile management with image uploads
  
- **Testimonial Management:** CRUD operations for customer testimonials
  - Add, edit, and manage customer reviews
  - Upload testimonial images
  
- **Contact Management:** View and manage contact form submissions
  - Track customer inquiries and messages

- **Session-based Authentication:** Secure admin login/logout functionality

---

## **Technical Highlights**

- ✅ Image upload and storage system for cars, users, and testimonials
- ✅ Session management with MongoDB session store
- ✅ Form validation and error handling
- ✅ Responsive UI with Bootstrap
- ✅ Environment variables for secure configuration
- ✅ File path normalization for cross-platform compatibility
- ✅ Role-based access control

---

## **Project Structure**

```
├── controller/          # Business logic (MVC Controllers)
│   ├── admin/          # Admin controllers
│   └── frontController.js
├── models/             # Database schemas (Mongoose models)
├── views/              # Handlebars templates
│   ├── admin/         # Admin panel views
│   └── partials/      # Reusable components
├── routes/             # Route definitions
│   └── adminRoutes/   # Admin route modules
├── middleware/         # Custom middleware functions
├── public/            # Static assets (CSS, JS, images)
└── index.js           # Application entry point
```

---

## **Summary**

This is a **car rental management platform** with a public-facing website for customers to browse available vehicles and an admin dashboard for managing inventory, users, and customer interactions. The project follows MVC architecture principles with session-based authentication and comprehensive file upload capabilities.

**Perfect for demonstrating:**
- Full-stack development skills
- MVC architecture understanding
- Database operations with MongoDB
- File handling and uploads
- Session management
- Admin panel development

