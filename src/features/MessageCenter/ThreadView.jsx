/**
 * ThreadView.jsx
 * 
 * COMPONENT OVERVIEW:
 * The main content area displaying a conversation thread.
 * Shows:
 * - Toolbar with actions
 * - Conversation subject/metadata
 * - List of messages
 * - Reply composer (when active)
 * 
 * STATE MANAGEMENT:
 * This component orchestrates several child components and manages:
 * - Reply composer visibility
 * - Draft content
 * - Message sanitization
 * 
 * It receives conversation data and action handlers from its parent.
 * 
 * MEMOIZATION STRATEGY:
 * We use useMemo to sanitize message HTML only when messages change.
 * This prevents re-sanitizing on every render (expensive operation).
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { MessageSquare, Calendar, Tag } from 'lucide-react';
import Toolbar from './Toolbar';
import MessageBubble from './MessageBubble';
import ReplyComposer from './ReplyComposer';
import { sanitizeHtml } from '../utils/sanitizer';
import { formatMessageDateTime } from '../utils/dateUtils';
import styles from '../MessageCenterPage.module.css';

/**
 * ThreadView - Displays a conversation thread with messages.
 * 
 * @param {Object} props
 * @param {Object|null} props.conversation - The conversation data object
 * @param {string} props.draft - Saved draft content for this conversation
 * @param {boolean} props.isLoading - Whether the thread is loading
 * @param {Function} props.onBack - Handler for back button
 * @param {Function} props.onDelete - Handler for delete action
 * @param {Function} props.onForward - Handler for forward action
 * @param {Function} props.onSendReply - Handler for sending a reply
 * @param {Function} props.onDraftChange - Handler for draft auto-save
 * @param {Function} props.onCopy - Handler for copy to clipboard
 * @param {Function} props.onDownload - Handler for download
 * @param {Function} props.onToggleStar - Handler for starring
 * @param {Function} props.onToggleRead - Handler for read/unread toggle
 */
function ThreadView({
  conversation,
  draft = '',
  isLoading = false,
  onBack,
  onDelete,
  onForward,
  onSendReply,
  onDraftChange,
  onCopy,
  onDownload,
  onToggleStar,
  onToggleRead,
}) {
  /**
   * LOCAL STATE:
   * isReplying controls whether the reply composer is visible.
   * This is UI-only state that doesn't need to be in the parent.
   */
  const [isReplying, setIsReplying] = useState(false);

  /**
   * EFFECT: Auto-open reply composer if there's a saved draft.
   * This provides a good UX - users see their draft immediately.
   */
  useEffect(() => {
    if (draft && !isReplying) {
      setIsReplying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]); // Only trigger when draft changes

  /**
   * EFFECT: Reset reply state when conversation changes.
   */
  useEffect(() => {
    if (!draft) {
      setIsReplying(false);
    }
  }, [conversation?.id, draft]);

  /**
   * MEMOIZED SANITIZATION:
   * 
   * useMemo memoizes the sanitized messages array.
   * The sanitization only runs when messages change, not on every render.
   * 
   * This is important because:
   * 1. Sanitization involves DOM parsing (expensive)
   * 2. Messages rarely change during viewing
   * 3. Other state changes (like isReplying) shouldn't trigger re-sanitization
   * 
   * The result is an array of objects with the original message plus sanitized HTML.
   */
  const sanitizedMessages = useMemo(() => {
    if (!conversation?.messages) return [];
    
    return conversation.messages.map(message => ({
      ...message,
      sanitizedHtml: sanitizeHtml(message.bodyHtml),
    }));
  }, [conversation?.messages]);

  /**
   * EVENT HANDLERS:
   */
  const handleReplyClick = useCallback(() => {
    setIsReplying(prev => !prev);
  }, []);

  const handleCancelReply = useCallback(() => {
    setIsReplying(false);
  }, []);

  const handleSendReply = useCallback(async (htmlContent) => {
    if (onSendReply) {
      await onSendReply(htmlContent);
    }
    // Keep composer open - parent will handle success/failure
  }, [onSendReply]);

  /**
   * COPY TO CLIPBOARD:
   * Extracts plain text from all messages and copies to clipboard.
   */
  const handleCopy = useCallback(async () => {
    if (!conversation) return;
    
    // Build text content from all messages
    const textContent = conversation.messages
      .map(msg => {
        const plainText = msg.bodyHtml
          .replace(/<[^>]*>/g, '') // Strip HTML tags
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim();
        
        return `From: ${msg.sender.name} <${msg.sender.email}>
Date: ${formatMessageDateTime(msg.timestamp)}

${plainText}

---`;
      })
      .join('\n\n');
    
    const fullText = `Subject: ${conversation.subject}\n\n${textContent}`;
    
    try {
      await navigator.clipboard.writeText(fullText);
      if (onCopy) {
        onCopy(); // Notify parent for toast notification
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, [conversation, onCopy]);

  /**
   * DOWNLOAD AS FILE:
   * Creates a .txt file with the thread content and triggers download.
   */
  const handleDownload = useCallback(() => {
    if (!conversation) return;
    
    // Build text content (same as copy)
    const textContent = conversation.messages
      .map(msg => {
        const plainText = msg.bodyHtml
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim();
        
        return `From: ${msg.sender.name} <${msg.sender.email}>
To: ${msg.recipients.join(', ')}
Date: ${formatMessageDateTime(msg.timestamp)}

${plainText}

${'='.repeat(60)}`;
      })
      .join('\n\n');
    
    const fullText = `Subject: ${conversation.subject}
${'='.repeat(60)}

${textContent}`;
    
    // Create and trigger download
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conversation.subject.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (onDownload) {
      onDownload();
    }
  }, [conversation, onDownload]);

  /**
   * RENDER EMPTY STATE:
   * Shown when no conversation is selected.
   */
  if (!conversation && !isLoading) {
    return (
      <div className={styles.emptyState}>
        <MessageSquare size={64} className={styles.emptyStateIcon} />
        <h2 className={styles.emptyStateTitle}>No conversation selected</h2>
        <p className={styles.emptyStateDescription}>
          Select a conversation from the sidebar to view its messages
        </p>
      </div>
    );
  }

  /**
   * RENDER LOADING STATE:
   */
  if (isLoading) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.spinner} />
        <p style={{ marginTop: 16, color: '#64748b' }}>Loading conversation...</p>
      </div>
    );
  }

  /**
   * INLINE STYLES:
   */
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
  };

  const headerStyle = {
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: 'white',
  };

  const subjectStyle = {
    fontSize: 22,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 12,
    lineHeight: 1.3,
  };

  const metaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    fontSize: 13,
    color: '#64748b',
  };

  const metaItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  };

  const labelStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '3px 10px',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    fontSize: 12,
    color: '#475569',
  };

  const messagesContainerStyle = {
    flex: 1,
    overflow: 'hidden',
  };

  // Get the original sender for the reply composer
  const originalSender = conversation.messages[0]?.sender || conversation.sender;

  return (
    <div style={containerStyle} className={styles.slideIn}>
      {/* Action toolbar */}
      <Toolbar
        onBack={onBack}
        onDelete={onDelete}
        onForward={onForward}
        onReply={handleReplyClick}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onToggleStar={onToggleStar}
        onToggleRead={onToggleRead}
        isStarred={conversation.isStarred}
        isRead={conversation.isRead}
        isReplying={isReplying}
      />

      {/* Conversation header */}
      <header style={headerStyle}>
        <h1 style={subjectStyle}>{conversation.subject}</h1>
        <div style={metaStyle}>
          <span style={metaItemStyle}>
            <MessageSquare size={14} />
            {conversation.messages.length} message{conversation.messages.length !== 1 ? 's' : ''}
          </span>
          <span style={metaItemStyle}>
            <Calendar size={14} />
            {formatMessageDateTime(conversation.lastMessageTime)}
          </span>
          {conversation.labels && conversation.labels.length > 0 && (
            <span style={metaItemStyle}>
              {conversation.labels.map((label, index) => (
                <span key={index} style={labelStyle}>
                  <Tag size={12} />
                  {label}
                </span>
              ))}
            </span>
          )}
        </div>
      </header>

      {/* Messages list */}
      <div style={messagesContainerStyle} className={styles.scrollable}>
        {sanitizedMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            sanitizedHtml={message.sanitizedHtml}
            isCurrentUser={message.sender.email === 'me@company.com'}
          />
        ))}

        {/* Reply composer */}
        {isReplying && (
          <ReplyComposer
            conversationId={conversation.id}
            recipientName={originalSender.name}
            recipientEmail={originalSender.email}
            initialDraft={draft}
            onSend={handleSendReply}
            onDraftChange={onDraftChange}
            onCancel={handleCancelReply}
            isVisible={isReplying}
          />
        )}
      </div>
    </div>
  );
}

export default ThreadView;
