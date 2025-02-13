# Styles Architecture

## Structure
```
styles/
├── theme.tsx       # Theme configuration
├── GlobalStyles.ts # Global CSS reset/base styles
├── media.ts        # Responsive breakpoints
├── styled.d.ts     # Type declarations
└── themeConfig.ts  # Raw theme values
```

## Theming System
- Uses styled-components theme provider
- Access via `props.theme` in styled components
- Color palette defined in themeConfig.ts
- Breakpoints: mobileFirst approach

## Usage Guidelines
1. Prefer theme variables over hardcoded values
2. New component styles go in component directory
3. Global styles only for base HTML elements
4. Media queries use `media.ts` breakpoints

## CSS Methodology
- BEM naming convention for class names
- Component-scoped styles with CSS-in-JS
- Critical CSS extracted for first paint