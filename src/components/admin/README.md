# Admin Components

## Purpose
Provides administrative interface for managing projects and content. Handles CRUD operations with backend API and implements role-based access control.

## Key Components
- `AdminClient`: Main admin dashboard layout
- `ProjectForm`: Form for creating/editing projects
- `ProjectList`: Paginated list of projects with sort/filter

## Security
- Requires authenticated user with admin role
- API routes validate session cookies
- Sensitive operations require re-authentication

## Props
```ts
interface AdminProps {
  initialProjects: Project[];
  userRoles: string[];
}
```

## Styling
- Uses admin-specific theme extensions
- Form validation styles from src/styles/theme.tsx
- Responsive table layouts

## Testing
- E2E tests in cypress/e2e/admin.cy.ts
- Mock API responses in test-utils/mockHelpers.ts
- Validation error state tests