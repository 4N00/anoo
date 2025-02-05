# Anoo Portfolio

A modern portfolio website built with Next.js, TypeScript, and Styled Components.

## Features

- 🎨 Modern and responsive design
- 🚀 Built with Next.js 14 and TypeScript
- 💅 Styled with Styled Components
- 🔒 Authentication with Supabase
- 🗄️ PostgreSQL database with Prisma ORM
- 🧪 Testing with Jest and Cypress
- 🐳 Docker support
- 📱 Mobile-first approach
- ⚡ Hybrid rendering (SSG + SSR)
- 🌙 Dark mode support (coming soon)

## Architecture

### Hybrid Rendering

The application uses a hybrid rendering approach for optimal performance and security:

- **Static Site Generation (SSG)**
  - Public-facing pages (home, about, contact) are statically generated at build time
  - Static data is revalidated every hour
  - Enhanced with client-side interactivity where needed
  - Optimized for performance and SEO

- **Server-Side Rendering (SSR)**
  - Admin panel is server-rendered for real-time data and security
  - Protected by server-side authentication checks
  - Automatic redirects for unauthorized access
  - Real-time data updates with optimistic UI

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- PostgreSQL database
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/4N00/anoo.git
cd anoo
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your own values:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

5. Set up the database schema:
```bash
npm run prisma:generate
npm run prisma:migrate
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run e2e` - Run Cypress tests
- `npm run docker:dev` - Run development environment in Docker
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework with hybrid rendering
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Styled Components](https://styled-components.com/) - Styling
- [Supabase](https://supabase.io/) - Backend and authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [Jest](https://jestjs.io/) - Unit testing
- [Cypress](https://www.cypress.io/) - E2E testing
- [Docker](https://www.docker.com/) - Containerization

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel (SSR)
│   └── [...public]/       # Public pages (SSG)
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # Shared UI components
├── context/              # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── styles/              # Global styles and themes
└── types/              # TypeScript type definitions
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
