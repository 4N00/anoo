# Testing Utilities

## Key Files
- `test-utils.tsx`: Wraps components with providers
- `mockHelpers.ts`: Jest mocks for external services
- `fileMock.js`: Static asset mocking

## Testing Strategy
1. Unit Tests: Component logic with Jest
2. Integration: Component interactions with Testing Library  
3. E2E: User flows with Cypress
4. Mock Services: Supabase, Auth, API

## Usage Example
```tsx
// Component test
render(
  <TestProviders>
    <Component />
  </TestProviders>
)