#!/bin/bash

# Script to start the frontend server

echo "Starting Frontend Server..."

cd frontend

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Warning: .env.local file not found. Using .env.ip as template."
    echo "Please copy .env.ip to .env.local and update with your server IP."
    if [ -f .env.ip ]; then
        cp .env.ip .env.local
        echo "Created .env.local from .env.ip. Please update NEXT_PUBLIC_API_URL with your server IP."
    fi
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Build the project
echo "Building frontend..."
npm run build

# Start the server
echo "Starting frontend server on port 3000..."
# Next.js needs to bind to 0.0.0.0 to be accessible via IP
HOSTNAME=0.0.0.0 PORT=3000 npm run start

