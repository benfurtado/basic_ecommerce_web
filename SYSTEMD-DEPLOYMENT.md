# Systemd Service Deployment Guide

This guide explains how to deploy the ecommerce application as systemd services, allowing you to manage it with `systemctl` commands.

## Prerequisites

1. **Node.js and npm** installed
2. **MySQL** database installed and running
3. **sudo/root access** to install systemd services
4. **User account** (default: `ecommerce`) to run the services

## Quick Setup

### 1. Setup Environment Files

First, set up your environment files:

```bash
./env-setup.sh
```

Then edit `backend/.env` and update:
- `DB_PASSWORD` - Your MySQL password
- `EMAIL_USER` and `EMAIL_PASS` - Your email credentials

### 2. Install Systemd Services

Run the installation script with sudo:

```bash
sudo ./install-systemd-services.sh
```

This will:
- Copy service files to `/etc/systemd/system/`
- Set up environment files if needed
- Enable services to start on boot
- Set proper permissions

### 3. Start the Services

```bash
# Start both services
sudo systemctl start ecommerce-backend ecommerce-frontend

# Or start individually
sudo systemctl start ecommerce-backend
sudo systemctl start ecommerce-frontend
```

### 4. Check Status

```bash
# Check backend status
sudo systemctl status ecommerce-backend

# Check frontend status
sudo systemctl status ecommerce-frontend

# Check both at once
sudo systemctl status ecommerce-backend ecommerce-frontend
```

## Service Management Commands

### Start Services
```bash
sudo systemctl start ecommerce-backend
sudo systemctl start ecommerce-frontend
sudo systemctl start ecommerce-backend ecommerce-frontend
```

### Stop Services
```bash
sudo systemctl stop ecommerce-backend
sudo systemctl stop ecommerce-frontend
sudo systemctl stop ecommerce-backend ecommerce-frontend
```

### Restart Services
```bash
sudo systemctl restart ecommerce-backend
sudo systemctl restart ecommerce-frontend
sudo systemctl restart ecommerce-backend ecommerce-frontend
```

### Enable Services (Start on Boot)
```bash
sudo systemctl enable ecommerce-backend
sudo systemctl enable ecommerce-frontend
```

### Disable Services (Don't Start on Boot)
```bash
sudo systemctl disable ecommerce-backend
sudo systemctl disable ecommerce-frontend
```

### Check Service Status
```bash
sudo systemctl status ecommerce-backend
sudo systemctl status ecommerce-frontend
```

### Check if Services are Enabled
```bash
sudo systemctl is-enabled ecommerce-backend
sudo systemctl is-enabled ecommerce-frontend
```

## Viewing Logs

### View Recent Logs
```bash
# Backend logs
sudo journalctl -u ecommerce-backend -n 50

# Frontend logs
sudo journalctl -u ecommerce-frontend -n 50

# Both services
sudo journalctl -u ecommerce-backend -u ecommerce-frontend -n 50
```

### Follow Logs (Real-time)
```bash
# Backend logs (follow)
sudo journalctl -u ecommerce-backend -f

# Frontend logs (follow)
sudo journalctl -u ecommerce-frontend -f

# Both services (follow)
sudo journalctl -u ecommerce-backend -u ecommerce-frontend -f
```

### View Logs Since Today
```bash
sudo journalctl -u ecommerce-backend --since today
sudo journalctl -u ecommerce-frontend --since today
```

### View Logs Since a Specific Time
```bash
sudo journalctl -u ecommerce-backend --since "2024-01-01 00:00:00"
```

### View Logs Between Times
```bash
sudo journalctl -u ecommerce-backend --since "2024-01-01 00:00:00" --until "2024-01-01 23:59:59"
```

## Service Files

### Backend Service (`ecommerce-backend.service`)
- **Location**: `/etc/systemd/system/ecommerce-backend.service`
- **User**: `ecommerce`
- **Working Directory**: `/home/ecommerce/basic_ecommerce_web/backend`
- **Port**: 3001
- **Depends on**: MySQL service

### Frontend Service (`ecommerce-frontend.service`)
- **Location**: `/etc/systemd/system/ecommerce-frontend.service`
- **User**: `ecommerce`
- **Working Directory**: `/home/ecommerce/basic_ecommerce_web/frontend`
- **Port**: 3000
- **Depends on**: Backend service

## Manual Installation (Alternative)

If you prefer to install manually:

### 1. Copy Service Files

```bash
sudo cp ecommerce-backend.service /etc/systemd/system/
sudo cp ecommerce-frontend.service /etc/systemd/system/
```

### 2. Set Permissions

```bash
sudo chmod 644 /etc/systemd/system/ecommerce-backend.service
sudo chmod 644 /etc/systemd/system/ecommerce-frontend.service
```

### 3. Reload Systemd

```bash
sudo systemctl daemon-reload
```

### 4. Enable Services

```bash
sudo systemctl enable ecommerce-backend
sudo systemctl enable ecommerce-frontend
```

### 5. Start Services

```bash
sudo systemctl start ecommerce-backend
sudo systemctl start ecommerce-frontend
```

## Troubleshooting

### Service Fails to Start

1. **Check service status:**
   ```bash
   sudo systemctl status ecommerce-backend
   ```

2. **Check logs:**
   ```bash
   sudo journalctl -u ecommerce-backend -n 100
   ```

3. **Common issues:**
   - **Missing .env file**: Run `./env-setup.sh`
   - **Database not running**: `sudo systemctl start mysql`
   - **Port already in use**: Check what's using the port
   - **Permission issues**: Check file ownership
   - **Node modules missing**: Services will install automatically, but check logs

### Service Keeps Restarting

Check the logs to see why it's failing:
```bash
sudo journalctl -u ecommerce-backend -f
```

Common causes:
- Database connection errors
- Missing environment variables
- Port conflicts
- Permission issues

### Check if Ports are in Use

```bash
sudo netstat -tulpn | grep -E '3000|3001'
# or
sudo ss -tulpn | grep -E '3000|3001'
```

### Verify Environment Variables

The services use `.env` files. Make sure they exist and have correct values:

```bash
# Check backend .env
cat backend/.env

# Check frontend .env.local
cat frontend/.env.local
```

### Rebuild Services

If you need to rebuild:

```bash
# Stop services
sudo systemctl stop ecommerce-backend ecommerce-frontend

# Rebuild manually
cd backend
npm install
npm run build

cd ../frontend
npm install
npm run build

# Start services
sudo systemctl start ecommerce-backend ecommerce-frontend
```

### Service File Location

If you modify the service files, you need to:

```bash
# Edit the file in project directory first
nano ecommerce-backend.service

# Copy to systemd
sudo cp ecommerce-backend.service /etc/systemd/system/

# Reload systemd
sudo systemctl daemon-reload

# Restart service
sudo systemctl restart ecommerce-backend
```

## Service Dependencies

### Backend Service
- **After**: `network.target mysql.service`
- **Wants**: `mysql.service`
- This ensures MySQL is started before the backend

### Frontend Service
- **After**: `network.target ecommerce-backend.service`
- **Wants**: `ecommerce-backend.service`
- This ensures the backend is started before the frontend

## Environment Variables

Services automatically load environment variables from:
- **Backend**: `/home/ecommerce/basic_ecommerce_web/backend/.env`
- **Frontend**: `/home/ecommerce/basic_ecommerce_web/frontend/.env.local`

The `-` prefix in `EnvironmentFile=-` makes the file optional (won't fail if missing).

## Auto-start on Boot

Services are automatically enabled to start on boot after installation. To disable:

```bash
sudo systemctl disable ecommerce-backend
sudo systemctl disable ecommerce-frontend
```

To re-enable:

```bash
sudo systemctl enable ecommerce-backend
sudo systemctl enable ecommerce-frontend
```

## Security Considerations

1. **User Permissions**: Services run as the `ecommerce` user (not root)
2. **File Ownership**: Make sure project files are owned by the service user
3. **Environment Files**: Never commit `.env` files to version control
4. **Firewall**: Only open necessary ports (3000, 3001)
5. **Database**: Use strong passwords in `.env` files

## Removing Services

If you need to remove the systemd services:

```bash
# Stop and disable services
sudo systemctl stop ecommerce-backend ecommerce-frontend
sudo systemctl disable ecommerce-backend ecommerce-frontend

# Remove service files
sudo rm /etc/systemd/system/ecommerce-backend.service
sudo rm /etc/systemd/system/ecommerce-frontend.service

# Reload systemd
sudo systemctl daemon-reload
sudo systemctl reset-failed
```

## Useful Commands Summary

```bash
# Installation
sudo ./install-systemd-services.sh

# Start/Stop/Restart
sudo systemctl start ecommerce-backend ecommerce-frontend
sudo systemctl stop ecommerce-backend ecommerce-frontend
sudo systemctl restart ecommerce-backend ecommerce-frontend

# Status
sudo systemctl status ecommerce-backend ecommerce-frontend

# Logs
sudo journalctl -u ecommerce-backend -f
sudo journalctl -u ecommerce-frontend -f

# Enable/Disable on boot
sudo systemctl enable ecommerce-backend ecommerce-frontend
sudo systemctl disable ecommerce-backend ecommerce-frontend
```

## Accessing the Application

Once services are running:

- **Frontend**: `http://YOUR_SERVER_IP:3000`
- **Backend**: `http://YOUR_SERVER_IP:3001`

Replace `YOUR_SERVER_IP` with your actual server IP address.

