# Type Definitions

## Core Interfaces
```ts
interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

type SupabaseSchema = Database['public']['Tables'];
```

## Conventions
1. Use `.d.ts` for global type extensions
2. Prefer interfaces over types for public APIs  
3. Validate types at runtime with Zod schemas
4. Group related types in domain-specific files

## Best Practices
- Avoid `any` type
- Keep types close to their usage