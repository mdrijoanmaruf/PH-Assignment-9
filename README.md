# TechBox Subscription Service

## Overview
TechBox is a modern subscription box service focused on tech gadgets and products. The platform allows users to discover, subscribe to, and manage various tech-related subscription boxes delivered on a monthly or quarterly basis.

## Live Demo
[Visit TechBox Subscription Service](https://boxsubscription.rijoan.com//) 

## Features

### User Authentication & Profile Management
- Email and password authentication
- Social media login integration
- User profile management
- Account settings and preferences

### Subscription Management
- Browse various tech subscription boxes
- Detailed subscription information and pricing
- Subscribe/unsubscribe functionality
- Subscription history tracking

### Review System
- Leave reviews and ratings for subscriptions
- View other customers' reviews
- Edit and delete your own reviews

### Wishlist Functionality
- Add/remove items from wishlist
- Easy access to saved items

### Responsive Design
- Fully responsive layout for all devices
- Modern UI with smooth transitions
- Intuitive user experience

## Technologies Used

### Frontend
- React 19 - UI library
- React Router 7 - Navigation and routing
- Tailwind CSS 4 - Styling and responsive design
- DaisyUI - UI component library
- React Icons - Icon library
- React Hot Toast - Toast notifications
- Swiper - Touch slider for featured boxes
- AOS - Animate on scroll library

### Backend & Database
- Firebase Authentication - User authentication
- Firestore - NoSQL database for reviews and user data
- Local Storage - Client-side data persistence

### Build Tools
- Vite - Build tool and development server
- ESLint - Code linting
- React Helmet Async - Document head management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
   ```
   git clone https://github.com/yourusername/subscription-box.git
   cd subscription-box
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Start the development server
   ```
   npm run dev
   ```

### Building for Production
```
npm run build
```

## Project Structure
- `/src` - Source code
  - `/Components` - Reusable UI components
  - `/Pages` - Page components
  - `/Provider` - Context providers
  - `/utils` - Utility functions
  - `/assets` - Static assets like images

## License
MIT
