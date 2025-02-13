# Components Directory

## Structure
```
components/
├── atomic/              # Basic UI elements (Button, Input, etc)
├── composite/           # Combined components (Forms, Cards)
├── layout/              # Structural components (Header, Footer)
├── domain/              # Business-specific components
└── shared/              # Reusable cross-project components
```

## Conventions
1. **Naming**: Use PascalCase for component files
2. **Structure**: Each component has:
   - Component.tsx (main implementation)
   - styles.ts (styled-components)
   - *.test.tsx (Jest tests)
   - README.md (documentation)
3. **Props**: TypeScript interfaces required
4. **Testing**: Minimum 80% test coverage

## Dependency Rules
- Can import from: utils, hooks, styles
- Cannot import from: app, pages, api

## Contribution Guide
1. Add Storybook stories for visual testing
2. Document props in component README
3. Follow accessibility standards (WCAG 2.1 AA)