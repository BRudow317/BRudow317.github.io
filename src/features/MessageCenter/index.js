/**
 * MessageCenterPage/index.js
 * 
 * MAIN EXPORT FILE
 * 
 * This file serves as the public API for the MessageCenterPage module.
 * Other parts of the application should import from this file:
 * 
 *   import MessageCenterPage from './MessageCenterPage';
 *   // or
 *   import { MessageCenterPage } from './MessageCenterPage';
 * 
 * ENCAPSULATION:
 * 
 * By only exporting the main component, we hide the internal structure.
 * Consumers don't need to know about:
 * - Internal components (Sidebar, ThreadView, etc.)
 * - Hooks (useMessageCenter)
 * - Services (messageService)
 * - Utilities (sanitizer, dateUtils)
 * 
 * This makes it safe to refactor the internals without breaking consumers.
 * 
 * ADDITIONAL EXPORTS:
 * 
 * If other parts of the app need access to internals (e.g., for testing
 * or composition), you can export them explicitly:
 * 
 *   export { Sidebar } from './components';
 *   export { useMessageCenter } from './hooks';
 *   export * as messageService from './services/messageService';
 */

// Default export - the main page component
export { default } from './MessageCenterPage';

// Named export - same component, different import style
export { default as MessageCenterPage } from './MessageCenterPage';

/**
 * USAGE EXAMPLES:
 * 
 * Default import:
 *   import MessageCenterPage from './MessageCenterPage';
 *   <MessageCenterPage />
 * 
 * Named import:
 *   import { MessageCenterPage } from './MessageCenterPage';
 *   <MessageCenterPage />
 * 
 * In React Router:
 *   import MessageCenterPage from './MessageCenterPage';
 *   <Route path="/message-center" element={<MessageCenterPage />} />
 */
