# API Services Layer Architecture

This directory houses the data access and API integration services for the application.

## Architectural Principles

1. **Decoupled Data Access**: Components should not call `fetch` or `axios` directly. Instead, components invoke service functions (e.g. `authService.login()`, `userService.getProfile()`).
2. **Type Safety**: All service methods must return strongly-typed `ApiResponse<T>` promises.
3. **Module Isolation**: Organize services by domain/feature area (e.g. `auth/`, `users/`, `billing/`, `organization/`).

## Example Structure (for future steps)

```
src/services/
├── auth/
│   ├── auth.service.ts
│   └── auth.types.ts
├── users/
│   ├── user.service.ts
│   └── user.types.ts
└── index.ts
```
