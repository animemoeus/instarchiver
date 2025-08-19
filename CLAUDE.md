# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Instagram Archiver is a Next.js application for archiving and browsing Instagram stories and user profiles, built with Neo Brutalism design principles. The app uses React Query for data fetching and a custom UI component system.

## Development Commands

### Essential Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run prepare` - Setup Husky git hooks

### Code Quality

The project uses lint-staged with Husky for pre-commit hooks that automatically:

- Run ESLint with auto-fix on JS/TS files
- Format code with Prettier
- Apply to `.{js,jsx,ts,tsx,json,css,md}` files

## Architecture

### Core Structure

- **App Router**: Next.js 15 with app directory structure
- **Data Fetching**: React Query (@tanstack/react-query) with QueryProvider wrapper
- **Styling**: Tailwind CSS 4 with custom design tokens for Neo Brutalism
- **UI Components**: Custom component library in `/components/ui/`
- **Type Safety**: Full TypeScript with strict configuration

### Key Directories

- `/app/` - Next.js app router pages and layouts
  - `/stories/` - Instagram stories archiving features
  - `/users/` - User management and profile pages
  - `/types/instagram/` - TypeScript definitions for API responses
- `/components/ui/` - Reusable UI components following Neo Brutalism design
- `/components/providers/` - React context providers (QueryProvider)
- `/hooks/` - Custom React hooks

### API Integration

The app connects to `https://api.animemoe.us` for Instagram data:

- **Stories API**: `/instagram/stories/` with pagination, search, and user filtering
- **Users API**: `/instagram/users/` with search and pagination
- **Constants**: 12 items per page for consistent pagination
- **Error Handling**: Custom APIError class with status codes

### Data Flow

1. QueryProvider wraps the app with React Query configuration (1-minute stale time)
2. API services in `/services/api.ts` handle HTTP requests with error handling
3. Custom hooks (like `useStories`) manage query state and caching
4. Components receive data through React Query hooks

### Design System

Neo Brutalism principles enforced throughout:

- Bold, high-contrast colors
- Minimalist yet expressive UI elements
- Strong visual hierarchy
- WCAG 2.1 accessibility compliance
- Component reusability with design consistency

### Type System

Comprehensive TypeScript definitions in `/app/types/instagram/`:

- `InstagramUser` - User profiles with metadata
- `InstagramStory` - Story data with media URLs
- API response wrappers with pagination metadata
- Re-exported through barrel exports

### Environment Configuration

- Uses `NEXT_PUBLIC_INSTAGRAM_API_BASE_URL` for API base URL
- Defaults to `https://api.animemoe.us` if not set
- Client-side environment variables for API integration

## Development Guidelines

### Component Creation

1. Check existing components in `/components/ui/` for patterns
2. Follow Neo Brutalism design principles from project README
3. Use existing utilities from `/lib/utils.ts`
4. Implement proper TypeScript interfaces
5. Ensure accessibility compliance

### API Service Patterns

- Use the established `makeRequest` utility for consistent error handling
- Follow the pagination patterns (12 items per page)
- Include proper TypeScript return types
- Handle loading and error states with React Query

### Styling Conventions

- Tailwind classes following Neo Brutalism aesthetics
- Custom design tokens defined in Tailwind config
- High contrast ratios for accessibility
- Responsive design for all screen sizes

## Testing & Quality Assurance

Always run these commands before submitting changes:

- `npm run type-check` - Verify TypeScript compilation
- `npm run lint` - Check ESLint rules
- `npm run format` - Ensure consistent code formatting

The project has automated pre-commit hooks that will run these checks automatically.
