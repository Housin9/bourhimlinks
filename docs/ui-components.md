# UI Components

## Overview

All UI components in this project use **shadcn/ui** exclusively. **DO NOT create custom components** — always use or extend shadcn/ui components. This ensures consistency, maintainability, and leverages pre-built accessible components from the shadcn/ui library.

**Stack**: React 19 + Tailwind CSS 4 + shadcn/ui + TypeScript (strict mode)

## Core Principles

### 1. Use shadcn/ui First

- **Before building anything**, check if shadcn/ui has a component for it
- All UI logic, styling, and accessibility comes from shadcn/ui
- If you need to extend or customize, extend the existing shadcn/ui component
- Never create custom components that duplicate shadcn/ui functionality

### 2. Component Structure

Each shadcn/ui component follows this structure:

```
components/
├── ui/
│   ├── button.tsx          # shadcn/ui components
│   └── ...
└── FeatureName/            # Feature-specific components that compose ui components
    ├── FeatureName.tsx
    └── index.ts
```

**UI Components** (`components/ui/`): Pure shadcn/ui components - do not modify unless necessary
**Feature Components** (`components/FeatureName/`): Compose shadcn/ui components for specific features

### 3. TypeScript & Props

Define explicit TypeScript interfaces for all component props:

```typescript
import { ReactNode } from 'react';

interface FeatureComponentProps {
  title: string;
  description?: string;
  children: ReactNode;
  onAction: () => void;
  isLoading?: boolean;
}

export function FeatureComponent({
  title,
  description,
  children,
  onAction,
  isLoading = false,
}: FeatureComponentProps): ReactNode {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
    </div>
  );
}
```

**Rules**:
- No `any` types (TypeScript strict mode)
- Explicit return types on all function components (`ReactNode`)
- Default values for optional props
- Use interfaces, not type aliases, for component props

### 4. Styling with Tailwind CSS 4

All styling uses **Tailwind CSS 4** (not v3). Key points:

- Use Tailwind classes exclusively, not inline styles
- Leverage shadcn/ui's predefined color system (via CSS variables)
- Include dark mode support using `dark:` prefix
- No hardcoded colors — use semantic classes (`text-muted-foreground`, `border-input`, etc.)

**Example**:

```typescript
<div className="rounded-lg border border-input bg-background p-4 shadow-sm dark:bg-slate-950">
  <p className="text-foreground dark:text-slate-50">Content</p>
</div>
```

### 5. Dark Mode Support

All components must support dark mode:

- Use `dark:` prefixes for dark mode classes
- Use semantic Tailwind classes that respect the color scheme
- Test in both light and dark modes
- shadcn/ui components handle most dark mode automatically through CSS variables

**Example**:

```typescript
<button className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-slate-900 dark:hover:bg-slate-800">
  Click me
</button>
```

### 6. Component Organization

**Feature Components** should be organized by feature:

```
components/
├── ui/                     # shadcn/ui components only
├── UserProfile/
│   ├── UserProfile.tsx
│   ├── UserCard.tsx
│   └── index.ts           # Export public components
├── Dashboard/
│   ├── Dashboard.tsx
│   └── index.ts
└── ...
```

Export components from `index.ts`:

```typescript
// components/UserProfile/index.ts
export { UserProfile } from './UserProfile';
export { UserCard } from './UserCard';
export type { UserProfileProps, UserCardProps } from './UserProfile';
```

### 7. Composing shadcn/ui Components

**Correct**: Compose shadcn/ui components for higher-level features

```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function UserCard({ user, onEdit }: UserCardProps): ReactNode {
  return (
    <Card className="p-4">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-muted-foreground">{user.email}</p>
      <Button onClick={onEdit} variant="outline" size="sm">
        Edit
      </Button>
    </Card>
  );
}
```

**Incorrect**: Creating custom card, button, or other components that duplicate shadcn/ui

### 8. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserCard.tsx`, `Dashboard.tsx` |
| Props Interface | PascalCase + `Props` | `UserCardProps` |
| Directories | PascalCase | `components/UserProfile/` |
| Classes/Styles | kebab-case (Tailwind) | `rounded-lg`, `text-muted-foreground` |

### 9. shadcn/ui Installation & Updates

To add a new shadcn/ui component:

```bash
npx shadcn-ui@latest add [component-name]
```

This automatically places the component in `components/ui/`. Do not modify the installation location.

To check available components, see [shadcn/ui docs](https://ui.shadcn.com/docs/components).

### 10. Common shadcn/ui Components

Reference these commonly used components:

- **Button** - `components/ui/button.tsx`
- **Card** - `components/ui/card.tsx`
- **Input** - `components/ui/input.tsx`
- **Label** - `components/ui/label.tsx`
- **Dialog** - `components/ui/dialog.tsx`
- **Dropdown Menu** - `components/ui/dropdown-menu.tsx`
- **Table** - `components/ui/table.tsx`
- **Form** - `components/ui/form.tsx` (pairs with React Hook Form)

For a complete list, check the existing `components/ui/` directory and [shadcn/ui documentation](https://ui.shadcn.com).

## Code Quality Checklist

Before submitting component code, verify:

- [ ] Uses only shadcn/ui components (no custom UI components)
- [ ] All props have explicit TypeScript types
- [ ] No `any` types (strict mode compliance)
- [ ] Explicit return types on functions (`ReactNode`)
- [ ] Dark mode support with `dark:` classes
- [ ] No hardcoded values in styling (use Tailwind classes)
- [ ] Semantic color classes (`text-muted-foreground`, not custom colors)
- [ ] Proper component organization (feature components in named directories)
- [ ] Exported from `index.ts` for easy imports
- [ ] Comments explain *why*, not *what*
- [ ] No console.log in production code

## Anti-Patterns

**DON'T:**

```typescript
// ❌ Creating a custom button instead of using shadcn/ui
function CustomButton({ label }: { label: string }) {
  return <button className="px-4 py-2 bg-blue-500">{label}</button>;
}

// ❌ Using inline styles instead of Tailwind
const divStyle = { padding: '16px', backgroundColor: 'white' };
<div style={divStyle}>Content</div>

// ❌ Hardcoding colors instead of semantic classes
<div className="bg-#f3f4f6">Content</div>

// ❌ Not supporting dark mode
<div className="bg-white text-black">Content</div>

// ❌ Missing TypeScript types
function Card({ title, children }: any) { ... }
```

**DO:**

```typescript
// ✅ Use shadcn/ui Button
import { Button } from '@/components/ui/button';
<Button>Click me</Button>

// ✅ Use Tailwind classes
<div className="p-4 bg-background">Content</div>

// ✅ Use semantic colors
<div className="bg-card text-foreground dark:bg-slate-950">Content</div>

// ✅ Dark mode support
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">Content</div>

// ✅ Explicit types
interface CardProps {
  title: string;
  children: ReactNode;
}
```

## Common Tasks

### Adding a New Feature Component

1. Create a directory in `components/` with the feature name (PascalCase)
2. Compose shadcn/ui components to build your feature
3. Define TypeScript interfaces for props
4. Support dark mode with `dark:` classes
5. Export from `index.ts`
6. Test in both light and dark modes

### Extending a shadcn/ui Component

If you need to extend a shadcn/ui component:

```typescript
import { Button, type ButtonProps } from '@/components/ui/button';

interface PrimaryButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export function PrimaryButton({
  isLoading,
  disabled,
  children,
  ...props
}: PrimaryButtonProps): ReactNode {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </Button>
  );
}
```

### Using Forms

This project uses **React Hook Form** with shadcn/ui Form component:

```typescript
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function UserForm(): ReactNode {
  const form = useForm();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
