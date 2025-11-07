#!/bin/bash

# Script to start both backend and frontend servers
# Uses background processes to run both simultaneously

echo "========================================="
echo "Starting Ecommerce Application"
echo "========================================="

# Get the server's IP address
SERVER_IP=$(hostname -I | awk '{print $1}')
echo "Server IP: $SERVER_IP"
echo ""

# Function to handle script exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Setup environment files if they don't exist
if [ ! -f backend/.env ] || [ ! -f frontend/.env.local ]; then
    echo "Setting up environment files..."
    ./env-setup.sh
fi

# Start backend in background
echo "Starting backend..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run build
npm run start:prod &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend in background
echo "Starting frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run build
HOSTNAME=0.0.0.0 PORT=3000 npm run start &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================="
echo "Servers are starting..."
echo "========================================="
echo "Backend: http://$SERVER_IP:3001"
echo "Frontend: http://$SERVER_IP:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

