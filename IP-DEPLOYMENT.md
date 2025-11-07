# IP-based Deployment Guide

This guide will help you deploy both the backend and frontend on a server accessible via IP address.

## Prerequisites

1. **Node.js and npm** installed (Node.js 18+ recommended)
2. **MySQL** database installed and running
3. **Server with a static IP address** or know your server's IP
4. **Firewall configured** to allow traffic on ports 3000 (frontend) and 3001 (backend)

## Quick Start

### 1. Get Your Server IP Address

```bash
# Find your server's IP address
hostname -I
# or
ip addr show
# or
ifconfig
```

Note down the IP address (e.g., `192.168.1.100` or your public IP).

### 2. Configure Backend

```bash
cd backend

# Copy the IP deployment environment template
cp .env.ip .env

# Edit .env and update the following:
# - DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE (your MySQL config)
# - EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS (your email config)
# - FRONTEND_URL=http://YOUR_SERVER_IP:3000 (replace YOUR_SERVER_IP with actual IP)
```

### 3. Configure Frontend

```bash
cd frontend

# Copy the IP deployment environment template
cp .env.ip .env.local

# Edit .env.local and update:
# - NEXT_PUBLIC_API_URL=http://YOUR_SERVER_IP:3001 (replace YOUR_SERVER_IP with actual IP)
```

### 4. Set Up Database

Make sure MySQL is running and create the database:

```bash
# Login to MySQL
mysql -u root -p

# Create database (or use the SQL file)
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

# Exit MySQL
exit;
```

You can also use the provided SQL file:
```bash
mysql -u root -p < backend/create-database.sql
```

### 5. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install
npm run build

# Install frontend dependencies
cd ../frontend
npm install
npm run build
```

### 6. Start the Servers

#### Option A: Use the startup scripts (Recommended)

Make scripts executable:
```bash
chmod +x start-backend.sh start-frontend.sh start-all.sh
```

**Start both servers together:**
```bash
./start-all.sh
```

**Or start them separately in different terminals:**
```bash
# Terminal 1 - Backend
./start-backend.sh

# Terminal 2 - Frontend
./start-frontend.sh
```

#### Option B: Manual start

```bash
# Terminal 1 - Backend
cd backend
npm run build
npm run start:prod

# Terminal 2 - Frontend
cd frontend
npm run build
HOSTNAME=0.0.0.0 PORT=3000 npm run start
```

## Access Your Application

Once both servers are running:

- **Frontend**: `http://YOUR_SERVER_IP:3000`
- **Backend API**: `http://YOUR_SERVER_IP:3001`

Replace `YOUR_SERVER_IP` with your actual server IP address.

## Using PM2 (Production Recommended)

For production, use PM2 to manage the processes:

### Install PM2
```bash
npm install -g pm2
```

### Create PM2 Ecosystem File

Create `ecosystem.config.js` in the root directory:

```javascript
module.exports = {
  apps: [
    {
      name: 'ecommerce-backend',
      cwd: './backend',
      script: 'npm',
      args: 'run start:prod',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOST: '0.0.0.0'
      }
    },
    {
      name: 'ecommerce-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run start',
      env: {
        HOSTNAME: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: 'production'
      }
    }
  ]
};
```

### Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow instructions to enable PM2 on system boot
```

### PM2 Commands
```bash
pm2 list              # List all processes
pm2 logs              # View logs
pm2 restart all       # Restart all processes
pm2 stop all          # Stop all processes
pm2 delete all        # Delete all processes
```

## Firewall Configuration

### Ubuntu/Debian (UFW)
```bash
sudo ufw allow 3000/tcp  # Frontend
sudo ufw allow 3001/tcp  # Backend
sudo ufw reload
```

### CentOS/RHEL (firewalld)
```bash
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

### Check if ports are listening
```bash
sudo netstat -tulpn | grep -E '3000|3001'
# or
sudo ss -tulpn | grep -E '3000|3001'
```

## Environment Variables Reference

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=ecommerce_db

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

NODE_ENV=production
PORT=3001
HOST=0.0.0.0
FRONTEND_URL=http://YOUR_SERVER_IP:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://YOUR_SERVER_IP:3001
```

## Troubleshooting

### Backend not accessible
1. Check if backend is running: `curl http://localhost:3001`
2. Check firewall rules
3. Verify HOST is set to `0.0.0.0` in backend
4. Check backend logs for errors

### Frontend not accessible
1. Check if frontend is running: `curl http://localhost:3000`
2. Verify HOSTNAME is set to `0.0.0.0` when starting Next.js
3. Check firewall rules
4. Verify `NEXT_PUBLIC_API_URL` points to correct backend IP

### CORS errors
1. Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
2. Or set `FRONTEND_URL` to allow all origins (not recommended for production)

### Database connection errors
1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check database credentials in backend `.env`
3. Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port already in use
```bash
# Find process using the port
sudo lsof -i :3000
sudo lsof -i :3001

# Kill the process
sudo kill -9 <PID>
```

## Using Nginx as Reverse Proxy (Optional)

For a more production-ready setup, use Nginx as a reverse proxy:

### Install Nginx
```bash
sudo apt update
sudo apt install nginx
```

### Nginx Configuration

Create `/etc/nginx/sites-available/ecommerce`:

```nginx
server {
    listen 80;
    server_name YOUR_SERVER_IP;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        rewrite ^/api/(.*) /$1 break;
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Enable and Start
```bash
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Then update:
- Frontend: `NEXT_PUBLIC_API_URL=http://YOUR_SERVER_IP/api`
- Backend: `FRONTEND_URL=http://YOUR_SERVER_IP`

## Security Considerations

1. **Use HTTPS**: For production, set up SSL certificates (Let's Encrypt)
2. **Firewall**: Only open necessary ports
3. **Database**: Use strong passwords and restrict access
4. **Environment Variables**: Never commit `.env` files to version control
5. **CORS**: Limit CORS to specific origins in production

## Testing

After deployment, test:

1. Access frontend: `http://YOUR_SERVER_IP:3000`
2. Check backend API: `http://YOUR_SERVER_IP:3001/products`
3. Test authentication flow
4. Test product browsing
5. Test order creation

## Support

If you encounter issues:
1. Check server logs
2. Verify all environment variables are set correctly
3. Check firewall and network settings
4. Verify database connection
5. Check CORS configuration

