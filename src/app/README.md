# App Router Structure

## Next.js 13+ Architecture
```
app/
├── (auth)/               # Authentication routes group
├── api/                  # API endpoints
├── admin/                # Admin dashboard
├── about/                # About page
├── contact/              # Contact form
├── login/                # Authentication
└── layout.tsx            # Root layout
```

## Conventions
1. **Routing**: File-system based routing
2. **Components**: Page-specific components colocated
3. **Data Fetching**: Server Components by default
4. **Security**: Middleware for auth in src/middleware.ts

## Page Requirements
- Use .tsx extension for pages
- Export default function component
- Follow SEO metadata standards
- Client-side interactivity needs 'use client' directive

## API Routes
- Located in app/api/
- Route handlers in route.ts files
- Use Zod for input validation
- Rate limiting via src/lib/rate-limit.ts