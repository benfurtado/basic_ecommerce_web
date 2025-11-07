#!/bin/bash

# Script to install systemd services for ecommerce application

echo "========================================="
echo "Installing Systemd Services"
echo "========================================="

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    echo "This script needs to be run with sudo privileges"
    echo "Usage: sudo ./install-systemd-services.sh"
    exit 1
fi

PROJECT_DIR="/home/ecommerce/basic_ecommerce_web"
SERVICE_USER="ecommerce"

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Error: Project directory $PROJECT_DIR not found"
    exit 1
fi

# Check if user exists
if ! id "$SERVICE_USER" &>/dev/null; then
    echo "Error: User $SERVICE_USER not found"
    exit 1
fi

# Setup environment files if they don't exist
echo "Setting up environment files..."
cd "$PROJECT_DIR"
if [ -f "./env-setup.sh" ]; then
    sudo -u "$SERVICE_USER" ./env-setup.sh
else
    echo "Warning: env-setup.sh not found. Please create .env files manually."
fi

# Copy service files to systemd directory
echo ""
echo "Installing service files..."
cp "$PROJECT_DIR/ecommerce-backend.service" /etc/systemd/system/
cp "$PROJECT_DIR/ecommerce-frontend.service" /etc/systemd/system/

# Set proper permissions
chmod 644 /etc/systemd/system/ecommerce-backend.service
chmod 644 /etc/systemd/system/ecommerce-frontend.service

# Set ownership of project directory
chown -R "$SERVICE_USER:$SERVICE_USER" "$PROJECT_DIR"

# Reload systemd
echo ""
echo "Reloading systemd daemon..."
systemctl daemon-reload

# Enable services to start on boot
echo ""
echo "Enabling services to start on boot..."
systemctl enable ecommerce-backend.service
systemctl enable ecommerce-frontend.service

echo ""
echo "========================================="
echo "Installation complete!"
echo "========================================="
echo ""
echo "Service Management Commands:"
echo "  Start backend:    sudo systemctl start ecommerce-backend"
echo "  Start frontend:   sudo systemctl start ecommerce-frontend"
echo "  Start all:        sudo systemctl start ecommerce-backend ecommerce-frontend"
echo ""
echo "  Stop backend:     sudo systemctl stop ecommerce-backend"
echo "  Stop frontend:    sudo systemctl stop ecommerce-frontend"
echo "  Stop all:         sudo systemctl stop ecommerce-backend ecommerce-frontend"
echo ""
echo "  Status backend:   sudo systemctl status ecommerce-backend"
echo "  Status frontend:  sudo systemctl status ecommerce-frontend"
echo ""
echo "  View logs:        sudo journalctl -u ecommerce-backend -f"
echo "  View logs:        sudo journalctl -u ecommerce-frontend -f"
echo ""
echo "  Restart backend:  sudo systemctl restart ecommerce-backend"
echo "  Restart frontend: sudo systemctl restart ecommerce-frontend"
echo ""
echo "⚠️  Important:"
echo "1. Make sure to update backend/.env with your database and email credentials"
echo "2. Make sure MySQL is running: sudo systemctl start mysql"
echo "3. Make sure ports 3000 and 3001 are open in firewall"
echo "4. Start the services: sudo systemctl start ecommerce-backend ecommerce-frontend"
echo ""

