# ILTMC - Intrepidus Leones Tripura Motorcycle Club

## Project Overview
Full-featured motorcycle club management application for ILTMC - Intrepidus Leones Tripura Motorcycle Club, Est. 2013

## Tech Stack
- **Frontend**: Next.js 14.2.3 (App Router)
- **Backend**: FastAPI (API proxy to Next.js)
- **Database**: MongoDB (local)
- **UI**: shadcn/ui components, Tailwind CSS
- **Authentication**: JWT-based auth

## Admin Credentials
- **Email**: admin@iltmc.com
- **Password**: admin123

## Download Links
- Full Package: /downloads/iltmc_full_package.tar.gz
- Website Only: /downloads/iltmc_website_complete.tar.gz
- Database Export: /downloads/database_export.tar.gz
- CloudPanel Guide: /downloads/CLOUDPANEL_DEPLOYMENT_GUIDE.md

## Core Features Implemented
- ✅ Home page with hero section, stats, and club info
- ✅ About section with club history/timeline
- ✅ Members section with member cards
- ✅ Rides section (upcoming rides)
- ✅ Events section
- ✅ Gallery section
- ✅ Join/Membership application form
- ✅ Contact section with form
- ✅ Admin Panel (login, dashboard, member/event/ride/gallery management)
- ✅ Member Login with security check

## Member Portal Features (March 8, 2026)
- ✅ **Self Attendance** - Members can record attendance for:
  - Club Meetings
  - Rides (with optional kilometer tracking)
  - Charity Events
- ✅ **Profile Picture Upload** - Members can upload their own profile picture
- ✅ **RP Sheet Preview** - Link to Excel RP sheet (manually added URL)
- ✅ **Member Chat** - Real-time messaging between club members
- ✅ **Edit Kilometers** - Members can update their total riding distance
- ✅ **Password Change** - Secure password update functionality
- ✅ **Clear Cache** - Clear browser cache to fix loading issues

## Performance Optimizations (March 10, 2026)
- ✅ **Loading Skeletons** - Admin dashboard shows skeleton loaders while loading
- ✅ **Page Loader** - Home page shows branded loading animation
- ✅ **Parallel API Calls** - All API calls now run in parallel for faster loading
- ✅ **Clear Cache Feature** - Admin and Member portals have cache clearing options

## Pages
- `/` - Main landing page
- `/admin` - Admin panel login & dashboard
- `/member` - Member login & profile

## API Routes
- `/api/[[...path]]` - Dynamic API proxy for all backend routes

## Project Status
- **Date**: March 8, 2026
- **Status**: Project successfully migrated from source files

## Next Actions
1. Connect to remote MongoDB if needed
2. Seed initial data (members, events, rides)
3. Push to GitHub using "Save to GitHub" feature

## User Personas
- **Club Members**: Access member portal, view events/rides
- **Admin**: Manage all club data, members, events, gallery
- **Visitors**: Browse club info, apply for membership
