# Context Providers

## Available Contexts
- `AuthContext`: Manages user authentication state
- `ProjectsContext`: Centralizes project data management
- `LanguageContext`: Handles i18n translations
- `ToastContext`: Global notification system

## Usage Pattern
```tsx
// In components:
const { user } = useAuthContext();
const { t } = useLanguageContext();
```

## Rules
1. Only create contexts for truly global state
2. Use context selectors for performance
3. Provide initial mock states for testing
4. Document consumption API in each context file