# Trip Coach - Travel Booking Platform

This is a travel booking platform where tourists can search and book travel packages offered by local guides. The platform offers a user-friendly interface for tourists to browse and book travel packages, as well as manage their bookings and spending. The platform also offers a guide application workflow for users to apply as local guides, with features such as package management and booking management.

## 🚀 Live Demo

> [Trip Coach](https://0337-trip-coach-frontend-assignment.vercel.app)

> Frontend: [Trip Coach Client](https://github.com/Md-Firoz-Mahmud-Nur/0337-Trip_Coach_Frontend-Assignment_08-L2_M08_m_073-A_08-D_29_11_2025)

> Backend: [Trip Coach Server](https://github.com/Md-Firoz-Mahmud-Nur/0336-Trip_Coach_Backend-Assignment_08-L2_M08_m_073-A_08-D_29_11_2025)

## Features

### Role-based experience

The platform offers a role-based experience for tourists, guides, and admins, with different features and functionalities available based on the user's role.

### Tourist dashboard

The tourist dashboard provides features such as:

* Featured packages
* Bookings
* Spending stats

### Guide dashboard

The guide dashboard provides features such as:

* Package management
* Booking management
* Application status

### Admin dashboard

The admin dashboard provides features such as:

* User management
* Guide application management
* Package management
* Booking and revenue stats

### Authentication & Authorization

The platform uses a Redux-based auth state to manage user authentication and authorization. Users can log in and register, and protected routes are checked for ADMIN / GUIDE / TOURIST roles.

### Guide application workflow

The guide application workflow allows users to apply as local guides, with features such as:

* Form for users to apply as local guides with city, languages, bio, and links.
* Pending applications list for admin with Approve/Reject actions.

## Technology Stack

The technology stack for this platform includes:

* Framework & Language: Next.js (App Router, client components)
* State Management: Redux Toolkit (slices, async thunks)
* React-Redux hooks (useAppSelector, useAppDispatch)
* UI & Styling: Tailwind CSS
* shadcn/ui (Button, Card, Dialog, Table, etc.)
* Lucide React icons
* HTTP & API: Axios instance (apiClient) with typed API helpers in @/lib/api
* RESTful backend endpoints under /api/v1/.../

##  Local Setup

### 1️⃣ Clone & Install

```
git clone https://github.com/Md-Firoz-Mahmud-Nur/0337-Trip_Coach_Frontend-Assignment_08-L2_M08_m_073-A_08-D_29_11_2025.git
cd 0337-Trip_Coach_Frontend-Assignment_08-L2_M08_m_073-A_08-D_29_11_2025
npm install
```

### 2️⃣ Run Locally

```
npm run dev
```

## Environment Variables

Create a .env.local file in the project root and configure:

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

## Usage

### Tourist

1. Register/login as a normal user.
2. Browse packages, view details, and manage bookings from the dashboard.

### Guide

1. From the dashboard, open the "Become a guide" application page.
2. Submit the guide form; wait for admin approval.
3. After approval, create and manage your own packages from the guide packages page.

### Admin

1. Log in with an ADMIN account.
2. Use the admin dashboards to:
   * View and manage users, verify/block accounts.
   * Review pending guide applications and approve/reject.
   * Manage all packages and see aggregated booking/revenue stats.

## 👨‍💻 Developed by

### Md. Firoz Mahmud Nur

Full-Stack Web Developer

> 📧 firoznur5@gmail.com

> 📧 [Portfolio](https://nurweb.dev)
 
> 🔗 [LinkedIn](https://www.linkedin.com/in/md-firoz-mahmud-nur)
