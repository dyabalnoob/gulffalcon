# Overview

This is a modern full-stack web application for a men's fashion company called "مؤسسة الصقر الخليجي" (Gulf Falcon Corporation). The application features a comprehensive product catalog, brand management, image gallery, and contact system designed specifically for Middle Eastern men's fashion including traditional garments like thobes, mishlahs, and bishts. The application is built with Arabic-first design and RTL (right-to-left) support, featuring modern UI components, animations, and glassmorphism design elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript and follows a modern component-based architecture:

- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui components with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for page transitions and component animations
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

The frontend follows a page-based architecture with components organized into:
- `/pages` - Main page components (Home, Products, Brands, Gallery, Contact)
- `/components` - Reusable UI components including layout components
- `/components/ui` - Shadcn/ui component library
- `/hooks` - Custom React hooks for shared logic
- `/lib` - Utility functions and query client configuration

## Backend Architecture
The backend is built using Express.js with TypeScript in ESM format:

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Data Storage**: In-memory storage implementation with interface for easy database migration
- **API Structure**: RESTful API endpoints organized by resource type
- **Development**: Vite middleware integration for hot reload during development

API endpoints follow RESTful conventions:
- `/api/brands` - Brand management (GET, POST)
- `/api/products` - Product catalog (GET, POST, filtered by brand)
- `/api/gallery` - Gallery items management
- `/api/contact` - Contact form submissions

## Database Schema
The application uses Drizzle ORM with PostgreSQL, featuring these main entities:

- **Users**: Basic user authentication system
- **Brands**: Fashion brand information with slugs for SEO-friendly URLs
- **Products**: Product catalog with brand relationships and tagging system
- **Gallery Items**: Image gallery for showcasing fashion items
- **Contact Messages**: Contact form submissions storage

Key design decisions:
- UUID primary keys for better scalability and security
- JSONB fields for flexible tag storage on products
- Timestamp tracking for all entities
- Foreign key relationships between products and brands

## Authentication and Authorization
Currently implements a basic user system structure through the database schema, though authentication middleware is not yet implemented. The architecture supports future implementation of:
- Session-based authentication
- Role-based access control
- User management system

## Development and Build Process
The application uses a modern development setup:

- **Development**: Vite dev server with Express backend integration
- **Build**: Separate frontend (Vite) and backend (esbuild) build processes
- **Database**: Drizzle Kit for database migrations and schema management
- **TypeScript**: Strict type checking across the entire codebase
- **Hot Reload**: Integrated Vite middleware for seamless development experience

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database using `@neondatabase/serverless`
- **Drizzle ORM**: Type-safe database operations with `drizzle-orm` and `drizzle-kit`

## UI and Styling
- **Radix UI**: Accessible component primitives for complex UI components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Animation library for page transitions and micro-interactions
- **Embla Carousel**: Carousel/slider functionality
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **ESBuild**: Fast JavaScript bundler for production builds

## Form and Data Management
- **React Hook Form**: Form state management and validation
- **Zod**: TypeScript-first schema validation
- **TanStack Query**: Server state management and caching
- **Date-fns**: Date manipulation and formatting utilities

## Utilities
- **Class Variance Authority**: Utility for creating component variants
- **clsx**: Conditional className utility
- **Tailwind Merge**: Intelligent Tailwind class merging
- **Nanoid**: URL-safe unique ID generator

The application is designed to be easily deployable to modern hosting platforms with support for both static and server-side rendering scenarios.