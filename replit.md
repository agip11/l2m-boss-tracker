# L2M Boss Tracker

## Overview

L2M Boss Tracker is a real-time boss spawn timer application for Lineage 2M game. It provides clan management features, Discord integration for notifications, and tracks boss kill records across multiple game regions (Gludio, Dion, Giran, Oren, Aden).

The application allows clan leaders and officers to:
- Track boss respawn timers with automatic spawn detection
- Register boss kills with participant tracking
- Manage clan members and roles
- Receive Discord notifications for spawn alerts
- Export clan data and kill records

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom gaming-themed dark mode design
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful JSON API under `/api/*` routes
- **Development**: tsx for TypeScript execution, hot reload via Vite middleware

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` - defines users, discord_config, boss_state, clans, clan_members, kill_records tables
- **Migrations**: Drizzle Kit for schema push (`npm run db:push`)

### Key Design Patterns
- **Shared Schema**: Database schema and types defined in `shared/` folder, imported by both client and server
- **API Storage Layer**: `server/storage.ts` provides abstracted database operations through IStorage interface
- **Client-Side Caching**: Boss state uses in-memory cache with server sync for real-time updates
- **Auto-Spawn Detection**: 10-minute timeout triggers automatic spawn state changes

### Authentication
- Mock authentication system with role-based access (Admin, Leader, Officer, Member)
- Session stored in localStorage
- Access code gate for public access protection

## External Dependencies

### Discord Integration
- **discord.js**: Bot client for server connectivity status
- **Webhooks**: HTTP webhook calls for spawn alerts and kill notifications
- Configuration stored in `discord_config` table per guild

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **drizzle-orm** + **postgres** driver for database operations

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `DISCORD_BOT_TOKEN`: Optional Discord bot token for status checks

### Third-Party UI Libraries
- Radix UI primitives for accessible components
- Lucide React for icons
- date-fns for date formatting
- Framer Motion for animations (via ChatWidget)

### Build & Development
- Vite for frontend bundling
- esbuild for server bundling (production)
- tsx for TypeScript execution (development)