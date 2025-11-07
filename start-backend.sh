#!/bin/bash

# Script to start the backend server

echo "Starting Backend Server..."

cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "Warning: .env file not found. Using .env.ip as template."
    echo "Please copy .env.ip to .env and update with your configuration."
    if [ -f .env.ip ]; then
        cp .env.ip .env
        echo "Created .env from .env.ip. Please update the values."
    fi
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Build the project
echo "Building backend..."
npm run build

# Start the server
echo "Starting backend server on port 3001..."
npm run start:prod

