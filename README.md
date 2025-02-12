# Anoo's Portfolio

## Features

- 🎨 Modern and minimalist design with smooth animations
- 🚀 Built with Next.js 14 and TypeScript
- 💅 Styled with Styled Components
- 🌍 Internationalization (EN/NL)
- 🌙 Dark/Light theme support
- 🔒 Authentication with Supabase
- 📧 Contact form with Resend email integration
- 🧪 Testing with Jest and Cypress
- 📱 Responsive design
- ⚡ Hybrid rendering (ISR + SSR)
- 🎭 Framer Motion animations

## Demo Admin Access

For showcase purposes only, you can access the admin panel with these
credentials:

```
Email: admin@admin.com
Password: admin
```

⚠️ Note: These credentials are for demonstration purposes only.

## Architecture

### Hybrid Rendering

The application uses a hybrid rendering approach for optimal performance and
security:

- **Incremental Static Regeneration (ISR)**
  - Public-facing pages (home, about, contact) use ISR
  - Static data is revalidated every hour
  - Enhanced with client-side interactivity
  - Optimized for performance and SEO

- **Server-Side Rendering (SSR)**
  - Admin panel is server-rendered for real-time data and security
  - Protected by server-side authentication checks
  - Automatic redirects for unauthorized access
  - Real-time data updates with optimistic UI

### Testing Strategy

The project employs a comprehensive testing approach:

- **End-to-End Testing (Cypress)**
  - Tests complete user flows and critical paths
  - Covers authentication and authorization
  - Tests responsive design across different viewports
  - Verifies API integration and data persistence
  - Ensures proper error handling

- **Unit Testing (Jest)**
  - Tests individual components in isolation
  - Verifies component logic and state management
  - Tests hooks and utility functions
  - Ensures proper rendering and props handling
  - Mocks external dependencies for reliable tests

## Getting Started

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
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your own values.

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest unit tests
- `npm run test:watch` - Run Jest tests in watch mode
- `npm run e2e` - Run Cypress E2E tests
- `npm run e2e:open` - Open Cypress test runner

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Styled Components](https://styled-components.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Supabase](https://supabase.io/) - Backend and authentication
- [Resend](https://resend.com/) - Email service
- [Jest](https://jestjs.io/) - Unit testing
- [Cypress](https://www.cypress.io/) - E2E testing

## Framework & Build

This project is built with:
- [Next.js 14](https://nextjs.org/) - React Framework
- [Node.js 20.11.0](https://nodejs.org/) - JavaScript Runtime
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Styled Components](https://styled-components.com/) - Styling

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── styles/             # Global styles and themes
├── translations/       # Language files
└── types/              # TypeScript types
```

## Build Configuration
- Build Command: `npm run build`
- Output Directory: `.next`
- Node Version: 20.11.0
- Framework: Next.js 14
- Deployment Platform: Vercel

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
