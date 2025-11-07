# Basic Ecommerce Application

A full-stack ecommerce application built with Next.js (TypeScript) frontend and NestJS (TypeScript) backend, featuring email-based OTP authentication and order management.

## Project Structure

```
assignment/
├── backend/          # NestJS backend application
│   ├── src/
│   │   ├── auth/     # Authentication module (OTP)
│   │   ├── products/ # Products module
│   │   ├── orders/   # Orders module
│   │   ├── entities/ # Database entities
│   │   ├── common/   # Shared services (Email)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/         # Next.js frontend application
    ├── app/          # Next.js app router pages
    │   ├── cart/     # Cart page
    │   ├── checkout/ # Checkout page
    │   ├── login/    # Login page
    │   └── page.tsx  # Home page
    ├── components/   # Reusable React components
    ├── store/        # Zustand state management
    ├── lib/          # API client utilities
    ├── types/        # TypeScript type definitions
    └── package.json
```

## Frontend

### Technology Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios

### Key Features
- Product listing page with grid layout
- Shopping cart functionality
- Email-based OTP authentication
- Checkout process with order placement
- Responsive design

### Setup Instructions

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Run development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Frontend Structure

- **Components**: Reusable UI components (ProductCard, Header, CartItem)
- **Store**: Zustand stores for cart and authentication state
- **Lib**: API client functions for backend communication
- **Types**: TypeScript interfaces for type safety

## Backend

### Technology Stack
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: TypeORM
- **Email**: Nodemailer

### Key Features
- RESTful API endpoints
- Email-based OTP authentication
- Product management
- Order processing with email notifications
- PostgreSQL database integration

### Setup Instructions

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up MySQL database:
   - Create a database named `ecommerce_db`
   - Update database credentials in `.env` file (default: root/oracle)

4. Create `.env` file:
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=oracle
DB_DATABASE=ecommerce_db

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

PORT=3001
```

5. Run database migrations (TypeORM will auto-create tables):
```bash
npm run start:dev
```

6. Seed products (optional):
   - You can add products via API or manually insert into database

The backend will be available at `http://localhost:3001`

### API Endpoints

#### Authentication
- `POST /auth/send-otp` - Send OTP to email
- `POST /auth/verify-otp` - Verify OTP
- `GET /auth/user/:email` - Get user by email

#### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID

#### Orders
- `POST /orders` - Create new order
- `GET /orders/user/:userId` - Get user orders

### Backend Structure

- **Modules**: Feature-based modules (auth, products, orders)
- **Entities**: Database models (User, Product, Order)
- **Services**: Business logic
- **Controllers**: API route handlers
- **Common**: Shared services (EmailService)

## Database Schema

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `otp` (Temporary OTP code)
- `otpExpiry` (OTP expiration time)
- `createdAt` (Timestamp)

### Products Table
- `id` (Primary Key)
- `name`
- `description`
- `price` (Decimal)
- `image` (URL)
- `stock` (Integer)

### Orders Table
- `id` (Primary Key)
- `userId` (Foreign Key to Users)
- `items` (JSON array of order items)
- `totalAmount` (Decimal)
- `status` (String)
- `createdAt` (Timestamp)

## Features

1. **Email OTP Authentication**: Users receive OTP via email for login
2. **Product Catalog**: Browse and view products
3. **Shopping Cart**: Add/remove items, update quantities
4. **Checkout**: Place orders with email confirmation
5. **Order Management**: Track orders and receive email notifications

## Development Notes

- Backend uses TypeORM with `synchronize: true` for development (set to `false` in production)
- Frontend uses client-side state management with Zustand
- CORS is enabled for local development
- Email service requires SMTP credentials (Gmail app password recommended)

## Deployment

### Frontend Deployment (Vercel) ✅ Recommended

**Yes, you can deploy the frontend on Vercel!** Vercel is perfect for Next.js applications.

#### Steps:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Add environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     ```
   - Deploy!

3. **Vercel will automatically:**
   - Detect Next.js
   - Install dependencies
   - Build and deploy
   - Provide HTTPS URL

### Backend Deployment (Separate Platform) ⚠️ Required

**The NestJS backend cannot run on Vercel** (Vercel is for serverless/frontend). Deploy it separately:

#### Recommended Platforms:

1. **Railway** (Easiest) - [railway.app](https://railway.app)
   - Supports Node.js apps
   - Provides MySQL database
   - Auto-deploys from GitHub

2. **Render** - [render.com](https://render.com)
   - Free tier available
   - Supports Node.js + MySQL

3. **Fly.io** - [fly.io](https://fly.io)
   - Good for Node.js apps

#### Backend Deployment Steps:

1. **Update TypeORM config** (set `synchronize: false` in production)
2. **Set environment variables:**
   ```
   DB_HOST=your-db-host
   DB_PORT=3306
   DB_USERNAME=your-db-user
   DB_PASSWORD=your-db-password
   DB_DATABASE=ecommerce_db
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3001
   ```

3. **Enable CORS** for your frontend domain:
   ```typescript
   // In backend/src/main.ts
   app.enableCors({
     origin: ['https://your-frontend.vercel.app'],
     credentials: true,
   });
   ```

4. **Build and deploy:**
   ```bash
   npm run build
   npm run start:prod
   ```

### Database Options:

- **Railway MySQL** (if using Railway)
- **PlanetScale** (serverless MySQL)
- **Supabase** (PostgreSQL alternative)
- **AWS RDS** (if using AWS)

### Important Notes:

⚠️ **Before deploying:**
- Update `NEXT_PUBLIC_API_URL` in frontend to point to your deployed backend
- Update CORS settings in backend to allow your Vercel domain
- Set `synchronize: false` in TypeORM for production
- Use environment variables for all sensitive data
- Ensure your database is accessible from your backend host

## Code Quality

- TypeScript for type safety
- Modular component structure
- Reusable components
- Clean separation of concerns
- Proper error handling
- RESTful API design

