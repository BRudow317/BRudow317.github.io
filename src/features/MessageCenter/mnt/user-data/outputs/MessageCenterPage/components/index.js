/**
 * components/index.js
 * 
 * BARREL EXPORT PATTERN:
 * 
 * This file re-exports all components from a single location.
 * Instead of:
 *   import Sidebar from './components/Sidebar';
 *   import ThreadView from './components/ThreadView';
 * 
 * You can do:
 *   import { Sidebar, ThreadView } from './components';
 * 
 * Benefits:
 * - Cleaner import statements
 * - Encapsulation - internal file structure can change without affecting imports
 * - Easier to manage exports in one place
 * 
 * Note: This pattern can impact bundle size if your bundler doesn't tree-shake well.
 * Modern bundlers (Vite, webpack 5) handle this fine.
 */

// Layout components
export { default as Sidebar } from './Sidebar';
export { default as ThreadView } from './ThreadView';
export { default as Toolbar } from './Toolbar';

// Message display components
export { default as ConversationRow } from './ConversationRow';
export { default as MessageBubble } from './MessageBubble';

// Composer components
export { default as ReplyComposer } from './ReplyComposer';
export { default as RichTextEditor } from './RichTextEditor';

// UI components
export { default as Toast } from './Toast';
