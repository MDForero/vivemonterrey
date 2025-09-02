# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server
```bash
npm run dev
# Runs Next.js development server with Turbopack on port 3000
```

### Build and Production
```bash
npm run build      # Build the application for production
npm start          # Start the production server
npm run lint       # Run ESLint for code quality checks
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.1.2 with App Router
- **Styling**: Tailwind CSS + Custom CSS (Bootstrap-based legacy styles)
- **UI Components**: Radix UI + shadcn/ui components
- **Database**: Supabase (PostgreSQL with real-time features)
- **Authentication**: Supabase Auth with middleware
- **File Upload**: Supabase Storage
- **Deployment**: Optimized for Vercel

### Project Structure

**Core Application**
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `utils/supabase/` - Supabase client configurations
- `lib/` - Utility functions and helpers
- `hooks/` - Custom React hooks

**Key Directories**
- `app/dashboard/` - Admin dashboard with nested layouts
- `components/ui/` - shadcn/ui components
- `components/layouts/` - Layout components (main site + dashboard)
- `components/index/` - Homepage-specific components
- `public/assets/` - Static assets and legacy CSS/JS files

### Application Flow

**Public Site (Tourism Platform)**
- Tourism directory for Monterrey, Casanare, Colombia
- Categories: Restaurants, Hotels, Activities, Attractions
- Dynamic routing: `/[categoria]/[negocio]` for business pages
- Room booking system for accommodations
- Menu ordering system for restaurants
- Contact forms with EmailJS integration

**Admin Dashboard**
- User authentication via Supabase
- Business management (CRUD operations)
- Room and product management
- Image upload with Supabase Storage
- Admin-only access with middleware protection

### Database Architecture
The application uses Supabase with these key entities:
- `categories` - Business categories (restaurants, hotels, etc.)
- `businesses` - Individual business listings
- `profiles` - User profiles linked to Supabase Auth
- `rooms` - Accommodation rooms (for hotels)
- `products` - Menu items (for restaurants)

### Styling System
- **Primary Framework**: Tailwind CSS with custom color scheme
- **Legacy Support**: Bootstrap CSS for complex layouts
- **Custom Colors**: `viveRed` brand color (#3F7D58)
- **Components**: shadcn/ui with Radix UI primitives
- **Responsive**: Mobile-first approach

### Key Features
- **SSR/SSG**: Server-side rendering with dynamic data fetching
- **Real-time**: Supabase real-time subscriptions
- **Image Optimization**: Next.js Image component with Supabase integration
- **SEO**: Dynamic metadata generation
- **Analytics**: Google Analytics integration
- **CRM**: Kommo integration for lead management

### Authentication & Authorization
- Supabase Auth handles user management
- Middleware protects dashboard routes
- Cookie-based session management
- Role-based access control

### Development Notes
- Uses `'use client'` directive extensively for interactive components
- Custom utility functions in `/utility/` for animations and UI interactions
- AOS (Animate On Scroll) library for animations
- React Slick for carousels and sliders
- Form handling with React Hook Form + Zod validation

### Important Configuration
- `next.config.mjs`: Includes server actions with 200mb body size limit
- `middleware.js`: Handles Supabase auth session updates
- `jsconfig.json`: Path aliases for cleaner imports (@/* and @css/*)
- Images are unoptimized due to Supabase storage integration
