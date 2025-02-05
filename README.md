# Blood Donation Application (Frontend)



## Admin Credentials
- **Admin Email**: admin@example.com
- **Admin Password**: password123

## Project Overview
The purpose of the Blood Donation Application is to create a user-friendly platform that facilitates blood donation activities. The application will connect donors with those in need of blood, promoting a seamless and efficient donation process.
Users can:
- Register as donors
- Request blood donations
- Manage their profiles

Admins have access to all features, including:
- User management
- Donation request management

Volunteers can create and manage donation requests.

## Features
- **User Registration**: 
  - Allows users to register as a donor by entering basic information:
    - Email
    - Name
    - Blood group
    - District and Upazila
- **User Login**: 
  - Authenticated users can log in to access their personalized dashboard.
- **Donor Dashboard**: 
  - Displays recent donation requests made by the logged-in donor.
  - Allows users to view, edit, or delete requests.
- **Admin Dashboard**: 
  - Provides the admin with an overview of user statistics.
  - Admins can manage users, donation requests, and content.
- **Volunteer Dashboard**: 
  - Volunteers can view and manage donation requests.
  - Volunteers can update the status of requests.
- **Responsive Design**: 
  - The application is fully responsive across mobile, tablet, and desktop views.
- **JWT Authentication**: 
  - Secure login and access management using JWT stored in cookies
- **Environment Variables**: 
  - Firebase and MongoDB credentials are stored securely in environment variables.
- **Notifications**: 
  - SweetAlert and Toast notifications are used for all CRUD operations and successful logins.

## Technologies Used
- **Frontend**: 
  - React, Tailwind CSS, React Router, TanStack Query
- **Backend**: 
  - Node.js, Express.js, MongoDB (connected via Mongoose)
- **Authentication**: 
  - JWT (JSON Web Tokens)
- **Payment Integration**: 
  - Stripe (for fundraising feature)
- **File Upload**: 
  - ImageBB API for user avatars

## Installation

### Prerequisites
- Node.js (v14 or later)
- NPM or Yarn

### Installation Steps
1. **Clone the repository of Frontend**:
    ```bash
    git clone https:https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-alamin20cse
    ```

2. **Install dependencies**:
    Use the package manager of your choice:
    - For NPM:
      ```bash
      npm install
      ```
    - For Yarn:
      ```bash
      yarn install
      ```

3. **Set up environment variables**:
    Create a `.env` file in the root of the project and add the following variables:
    ```bash
    REACT_APP_API_URL=http://localhost:5000/api
    REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
    REACT_APP_STRIPE_PUBLIC_KEY=your-stripe-public-key
    ```

4. **Start the development server**:
    To start the React application locally, run:
    ```bash
    npm start
    ```
    The app will be accessible at [http://localhost:3000](http://localhost:3000).
5. **Live link of site**:
   
     [http://localhost:3000](http://localhost:3000).


