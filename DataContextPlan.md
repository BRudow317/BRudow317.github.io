# ResumeSelector Implementation Plan

## Vision
Build a dynamic profile site that adapts to different job targets. The ResumeSelector allows switching between resume variants (Software Engineer, Data Engineer, Cloud, etc.) to emphasize relevant skills and projects when applying to specific roles. This will eventually filter WelcomePage, ResumePage, Resume export, TopBar, Footer, and projects.

---

## Step 1: Build ResumeSelector Component

**File:** `src/components/ui/ResumeSelector/ResumeSelector.tsx`

**Status:** Radix UI installed (`@radix-ui/react-select`)

### Data Source
**File:** `src/constants/SITE_CONTEXT.js` (✅ created)

```js
// id = value for DataContext, type = display label
{ id: "default", type: "Software Engineer" }
{ id: "software_engineer", type: "Software Engineer" }
{ id: "backend_engineer", type: "Backend Engineer" }
{ id: "data_engineer", type: "Data Engineer" }
{ id: "frontend_engineer", type: "Frontend Engineer" }
{ id: "cloud_engineer", type: "Cloud Engineer" }
```

### Radix UI Select Structure
```tsx
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { SITE_CONTEXT } from "../../../constants/SITE_CONTEXT";

<Select.Root value={value} onValueChange={onChange}>
  <Select.Trigger>
    <Select.Value placeholder="Resume Type" />
    <Select.Icon><ChevronDown /></Select.Icon>
  </Select.Trigger>

  <Select.Portal>
    <Select.Content position="popper">
      <Select.Viewport>
        {SITE_CONTEXT.map(ctx => (
          <Select.Item key={ctx.id} value={ctx.id}>
            <Select.ItemIndicator><Check /></Select.ItemIndicator>
            <Select.ItemText>{ctx.type}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
```

### Styling Approach
- Use inline styles with CSS variables (matches existing pattern)
- Key tokens: `var(--bg-1)`, `var(--bg-2)`, `var(--text-1)`, `var(--border-1)`, `var(--radius-sm)`

### Props (initial)
```tsx
interface ResumeSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}
```
Initially controlled via props. Later will connect to DataContext.

---

## Step 2: Create DataContext

**File:** `src/context/DataContext.jsx`

Following [ThemeContext.jsx](src/context/ThemeContext.jsx) pattern:
- `DataProvider` - wraps app, manages state
- `useData()` hook - consumer access
- `DataDomSync` - sets `data-site-context` attribute on document
- State stores `contextId` (e.g., `"frontend_engineer"`)
- `filteredSkills` computed from SKILLS_DATA where `skill.type` matches current context
- **Default: `"default"`**
- **Persistence: localStorage** - remembers user's choice across sessions

```jsx
// Context value shape
{
  contextId: "frontend_engineer",        // current selection id
  setContextId: (id) => void,            // setter
  currentContext: { id, type },          // full context object from SITE_CONTEXT

  // Pre-filtered data (or filter on-demand in components)
  filteredSkills: [...],
  filteredSummary: [...],
  filteredHistory: [...],
  // etc.
}
```

**Alternative:** Context only provides `contextId` and `currentContext`, components filter their own data using `currentContext.type`.

---

## Step 3: Wire Up & Integrate

- Add `DataProvider` to `src/App.jsx`
- Connect ResumeSelector to `useData()` hook
- Add ResumeSelector to TopBar

---

## Future Integration (after component works)

| Page/Component | Integration |
|----------------|-------------|
| [TopBar.jsx](src/features/Nav/TopBar.jsx) | Add ResumeSelector to `largeRender` (line 61-75) and `smallRender` (line 77-89) |
| [WelcomePage.jsx](src/pages/WelcomePage.jsx) | Filter skills via `useData().filteredSkills` |
| `src/pages/ResumePage.jsx` | Pass filtered skills to Resume component |
| [Resume.jsx](src/features/Resume/Resume.jsx) | Accept filtered skills from context or props |
| `src/features/Resume/ResumePDF.jsx` | Fix `skill.value` → `skill.text` bug |
| [DownloadResumeButton.jsx](src/features/Resume/DownloadResumeButton.jsx) | Pass filtered skills to PDF |
| Footer | Future: adapt based on selection |

---

## Files Summary

| File | Status | Changes |
|------|--------|---------|
| `package.json` | ✅ Done | @radix-ui/react-select installed |
| `src/constants/SITE_CONTEXT.js` | ✅ Done | Context options (5 types) |
| `src/components/ui/ResumeSelector/ResumeSelector.tsx` | 🔲 Next | Implement Radix Select component |
| `src/context/DataContext.jsx` | 🔲 Pending | Create context following ThemeContext pattern |
| `src/App.jsx` | 🔲 Pending | Add DataProvider |
| `src/features/Nav/TopBar.jsx` | 🔲 Pending | Add ResumeSelector |
| `src/pages/WelcomePage.jsx` | 🔲 Pending | Use filteredSkills |
| `src/pages/ResumePage.jsx` | 🔲 Pending | Use filteredSkills |
| `src/features/Resume/Resume.jsx` | 🔲 Pending | Accept filtered skills |
| `src/features/Resume/ResumePDF.jsx` | 🔲 Pending | Fix skill.value bug |
| `src/features/Resume/DownloadResumeButton.jsx` | 🔲 Pending | Pass filtered skills |

---

## Future Radix UI Opportunities

For consistency, consider these additions later:
- **Theme Toggle**: Replace cycling button with `@radix-ui/react-dropdown-menu`
- **Tooltips**: Add `@radix-ui/react-tooltip` to TopBar links
- **Dialogs**: Use `@radix-ui/react-dialog` for modals

---

## Verification

1. Dropdown renders and opens correctly
2. Selection changes work (console.log for now)
3. Styling matches site theme (CSS variables)
4. Responsive on mobile/desktop

---

## Data Architecture

### Relationship Key: `type`
All constant files use `type` as the relationship key to filter data by context.

```
SITE_CONTEXT.type  →  Filters all constants by matching type field
                      ↓
SKILLS_DATA         [{ type: "Software Engineer", ... }]
PROFESSIONAL_SUMMARY [{ type: "Software Engineer", ... }]
PROFESSIONAL_HISTORY [{ type: "Software Engineer", ... }]
PROJECT_DATA        [{ type: "Software Engineer", ... }]
RESUME_DATA         [{ type: "Software Engineer", ... }]
```

### DataContext Filtering with Fallback
```jsx
const { contextId, currentContext } = useData();
// currentContext.type = "Software Engineer"

// Helper: filter by type with "default" fallback
function filterByType(data, type) {
  const matched = data.filter(item => item.type === type);
  if (matched.length > 0) return matched;

  // Fallback to "default" type if no matches
  return data.filter(item => item.type === "default");
}

// Usage
const filteredSkills = filterByType(SKILLS_DATA, currentContext.type);
const filteredSummary = filterByType(PROFESSIONAL_SUMMARY, currentContext.type);
// etc.
```

### Fallback Strategy
- Each constant array should include items with `type: "default"` for core resume content
- If selected context (e.g., `"frontend_engineer"`) has no matching data, use `"default"` items
- `"default"` is NOT a selector option - it's only used as fallback data
- Ensures resume always has content even for partially-implemented contexts

**Note:** User will add `type` field (including `"default"`) to all constant structures.
