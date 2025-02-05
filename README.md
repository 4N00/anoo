# Portfolio & Admin Dashboard

A modern, full-stack web application built with Next.js, featuring a public portfolio showcase and a secure admin dashboard.

## Features

✅ **Public Portfolio**
- Displays projects with images, descriptions, and details
- Responsive grid layout with filtering capabilities
- Optimized image loading and caching

✅ **Admin Panel (Protected)**
- Secure login with Supabase Auth
- Create, update, and delete projects
- Real-time updates using SWR

✅ **Security**
- Middleware API protection
- Rate limiting
- Input validation with Zod
- Secure session management

✅ **Performance**
- Static Site Generation (SSG) for public pages
- Optimized data fetching with SWR
- Image optimization and lazy loading
- Efficient caching strategies

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Styled Components
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Testing**: Jest, React Testing Library, Cypress
- **Deployment**: Vercel (Frontend), Supabase (Database)

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- PostgreSQL database
- Supabase account

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/anoo.git
   cd anoo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your credentials:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/anoo"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

5. Initialize the database:
   ```bash
   npm run prisma:migrate
   ```

### Development

Start the development server:
```bash
npm run dev
```

Run tests:
```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# Test coverage
npm run test:coverage
```

### Production

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Project Structure

```
anoo/
├── prisma/                   # Database schema & migrations
├── public/                   # Static assets
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── styles/             # Global styles & theme
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
├── .env.example            # Environment variables template
└── README.md              # Project documentation
```

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Document complex functions and components

### Testing

- Write unit tests for utilities and hooks
- Write integration tests for components
- Write E2E tests for critical user flows
- Maintain test coverage above 85%

### Git Workflow

1. Create feature branch from main
2. Make changes and commit
3. Write/update tests
4. Create pull request
5. Wait for review and CI checks
6. Merge to main

## Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Database (Supabase)

1. Create new Supabase project
2. Run migrations
3. Configure connection string
4. Set up backup schedule

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
