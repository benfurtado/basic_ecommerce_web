# Quick Start Guide

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (or MySQL)
- npm or yarn

## Setup Steps

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
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

**Important**: For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an App Password (not your regular password)
3. Use the App Password in `EMAIL_PASS`

Start MySQL and create the database:
```sql
CREATE DATABASE ecommerce_db;
```

Or run the SQL file:
```bash
mysql -u root -p < create-database.sql
```

Run the backend:
```bash
npm run start:dev
```

The backend will auto-create tables on first run.

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Run the frontend:
```bash
npm run dev
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Testing the Application

1. **Browse Products**: Go to the home page to see products
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click "Cart" in the header
4. **Checkout**: Click "Proceed to Checkout"
5. **Login**: Enter your email, receive OTP, verify it
6. **Place Order**: Complete the checkout process
7. **Check Email**: You should receive an order confirmation email

## Adding Products

You can add products by:
1. Inserting directly into the database
2. Using the seed file (modify `backend/src/seed.ts` and run it)
3. Creating an admin API endpoint (not included in basic setup)

## Notes

- The UI is built with Tailwind CSS and follows modern ecommerce patterns
- To match the Figma design exactly, you may need to adjust colors, spacing, and component styles
- All components are reusable and modular
- State management uses Zustand for simplicity
- Backend uses TypeORM for database operations

## Troubleshooting

**Backend won't start:**
- Check MySQL is running
- Verify database credentials in `.env`
- Ensure port 3001 is available
- Make sure `ecommerce_db` database exists

**Frontend can't connect to backend:**
- Verify backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend

**Email not sending:**
- Verify email credentials in `.env`
- For Gmail, use App Password, not regular password
- Check email service logs in backend console

