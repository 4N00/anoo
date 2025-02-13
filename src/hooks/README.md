# Custom Hooks

## Purpose
Contains reusable React hooks for shared application logic.

## Existing Hooks
- `useProjects`: Manages project data fetching and state
- `useAuth`: (TODO) Authentication state management
- `useTheme`: (TODO) Theme switching functionality

## Hook Conventions
1. **Naming**: Prefix with `use` (e.g. useFeatureToggle)
2. **Testing**: Test all edge cases with mock providers
3. **Dependencies**: Clearly document hook dependencies
4. **Type Safety**: Full TypeScript type definitions

## Creating New Hooks
```tsx
// Template
export function useNewHook(initial: T) {
  const [state, setState] = useState(initial);
  
  useEffect(() => {
    // Side effects
  }, []);

  return { state };
}