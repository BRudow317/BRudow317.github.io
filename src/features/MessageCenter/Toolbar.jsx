/**
 * Toolbar.jsx
 * 
 * COMPONENT OVERVIEW:
 * The top action bar in the thread view with buttons for:
 * - Back (return to list / deselect conversation)
 * - Delete (remove conversation)
 * - Forward (not fully implemented - placeholder)
 * - Reply (toggle reply composer)
 * - Copy to Clipboard (copy thread text)
 * - Download (download thread as file)
 * 
 * PRESENTATIONAL COMPONENT:
 * This is a "dumb" component - it receives all handlers via props
 * and doesn't manage any state itself. This makes it:
 * - Easy to test
 * - Easy to reuse
 * - Easy to reason about
 */

import React from 'react';
import {
  ArrowLeft,
  Trash2,
  Forward,
  Reply,
  Copy,
  Download,
  Star,
  MoreHorizontal,
  Archive,
  Mail,
  MailOpen,
} from 'lucide-react';
import styles from '../MessageCenterPage.module.css';

/**
 * Toolbar - Action bar for the thread view.
 * 
 * @param {Object} props
 * @param {Function} props.onBack - Go back to conversation list
 * @param {Function} props.onDelete - Delete the current conversation
 * @param {Function} props.onForward - Forward the conversation
 * @param {Function} props.onReply - Open/close reply composer
 * @param {Function} props.onCopy - Copy thread content to clipboard
 * @param {Function} props.onDownload - Download thread as file
 * @param {Function} props.onToggleStar - Toggle starred status
 * @param {Function} props.onToggleRead - Toggle read/unread status
 * @param {boolean} props.isStarred - Current starred status
 * @param {boolean} props.isRead - Current read status
 * @param {boolean} props.isReplying - Whether reply composer is open
 * @param {boolean} props.disabled - Disable all actions
 */
function Toolbar({
  onBack,
  onDelete,
  onForward,
  onReply,
  onCopy,
  onDownload,
  onToggleStar,
  onToggleRead,
  isStarred = false,
  isRead = true,
  isReplying = false,
  disabled = false,
}) {
  /**
   * INLINE STYLES:
   */
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: 'white',
  };

  const leftGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  };

  const rightGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  };

  const dividerStyle = {
    width: 1,
    height: 24,
    backgroundColor: '#e2e8f0',
    margin: '0 8px',
  };

  /**
   * BUTTON CONFIGURATION:
   * Define buttons in data structures for maintainability.
   * Each group can be mapped to render buttons consistently.
   */
  const leftButtons = [
    {
      icon: ArrowLeft,
      label: 'Back',
      onClick: onBack,
    },
    { type: 'divider' },
    {
      icon: Trash2,
      label: 'Delete',
      onClick: onDelete,
      danger: true,
    },
    {
      icon: Archive,
      label: 'Archive',
      onClick: () => alert('Archive functionality coming soon!'),
    },
  ];

  const rightButtons = [
    {
      icon: isRead ? MailOpen : Mail,
      label: isRead ? 'Mark as unread' : 'Mark as read',
      onClick: onToggleRead,
    },
    {
      icon: Star,
      label: isStarred ? 'Remove star' : 'Add star',
      onClick: onToggleStar,
      active: isStarred,
      activeColor: '#fbbf24',
    },
    { type: 'divider' },
    {
      icon: Reply,
      label: 'Reply',
      onClick: onReply,
      active: isReplying,
      primary: true,
    },
    {
      icon: Forward,
      label: 'Forward',
      onClick: onForward,
    },
    { type: 'divider' },
    {
      icon: Copy,
      label: 'Copy to clipboard',
      onClick: onCopy,
    },
    {
      icon: Download,
      label: 'Download',
      onClick: onDownload,
    },
    { type: 'divider' },
    {
      icon: MoreHorizontal,
      label: 'More options',
      onClick: () => {},
    },
  ];

  /**
   * Render a single toolbar button.
   * @param {Object} button - Button configuration
   * @param {number} index - Array index for key
   */
  const renderButton = (button, index) => {
    if (button.type === 'divider') {
      return <div key={index} style={dividerStyle} />;
    }

    const Icon = button.icon;
    
    // Build dynamic styles for active and danger states
    let buttonStyle = {};
    if (button.active && button.activeColor) {
      buttonStyle.color = button.activeColor;
    }
    if (button.danger) {
      buttonStyle.color = '#ef4444';
    }

    return (
      <button
        key={index}
        className={styles.iconButton}
        onClick={button.onClick}
        disabled={disabled}
        title={button.label}
        aria-label={button.label}
        aria-pressed={button.active}
        style={buttonStyle}
      >
        <Icon
          size={20}
          fill={button.active && button.icon === Star ? 'currentColor' : 'none'}
        />
      </button>
    );
  };

  return (
    <div style={containerStyle}>
      {/* Left button group */}
      <div style={leftGroupStyle}>
        {leftButtons.map(renderButton)}
      </div>

      {/* Right button group */}
      <div style={rightGroupStyle}>
        {rightButtons.map(renderButton)}
      </div>
    </div>
  );
}

export default React.memo(Toolbar);
