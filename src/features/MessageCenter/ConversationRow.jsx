/**
 * ConversationRow.jsx
 * 
 * COMPONENT OVERVIEW:
 * This component renders a single row in the conversation sidebar.
 * It displays the sender, subject, preview, date, and visual indicators
 * for read/unread and starred status.
 * 
 * PROPS PATTERN:
 * This component receives all its data via props, making it a "presentational"
 * or "dumb" component. It doesn't fetch its own data or manage complex state.
 * This makes it:
 * - Easy to test (just pass props)
 * - Reusable (not tied to specific data sources)
 * - Predictable (output depends only on props)
 * 
 * EVENT HANDLING:
 * Click events are passed up to the parent via callback props (onClick, onStarClick).
 * This is the standard React pattern for child-to-parent communication.
 */

import React from 'react';
import { Star, Paperclip } from 'lucide-react';
import { formatMessageDate } from '../utils/dateUtils';
import styles from '../MessageCenterPage.module.css';

/**
 * ConversationRow - Displays a conversation summary in the sidebar.
 * 
 * @param {Object} props
 * @param {Object} props.conversation - The conversation data object
 * @param {boolean} props.isSelected - Whether this conversation is currently selected
 * @param {Function} props.onClick - Callback when row is clicked
 * @param {Function} props.onStarClick - Callback when star button is clicked
 */
function ConversationRow({
  conversation,
  isSelected = false,
  onClick,
  onStarClick,
}) {
  /**
   * DERIVED STATE:
   * These values are computed from props. They're not stored in state because
   * they can always be recalculated from the props. This is a key React concept:
   * don't put derived data in state - compute it during render instead.
   */
  const {
    id,
    sender,
    subject,
    preview,
    lastMessageTime,
    isRead,
    isStarred,
    messageCount = 1,
  } = conversation;

  // Generate initials from sender name for the avatar
  const initials = sender.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color for the avatar based on the name
  // This creates visual variety without needing actual avatar images
  const avatarColors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
    '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
  ];
  const colorIndex = sender.name.charCodeAt(0) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  /**
   * EVENT HANDLERS:
   * These handlers wrap the parent callbacks with any necessary logic.
   * Using separate handlers (instead of inline functions) makes the code
   * clearer and avoids potential issues with function recreation on each render.
   */
  
  // Handle row click - selects the conversation
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  // Handle star click - toggles starred status
  // e.stopPropagation() prevents the click from also triggering row selection
  const handleStarClick = (e) => {
    e.stopPropagation(); // Prevent row click from firing
    if (onStarClick) {
      onStarClick(id);
    }
  };

  // Handle keyboard interaction for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  /**
   * CONDITIONAL CLASS NAMES:
   * We build the className string based on component state.
   * CSS Modules provide the hover/active states, while isSelected
   * and isRead determine which visual style to apply.
   */
  let rowClassName = styles.conversationRow;
  if (isSelected) {
    rowClassName += ' ' + styles.conversationRowSelected;
  } else if (!isRead) {
    rowClassName += ' ' + styles.conversationRowUnread;
  }

  /**
   * INLINE STYLES:
   * We use JavaScript objects for styles that don't need pseudo-classes.
   * This keeps styles co-located with the component and allows for
   * dynamic values based on props.
   */
  const rowStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '14px 16px',
    gap: '12px',
    borderBottom: '1px solid #e2e8f0',
  };

  const avatarStyle = {
    width: 44,
    height: 44,
    borderRadius: '50%',
    backgroundColor: avatarColor,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 14,
    flexShrink: 0,
    letterSpacing: '0.5px',
  };

  const contentStyle = {
    flex: 1,
    minWidth: 0, // Allows text truncation to work properly
    overflow: 'hidden',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  };

  const senderStyle = {
    fontWeight: isRead ? 500 : 700,
    fontSize: 14,
    color: '#1e293b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 180,
  };

  const dateStyle = {
    fontSize: 12,
    color: '#64748b',
    whiteSpace: 'nowrap',
    marginLeft: 8,
  };

  const subjectStyle = {
    fontWeight: isRead ? 400 : 600,
    fontSize: 13,
    color: '#334155',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: 4,
  };

  const previewStyle = {
    fontSize: 13,
    color: '#64748b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const metaRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  };

  const starButtonClassName = `${styles.starButton}${isStarred ? ' ' + styles.starButtonActive : ''}`;

  return (
    /**
     * ACCESSIBILITY:
     * - role="button" indicates this is clickable
     * - tabIndex={0} makes it focusable with keyboard
     * - onKeyDown handles keyboard activation
     * - aria-selected indicates selection state
     */
    <div
      role="button"
      tabIndex={0}
      className={rowClassName}
      style={rowStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected}
    >
      {/* Avatar with initials */}
      <div style={avatarStyle}>
        {initials}
      </div>

      {/* Main content area */}
      <div style={contentStyle}>
        {/* Header row: sender name and date */}
        <div style={headerStyle}>
          <span style={senderStyle}>{sender.name}</span>
          <span style={dateStyle}>{formatMessageDate(lastMessageTime)}</span>
        </div>

        {/* Subject line */}
        <div style={subjectStyle}>{subject}</div>

        {/* Preview snippet */}
        <div style={previewStyle}>{preview}</div>

        {/* Meta row: star button, message count, attachment indicator */}
        <div style={metaRowStyle}>
          <button
            className={starButtonClassName}
            onClick={handleStarClick}
            aria-label={isStarred ? 'Remove star' : 'Add star'}
            title={isStarred ? 'Remove star' : 'Add star'}
          >
            <Star
              size={16}
              fill={isStarred ? 'currentColor' : 'none'}
            />
          </button>

          {/* Show message count if more than 1 */}
          {messageCount > 1 && (
            <span style={{ fontSize: 11, color: '#94a3b8' }}>
              {messageCount} messages
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * React.memo EXPLANATION:
 * 
 * memo() is a higher-order component that memoizes the result.
 * It will skip re-rendering if the props haven't changed.
 * 
 * This is useful here because:
 * - The sidebar might have many conversation rows
 * - Only the selected row needs to re-render when selection changes
 * - Without memo, all rows would re-render when any state in parent changes
 * 
 * WHEN TO USE MEMO:
 * - Components that render often with the same props
 * - Components with expensive rendering logic
 * - List items where only some items need to update
 * 
 * WHEN NOT TO USE MEMO:
 * - Components that always receive new props
 * - Simple components where memo overhead isn't worth it
 * - When you haven't measured a performance problem
 */
export default React.memo(ConversationRow);
