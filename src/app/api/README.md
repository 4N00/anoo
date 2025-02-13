# API Endpoints

## Route Structure
```
api/
├── auth/          # Authentication handlers
│   └── login/     
│       └── route.ts
├── projects/      # Project management
│   ├── [id]/     
│   ├── reorder/  
│   └── route.ts  
└── send/          # Contact form submission
    └── route.ts
```

## Request Handling
- Use Next.js Route Handlers
- Validate inputs with Zod schemas (src/lib/schema.ts)
- Rate limit sensitive endpoints
- Return standardized error responses (src/utils/error.ts)

## Security Practices
1. Validate session cookies for protected routes
2. Sanitize all user inputs
3. Use HTTPS-only cookies for auth
4. Rate limiting via token bucket algorithm

## Example Endpoint
```ts
// POST /api/projects
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.unauthorized();
  
  const data = await projectSchema.parseAsync(await req.json());
  const project = await createProject(data);
  
  return NextResponse.json(project);
}