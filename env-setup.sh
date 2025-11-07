#!/bin/bash

# Script to set up environment files for IP-based deployment

echo "========================================="
echo "Environment Setup for IP Deployment"
echo "========================================="

# Get the server's IP address
SERVER_IP=$(hostname -I | awk '{print $1}')
if [ -z "$SERVER_IP" ]; then
    read -p "Enter your server IP address: " SERVER_IP
fi

echo "Using server IP: $SERVER_IP"
echo ""

# Setup backend .env
echo "Setting up backend environment..."
cd backend
if [ ! -f .env ]; then
    cat > .env << EOF
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=oracle
DB_DATABASE=ecommerce_db

# Email Configuration (for OTP and order emails)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# Frontend URL
FRONTEND_URL=http://${SERVER_IP}:3000
EOF
    echo "Created backend/.env"
    echo "⚠️  Please update database and email credentials in backend/.env"
else
    echo "backend/.env already exists, skipping..."
fi
cd ..

# Setup frontend .env.local
echo ""
echo "Setting up frontend environment..."
cd frontend
if [ ! -f .env.local ]; then
    cat > .env.local << EOF
# Backend API URL
NEXT_PUBLIC_API_URL=http://${SERVER_IP}:3001
EOF
    echo "Created frontend/.env.local"
else
    echo "frontend/.env.local already exists, skipping..."
fi
cd ..

echo ""
echo "========================================="
echo "Environment setup complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Edit backend/.env and update:"
echo "   - DB_PASSWORD (your MySQL password)"
echo "   - EMAIL_USER and EMAIL_PASS (your email credentials)"
echo ""
echo "2. Make sure MySQL is running and database is created"
echo ""
echo "3. Run: ./start-all.sh"
echo ""

