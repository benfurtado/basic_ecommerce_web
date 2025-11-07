# Quick Start - IP Deployment

## Fastest way to get started:

### 1. Setup Environment (One-time setup)
```bash
./env-setup.sh
```

This will:
- Detect your server IP
- Create `backend/.env` with your IP
- Create `frontend/.env.local` with your IP

**⚠️ Important**: After running this, edit `backend/.env` and update:
- `DB_PASSWORD` - Your MySQL password
- `EMAIL_USER` and `EMAIL_PASS` - Your email credentials

### 2. Setup Database
```bash
# Make sure MySQL is running
sudo systemctl start mysql

# Create database
mysql -u root -p < backend/create-database.sql
# Or manually:
# mysql -u root -p
# CREATE DATABASE ecommerce_db;
```

### 3. Install Dependencies
```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

### 4. Start Both Servers
```bash
./start-all.sh
```

This will start:
- Backend on `http://YOUR_IP:3001`
- Frontend on `http://YOUR_IP:3000`

### 5. Access Your Application

Open your browser and go to:
```
http://YOUR_SERVER_IP:3000
```

Replace `YOUR_SERVER_IP` with your actual server IP address.

---

## Alternative: Using Systemd Services (Recommended for Production)

### Install Systemd Services
```bash
sudo ./install-systemd-services.sh
```

### Start Services
```bash
sudo systemctl start ecommerce-backend ecommerce-frontend
```

### Systemd Commands
```bash
# Status
sudo systemctl status ecommerce-backend
sudo systemctl status ecommerce-frontend

# Logs
sudo journalctl -u ecommerce-backend -f
sudo journalctl -u ecommerce-frontend -f

# Restart
sudo systemctl restart ecommerce-backend ecommerce-frontend

# Stop
sudo systemctl stop ecommerce-backend ecommerce-frontend

# Enable on boot
sudo systemctl enable ecommerce-backend ecommerce-frontend
```

See [SYSTEMD-DEPLOYMENT.md](./SYSTEMD-DEPLOYMENT.md) for detailed instructions.

---

## Alternative: Using PM2 (Production)

### Install PM2
```bash
npm install -g pm2
```

### Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow instructions
```

### PM2 Commands
```bash
pm2 list          # View running processes
pm2 logs          # View logs
pm2 restart all   # Restart all
pm2 stop all      # Stop all
```

---

## Firewall Setup

Make sure ports 3000 and 3001 are open:

```bash
# Ubuntu/Debian
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

---

## Troubleshooting

**Backend not accessible?**
- Check if running: `curl http://localhost:3001`
- Check firewall: `sudo ufw status`
- Check logs in terminal or PM2: `pm2 logs ecommerce-backend`

**Frontend not accessible?**
- Check if running: `curl http://localhost:3000`
- Verify `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Check logs: `pm2 logs ecommerce-frontend`

**CORS errors?**
- Make sure `FRONTEND_URL` in `backend/.env` matches `http://YOUR_IP:3000`

**Database errors?**
- Verify MySQL is running: `sudo systemctl status mysql`
- Check database credentials in `backend/.env`
- Test connection: `mysql -u root -p -e "USE ecommerce_db; SHOW TABLES;"`

---

For detailed instructions, see [IP-DEPLOYMENT.md](./IP-DEPLOYMENT.md)

