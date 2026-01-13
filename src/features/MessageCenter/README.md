# MessageCenterPage

A Gmail/Outlook-style message center component for React + Vite applications.

## Features

- **Two-panel Layout**: Sidebar with conversation list, main panel with thread view
- **Rich HTML Rendering**: Safely renders HTML email content with XSS protection
- **Reply Composer**: Simple rich-text editor with bold/italic/link formatting
- **Optimistic Updates**: Instant UI feedback with rollback on failure
- **Draft Auto-save**: Drafts persist in sessionStorage
- **Toast Notifications**: Success/error feedback for user actions
- **Keyboard Shortcuts**: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link)

## Project Structure

```
MessageCenterPage/
├── index.js                    # Main export
├── MessageCenterPage.jsx       # Root page component
├── MessageCenterPage.module.css # CSS Module for pseudo-classes
├── components/
│   ├── index.js               # Barrel export
│   ├── Sidebar.jsx            # Conversation list sidebar
│   ├── ConversationRow.jsx    # Individual conversation row
│   ├── ThreadView.jsx         # Thread display panel
│   ├── Toolbar.jsx            # Action toolbar
│   ├── MessageBubble.jsx      # Single message display
│   ├── ReplyComposer.jsx      # Reply form
│   ├── RichTextEditor.jsx     # contentEditable editor
│   └── Toast.jsx              # Notification component
├── hooks/
│   ├── index.js               # Barrel export
│   └── useMessageCenter.js    # State management hook
├── services/
│   └── messageService.js      # Data layer with sessionStorage
└── utils/
    ├── sanitizer.js           # HTML sanitization
    └── dateUtils.js           # Date formatting
```

## Installation

1. Copy the `MessageCenterPage/` folder into your project (e.g., `src/pages/` or `src/features/`)

2. Install the required dependency:
   ```bash
   npm install lucide-react
   ```

3. Make sure you have `react-router-dom` installed (if not already):
   ```bash
   npm install react-router-dom
   ```

## React Router Integration

Add the route in your router configuration:

```jsx
// App.jsx or your router file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MessageCenterPage from './MessageCenterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/message-center" element={<MessageCenterPage />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

To link to the Message Center:

```jsx
import { Link } from 'react-router-dom';

<Link to="/message-center">Messages</Link>
```

## Service Layer API

The service layer (`services/messageService.js`) provides async functions:

```javascript
// List conversations (summaries for sidebar)
const conversations = await listConversations();

// Get full thread with all messages
const thread = await getThread(conversationId);

// Send a new message
const message = await sendMessage(conversationId, htmlBody);

// Delete a conversation
await deleteConversation(conversationId);

// Save a draft
await updateDraft(conversationId, htmlBody);

// Get saved draft
const draft = await getDraft(conversationId);

// Toggle star status
const isStarred = await toggleStarred(conversationId);

// Mark as read/unread
await markAsRead(conversationId, isRead);
```

### Simulating Failures

To test optimistic update rollback behavior:

```javascript
import { setSimulateFailures } from './services/messageService';

// Enable random failures (~20% of write operations)
setSimulateFailures(true);

// Disable
setSimulateFailures(false);
```

### Resetting Data

To reset to seed data:

```javascript
import { resetToSeedData } from './services/messageService';
resetToSeedData();
```

## Upgrading the Editor

The `RichTextEditor` component uses native `contentEditable`. For production use with complex editing needs, consider upgrading to a library.

### TipTap Integration

1. Install TipTap:
   ```bash
   npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link
   ```

2. Replace `RichTextEditor.jsx` content:
   ```jsx
   import { useEditor, EditorContent } from '@tiptap/react';
   import StarterKit from '@tiptap/starter-kit';
   import Link from '@tiptap/extension-link';

   function RichTextEditor({ value, onChange, placeholder }) {
     const editor = useEditor({
       extensions: [
         StarterKit,
         Link.configure({ openOnClick: false }),
       ],
       content: value,
       onUpdate: ({ editor }) => {
         onChange?.(editor.getHTML());
       },
     });

     return (
       <div>
         <Toolbar editor={editor} />
         <EditorContent editor={editor} />
       </div>
     );
   }
   ```

### Quill Integration

1. Install Quill:
   ```bash
   npm install react-quill
   ```

2. Replace component:
   ```jsx
   import ReactQuill from 'react-quill';
   import 'react-quill/dist/quill.snow.css';

   function RichTextEditor({ value, onChange, placeholder }) {
     return (
       <ReactQuill
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         modules={{
           toolbar: [
             ['bold', 'italic'],
             ['link'],
             [{ list: 'bullet' }],
           ],
         }}
       />
     );
   }
   ```

## Connecting to a Real Backend

To connect to a real API, modify `services/messageService.js`:

```javascript
const API_BASE = '/api';

export async function listConversations() {
  const response = await fetch(`${API_BASE}/conversations`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

export async function getThread(conversationId) {
  const response = await fetch(`${API_BASE}/conversations/${conversationId}`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

export async function sendMessage(conversationId, htmlBody) {
  const response = await fetch(`${API_BASE}/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bodyHtml: htmlBody }),
  });
  if (!response.ok) throw new Error('Failed to send');
  return response.json();
}

// ... etc
```

## Key React Concepts Demonstrated

### State Management
- **useState**: Local component state
- **Custom Hooks**: `useMessageCenter` encapsulates all state logic
- **Derived State**: Computed from other state (e.g., `filteredConversations`)

### Performance
- **useMemo**: Memoize expensive computations (HTML sanitization)
- **useCallback**: Stable function references for child components
- **React.memo**: Prevent unnecessary re-renders of list items

### Side Effects
- **useEffect**: Data fetching, subscriptions, DOM updates
- **useRef**: Mutable values that don't trigger re-renders

### Patterns
- **Optimistic Updates**: Immediate UI feedback with rollback
- **Lifting State Up**: State in parent, passed via props
- **Controlled Components**: Parent manages form state
- **Barrel Exports**: Clean import paths

## Customization

### Styling
- Inline styles (JS objects) are used for most styling
- CSS Module (`MessageCenterPage.module.css`) handles pseudo-classes
- Colors use a consistent slate/blue palette - modify to match your brand

### Adding Features
- **Labels/Folders**: Add to conversation data and filter in sidebar
- **Search API**: Connect search to backend instead of local filter
- **Attachments**: Add file upload in ReplyComposer
- **Real-time**: Add WebSocket listener in useMessageCenter hook

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses CSS Grid, flexbox, contentEditable
- sessionStorage for persistence (cleared on browser close)

## License

MIT
