/**
 * MessageCenterPage.jsx
 * 
 * MAIN PAGE COMPONENT
 * 
 * This is the root component for the Message Center feature.
 * It orchestrates all the child components and connects them to state.
 * 
 * ARCHITECTURE OVERVIEW:
 * 
 * MessageCenterPage (this file)
 * ├── useMessageCenter hook (state management)
 * ├── Sidebar
 * │   └── ConversationRow (for each conversation)
 * ├── ThreadView
 * │   ├── Toolbar
 * │   ├── MessageBubble (for each message)
 * │   └── ReplyComposer
 * │       └── RichTextEditor
 * └── Toast (notifications)
 * 
 * DATA FLOW:
 * 
 * 1. useMessageCenter hook manages all state and service calls
 * 2. This component receives state and handlers from the hook
 * 3. State is passed down as props to child components
 * 4. Child components call handlers (passed as props) for actions
 * 5. Handlers update state, which flows back down through props
 * 
 * This is the "lifting state up" pattern - state lives at the highest
 * level needed, and flows down through props.
 * 
 * REACT ROUTER INTEGRATION:
 * 
 * This component is designed to be used as a route component:
 * 
 * <Route path="/message-center" element={<MessageCenterPage />} />
 * 
 * For more advanced routing (e.g., /message-center/:conversationId),
 * you could use useParams() to get the conversation ID from the URL
 * and sync it with the selectedId state.
 */

import React, { useCallback } from 'react';
import { Sidebar, ThreadView, Toast } from './components';
import { useMessageCenter } from './hooks';
import styles from './MessageCenterPage.module.css';

/**
 * MessageCenterPage - The main Message Center page component.
 * 
 * This component:
 * 1. Uses the useMessageCenter hook for state management
 * 2. Renders the sidebar and thread view
 * 3. Passes state and handlers to child components
 * 4. Handles toast notifications
 */
function MessageCenterPage() {
  /**
   * HOOK USAGE:
   * 
   * The useMessageCenter hook returns all state and handlers we need.
   * We destructure them here for easy access.
   * 
   * This is a form of dependency injection - the component doesn't know
   * or care where the data comes from or how it's stored.
   */
  const {
    // State
    conversations,
    selectedId,
    selectedThread,
    drafts,
    isLoadingList,
    isLoadingThread,
    toast,
    
    // Actions
    selectConversation,
    clearSelection,
    sendMessage,
    deleteConversation,
    toggleStar,
    toggleRead,
    updateDraft,
    refresh,
    hideToast,
    showToast,
  } = useMessageCenter();

  /**
   * HANDLER WRAPPERS:
   * 
   * These wrap the hook's handlers with any additional logic needed.
   * For example, adding confirmation dialogs or analytics tracking.
   * 
   * useCallback ensures the functions maintain referential equality
   * across renders, preventing unnecessary re-renders of child components.
   */
  
  /**
   * Handle conversation deletion with confirmation.
   */
  const handleDelete = useCallback(() => {
    // In a real app, you might show a confirmation modal here
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      deleteConversation(selectedId);
    }
  }, [deleteConversation, selectedId]);

  /**
   * Handle forward action.
   * This is a placeholder - forward functionality would require
   * additional UI for selecting recipients.
   */
  const handleForward = useCallback(() => {
    showToast('Forward functionality coming soon!', 'info');
  }, [showToast]);

  /**
   * Handle copy to clipboard success.
   * Called by ThreadView after successful copy.
   */
  const handleCopySuccess = useCallback(() => {
    showToast('Copied to clipboard', 'success');
  }, [showToast]);

  /**
   * Handle download success.
   */
  const handleDownloadSuccess = useCallback(() => {
    showToast('Downloaded conversation', 'success');
  }, [showToast]);

  /**
   * Get the current draft for the selected conversation.
   * This is derived state - computed from other state values.
   */
  const currentDraft = selectedId ? (drafts[selectedId] || '') : '';

  /**
   * INLINE STYLES:
   * 
   * The main container uses CSS Grid for the two-column layout.
   * Defined in the CSS module for pseudo-class support (media queries).
   */

  return (
    /**
     * MAIN CONTAINER:
     * 
     * The container class from CSS Module provides:
     * - CSS Grid layout with sidebar and main content columns
     * - Full viewport height
     * - Responsive adjustments via media queries
     */
    <div className={styles.container}>
      {/* 
        SIDEBAR:
        
        Displays the list of conversations.
        Receives:
        - conversations: Array of conversation summaries
        - selectedId: Currently selected conversation (for highlight)
        - isLoading: Whether list is loading
        - Handlers for selection, starring, and refresh
      */}
      <Sidebar
        conversations={conversations}
        selectedId={selectedId}
        isLoading={isLoadingList}
        onSelectConversation={selectConversation}
        onStarConversation={toggleStar}
        onRefresh={refresh}
      />

      {/*
        THREAD VIEW:
        
        Displays the selected conversation thread.
        Receives:
        - conversation: Full thread data (null if nothing selected)
        - draft: Saved draft for this conversation
        - isLoading: Whether thread is loading
        - Handlers for all thread actions
      */}
      <ThreadView
        conversation={selectedThread}
        draft={currentDraft}
        isLoading={isLoadingThread}
        onBack={clearSelection}
        onDelete={handleDelete}
        onForward={handleForward}
        onSendReply={sendMessage}
        onDraftChange={updateDraft}
        onCopy={handleCopySuccess}
        onDownload={handleDownloadSuccess}
        onToggleStar={() => toggleStar(selectedId)}
        onToggleRead={toggleRead}
      />

      {/*
        TOAST NOTIFICATION:
        
        Conditional rendering - only shows when toast state has a value.
        The && pattern is a common React idiom for conditional rendering:
        - If toast is null/undefined, nothing renders
        - If toast has a value, the Toast component renders
      */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

/**
 * REACT ROUTER INTEGRATION:
 * 
 * To add this page to your React Router setup:
 * 
 * 1. In your main App.jsx or router configuration file:
 * 
 *    import { BrowserRouter, Routes, Route } from 'react-router-dom';
 *    import MessageCenterPage from './MessageCenterPage';
 *    
 *    function App() {
 *      return (
 *        <BrowserRouter>
 *          <Routes>
 *            <Route path="/" element={<HomePage />} />
 *            <Route path="/message-center" element={<MessageCenterPage />} />
 *            {/* other routes *\/}
 *          </Routes>
 *        </BrowserRouter>
 *      );
 *    }
 * 
 * 2. To link to the Message Center from other components:
 * 
 *    import { Link } from 'react-router-dom';
 *    <Link to="/message-center">Go to Messages</Link>
 * 
 * 3. To programmatically navigate:
 * 
 *    import { useNavigate } from 'react-router-dom';
 *    const navigate = useNavigate();
 *    navigate('/message-center');
 * 
 * ADVANCED: URL-BASED CONVERSATION SELECTION
 * 
 * You could enhance this to use URL parameters for deep linking:
 * 
 * <Route path="/message-center/:conversationId?" element={<MessageCenterPage />} />
 * 
 * Then in the component:
 * 
 * import { useParams, useNavigate } from 'react-router-dom';
 * 
 * const { conversationId } = useParams();
 * const navigate = useNavigate();
 * 
 * // Sync URL with selection
 * useEffect(() => {
 *   if (conversationId) {
 *     selectConversation(conversationId);
 *   }
 * }, [conversationId]);
 * 
 * // Update URL when selection changes
 * const handleSelectConversation = (id) => {
 *   navigate(`/message-center/${id}`);
 * };
 */

export default MessageCenterPage;
