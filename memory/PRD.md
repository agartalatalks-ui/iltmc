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

## Download Links (Updated March 14, 2026)
- Full Website Package: /downloads/iltmc_website_20260314.tar.gz
- Database Export: /downloads/database_iltmc_20260314.tar.gz
- CloudPanel Guide: /downloads/CLOUDPANEL_DEPLOYMENT_GUIDE.md

## Core Features Implemented
- ✅ Home page with hero section, stats, and club info
- ✅ About section with club history/timeline
- ✅ Members section with member cards
- ✅ Rides section (upcoming rides)
- ✅ Events section
- ✅ Gallery section (separate page)
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
- ✅ **Member Chat** - Real-time messaging with emojis and online/last seen status
- ✅ **Edit Kilometers** - Members can update their total riding distance
- ✅ **Password Change** - Secure password update functionality
- ✅ **Clear Cache** - Clear browser cache to fix loading issues
- ✅ **Top Riders Leaderboard** - Yearly leaderboard (Jan-Dec) with year selector

## Top Riders Feature (March 14, 2026)
- ✅ **Yearly Leaderboard** - Data tracked per year (January - December)
- ✅ **Year Selector** - "This Year", "Last Year", or any year since 2013
- ✅ **Three Categories**: Kilometers, Charity Events, Meetings Attended
- ✅ **Admin Override** - Admins can manually set/override leaderboard values per year
- ✅ **Calculated vs Custom** - Shows calculated values from attendance + custom overrides

## Performance Optimizations (March 10, 2026)
- ✅ **Loading Skeletons** - Admin dashboard shows skeleton loaders while loading
- ✅ **Page Loader** - Home page shows branded loading animation
- ✅ **Parallel API Calls** - All API calls now run in parallel for faster loading
- ✅ **Clear Cache Feature** - Admin and Member portals have cache clearing options

## Admin Panel Enhancements
- ✅ **Gallery Management** - Add/edit/delete gallery images with URLs and captions
- ✅ **Footer Chapters** - Edit chapters displayed in footer (add/remove/reorder)
- ✅ **Google Site Verification** - Added meta tag for webmaster verification
- ✅ **Top Riders Management** - Edit leaderboard data per member per year

## Pages
- `/` - Main landing page
- `/admin` - Admin panel login & dashboard
- `/member` - Member login & profile
- `/gallery` - Separate gallery page
- `/members` - Public members list page

## API Routes
- `/api/[[...path]]` - Dynamic API proxy for all backend routes
- `/api/admin/leaderboard` - GET leaderboard data for admin
- `/api/admin/leaderboard/override` - POST/DELETE override data
- `/api/member/leaderboard` - GET leaderboard for members with year filter

## Project Status
- **Date**: March 14, 2026
- **Status**: Top Riders yearly feature implemented with admin override capability

## Next Actions
1. Email notifications integration for membership applications
2. Push to GitHub using "Save to GitHub" feature

## User Personas
- **Club Members**: Access member portal, view events/rides, participate in leaderboard
- **Admin**: Manage all club data, members, events, gallery, leaderboard overrides
- **Visitors**: Browse club info, apply for membership
