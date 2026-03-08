# ILTMC - CloudPanel Deployment Guide

## Prerequisites
- CloudPanel installed on your server
- Node.js 18+ (CloudPanel supports this)
- MongoDB installed or MongoDB Atlas account
- Domain pointed to your server

---

## Step 1: Create Site in CloudPanel

1. Log in to CloudPanel admin panel
2. Go to **Sites** → **Add Site**
3. Select **Node.js** as the application type
4. Enter your domain name (e.g., `iltmc.yourdomain.com`)
5. Set Node.js version to **18.x or 20.x**
6. Click **Create**

---

## Step 2: Upload Files

### Option A: Using SSH/SFTP
1. Connect to your server via SSH or SFTP
2. Navigate to the site directory: `/home/[site-user]/htdocs/[domain]/`
3. Upload all files from the `frontend/` folder to this directory

### Option B: Using Git
```bash
cd /home/[site-user]/htdocs/[domain]/
git clone [your-repo-url] .
```

---

## Step 3: Configure Environment Variables

Create `.env` file in the site root:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
# OR for MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/iltmc?retryWrites=true&w=majority

DB_NAME=iltmc

# Security
JWT_SECRET=your-super-secret-key-change-this-in-production

# CORS (set to your domain)
CORS_ORIGINS=https://yourdomain.com
```

---

## Step 4: Install Dependencies & Build

SSH into your server and run:

```bash
cd /home/[site-user]/htdocs/[domain]/

# Install dependencies
npm install
# OR
yarn install

# Build the application
npm run build
# OR
yarn build
```

---

## Step 5: Configure CloudPanel Node.js Settings

In CloudPanel:
1. Go to your site → **Settings** → **Node.js**
2. Set the following:
   - **App Port**: `3000`
   - **Start Command**: `npm start` or `yarn start`
   - **Node.js Version**: 18.x or 20.x

---

## Step 6: Import Database

### Option A: Local MongoDB
```bash
# Copy the database dump to your server
mongorestore --db=iltmc /path/to/database_dump/iltmc/
```

### Option B: MongoDB Atlas
```bash
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net" --db=iltmc /path/to/database_dump/iltmc/
```

### Option C: Import JSON files
```bash
mongoimport --db=iltmc --collection=users --file=exports/users.json
mongoimport --db=iltmc --collection=ranks --file=exports/ranks.json
mongoimport --db=iltmc --collection=positions --file=exports/positions.json
mongoimport --db=iltmc --collection=chapters --file=exports/chapters.json
mongoimport --db=iltmc --collection=members --file=exports/members.json
mongoimport --db=iltmc --collection=rides --file=exports/rides.json
mongoimport --db=iltmc --collection=events --file=exports/events.json
```

---

## Step 7: Configure Reverse Proxy (if needed)

CloudPanel typically handles this automatically, but if you need custom config:

In CloudPanel → Site → **Vhost** settings, ensure:
```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

---

## Step 8: Start the Application

In CloudPanel:
1. Go to your site → **Node.js**
2. Click **Start** or **Restart**

Or via SSH:
```bash
pm2 start npm --name "iltmc" -- start
pm2 save
pm2 startup
```

---

## Step 9: SSL Certificate

In CloudPanel:
1. Go to your site → **SSL/TLS**
2. Click **Actions** → **New Let's Encrypt Certificate**
3. Select your domain and click **Create**

---

## Troubleshooting

### Check Logs
```bash
# Application logs
pm2 logs iltmc

# Or check CloudPanel logs
tail -f /home/[site-user]/logs/[domain]/error.log
```

### Common Issues

1. **Port already in use**
   ```bash
   lsof -i :3000
   kill -9 [PID]
   ```

2. **MongoDB connection error**
   - Check MONGO_URL in .env
   - Ensure MongoDB is running: `systemctl status mongod`
   - For Atlas: whitelist server IP in MongoDB Atlas Network Access

3. **Build fails**
   - Ensure Node.js version is 18+
   - Clear cache: `rm -rf node_modules .next && npm install && npm run build`

---

## Default Admin Credentials

- **Email**: admin@iltmc.com
- **Password**: admin123

⚠️ **IMPORTANT**: Change the admin password after first login!

---

## File Structure After Deployment

```
/home/[site-user]/htdocs/[domain]/
├── .env                 # Environment variables
├── .next/               # Built Next.js files
├── app/                 # Application source
├── components/          # UI components
├── hooks/               # React hooks
├── lib/                 # Utilities
├── node_modules/        # Dependencies
├── package.json         # Dependencies list
├── next.config.js       # Next.js config
└── tailwind.config.js   # Tailwind config
```

---

## Support

For issues with:
- **CloudPanel**: https://www.cloudpanel.io/docs/
- **MongoDB**: https://docs.mongodb.com/
- **Next.js**: https://nextjs.org/docs
