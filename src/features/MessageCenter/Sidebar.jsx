/**
 * Sidebar.jsx
 * 
 * COMPONENT OVERVIEW:
 * The Sidebar component renders the left panel containing:
 * - A search/filter bar
 * - The list of conversations
 * - A compose button
 * 
 * STATE MANAGEMENT PATTERN:
 * This component receives conversations from its parent via props.
 * It manages its own local UI state (like search filter), but delegates
 * the "source of truth" for conversation data to the parent.
 * 
 * This is a common pattern: parent owns the data, children own their UI state.
 */

import React, { useState, useMemo } from 'react';
import { Search, Edit, RefreshCw, MoreHorizontal } from 'lucide-react';
import ConversationRow from './ConversationRow';
import styles from '../MessageCenterPage.module.css';

/**
 * Sidebar - Left panel with conversation list.
 * 
 * @param {Object} props
 * @param {Array} props.conversations - Array of conversation summary objects
 * @param {string|null} props.selectedId - ID of currently selected conversation
 * @param {boolean} props.isLoading - Whether conversations are being loaded
 * @param {Function} props.onSelectConversation - Callback when conversation is clicked
 * @param {Function} props.onStarConversation - Callback when star is toggled
 * @param {Function} props.onRefresh - Callback to refresh the conversation list
 */
function Sidebar({
  conversations = [],
  selectedId = null,
  isLoading = false,
  onSelectConversation,
  onStarConversation,
  onRefresh,
}) {
  /**
   * LOCAL STATE:
   * searchQuery is UI-only state - it doesn't need to be shared with parent
   * or persisted anywhere. useState is perfect for this.
   */
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * DERIVED STATE WITH useMemo:
   * 
   * filteredConversations is derived from conversations + searchQuery.
   * We use useMemo to avoid recalculating on every render.
   * 
   * useMemo signature: useMemo(() => computeValue, [dependencies])
   * - First arg: function that computes the value
   * - Second arg: dependency array - recompute only when these change
   * 
   * Without useMemo, this filter would run on every render, even if
   * conversations and searchQuery haven't changed.
   */
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) {
      return conversations;
    }

    const query = searchQuery.toLowerCase();
    return conversations.filter(conv => {
      // Search in sender name, email, subject, and preview
      return (
        conv.sender.name.toLowerCase().includes(query) ||
        conv.sender.email.toLowerCase().includes(query) ||
        conv.subject.toLowerCase().includes(query) ||
        conv.preview.toLowerCase().includes(query)
      );
    });
  }, [conversations, searchQuery]);

  /**
   * EVENT HANDLERS:
   * Keep these simple and focused on their single responsibility.
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Count unread conversations for the header
  const unreadCount = conversations.filter(c => !c.isRead).length;

  /**
   * INLINE STYLES:
   * Defined here for easy maintenance and co-location with the component.
   */
  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'white',
    borderRight: '1px solid #e2e8f0',
    overflow: 'hidden',
  };

  const headerStyle = {
    padding: '16px',
    borderBottom: '1px solid #e2e8f0',
  };

  const titleRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  };

  const titleStyle = {
    fontSize: 20,
    fontWeight: 700,
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  const badgeStyle = {
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: '#0284c7',
    color: 'white',
    padding: '2px 8px',
    borderRadius: 12,
  };

  const headerActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  };

  const searchContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '10px 12px 10px 40px',
    fontSize: 14,
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    outline: 'none',
    backgroundColor: '#f8fafc',
    transition: 'border-color 0.15s, background-color 0.15s',
  };

  const searchIconStyle = {
    position: 'absolute',
    left: 12,
    color: '#94a3b8',
    pointerEvents: 'none',
  };

  const clearButtonStyle = {
    position: 'absolute',
    right: 8,
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: 4,
    display: searchQuery ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const listContainerStyle = {
    flex: 1,
    overflow: 'hidden',
  };

  const loadingStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#94a3b8',
  };

  const emptySearchStyle = {
    padding: 24,
    textAlign: 'center',
    color: '#64748b',
  };

  return (
    <aside style={sidebarStyle}>
      {/* Header section */}
      <header style={headerStyle}>
        {/* Title row with badge and actions */}
        <div style={titleRowStyle}>
          <h1 style={titleStyle}>
            Inbox
            {unreadCount > 0 && (
              <span style={badgeStyle}>{unreadCount}</span>
            )}
          </h1>
          <div style={headerActionsStyle}>
            <button
              className={styles.iconButton}
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh"
              aria-label="Refresh conversations"
            >
              <RefreshCw size={18} className={isLoading ? styles.spinner : ''} />
            </button>
            <button
              className={styles.iconButton}
              title="More options"
              aria-label="More options"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div style={searchContainerStyle}>
          <Search size={18} style={searchIconStyle} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={searchInputStyle}
            aria-label="Search messages"
          />
          <button
            style={clearButtonStyle}
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        </div>
      </header>

      {/* Conversation list */}
      <div style={listContainerStyle} className={styles.scrollable}>
        {isLoading ? (
          // Loading state
          <div style={loadingStyle}>
            <div className={styles.spinner} />
          </div>
        ) : filteredConversations.length === 0 ? (
          // Empty state
          <div style={emptySearchStyle}>
            {searchQuery ? (
              <>
                <p style={{ marginBottom: 8 }}>No results for "{searchQuery}"</p>
                <button
                  onClick={handleClearSearch}
                  style={{
                    color: '#0284c7',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Clear search
                </button>
              </>
            ) : (
              <p>No conversations yet</p>
            )}
          </div>
        ) : (
          /**
           * RENDERING LISTS:
           * When rendering arrays in React, each item needs a unique "key" prop.
           * Keys help React identify which items have changed, been added, or removed.
           * 
           * Good keys:
           * - Unique IDs from your data (like conv.id here)
           * - Stable (don't change between renders)
           * 
           * Bad keys:
           * - Array indices (unless list is static and never reordered)
           * - Random values (Math.random())
           */
          filteredConversations.map(conversation => (
            <ConversationRow
              key={conversation.id}
              conversation={conversation}
              isSelected={conversation.id === selectedId}
              onClick={onSelectConversation}
              onStarClick={onStarConversation}
            />
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
