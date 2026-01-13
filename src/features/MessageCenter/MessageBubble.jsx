/**
 * MessageBubble.jsx
 * 
 * COMPONENT OVERVIEW:
 * Renders a single message within a conversation thread.
 * Displays sender info, timestamp, message body (as sanitized HTML),
 * and any attachments.
 * 
 * KEY CONCEPT - DANGEROUSLYSETINNERHTML:
 * React escapes HTML by default to prevent XSS attacks. To render raw HTML
 * (like email content), we must use dangerouslySetInnerHTML.
 * 
 * The "dangerous" name is intentional - it reminds developers that:
 * 1. The HTML MUST be sanitized before rendering
 * 2. Never pass user input directly without sanitization
 * 
 * We sanitize in the parent component before passing to this component,
 * so the HTML here is safe to render.
 */

import React from 'react';
import { Paperclip, FileText, Image, File, Download } from 'lucide-react';
import { formatMessageDateTime } from '../utils/dateUtils';
import styles from '../MessageCenterPage.module.css';

/**
 * Get the appropriate icon for an attachment based on its type.
 * @param {string} kind - The attachment kind (pdf, image, file, etc.)
 * @returns {React.Component} The Lucide icon component
 */
function getAttachmentIcon(kind) {
  switch (kind) {
    case 'pdf':
      return FileText;
    case 'image':
      return Image;
    default:
      return File;
  }
}

/**
 * AttachmentChip - Displays a single attachment with download link.
 */
function AttachmentChip({ attachment }) {
  const Icon = getAttachmentIcon(attachment.kind);
  
  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.attachmentChip}
      title={`Download ${attachment.name}`}
    >
      <Icon size={16} />
      <span style={{ flex: 1 }}>{attachment.name}</span>
      {attachment.size && (
        <span style={{ color: '#94a3b8', fontSize: 12 }}>
          {attachment.size}
        </span>
      )}
      <Download size={14} style={{ color: '#94a3b8' }} />
    </a>
  );
}

/**
 * MessageBubble - Displays a single message in the thread.
 * 
 * @param {Object} props
 * @param {Object} props.message - The message data object
 * @param {string} props.sanitizedHtml - Pre-sanitized HTML content
 * @param {boolean} props.isCurrentUser - Whether this message is from the current user
 */
function MessageBubble({
  message,
  sanitizedHtml,
  isCurrentUser = false,
}) {
  const { sender, recipients, timestamp, attachments = [] } = message;

  // Generate initials and avatar color (same logic as ConversationRow)
  const initials = sender.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const avatarColors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
    '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
  ];
  const colorIndex = sender.name.charCodeAt(0) % avatarColors.length;
  const avatarColor = isCurrentUser ? '#6366f1' : avatarColors[colorIndex];

  /**
   * INLINE STYLES:
   * Message bubbles from the current user can be styled differently
   * to visually distinguish sent vs received messages.
   */
  const containerStyle = {
    display: 'flex',
    gap: 16,
    padding: 20,
    backgroundColor: isCurrentUser ? '#f0f9ff' : 'white',
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
    minWidth: 0,
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 8,
  };

  const senderInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  };

  const senderNameStyle = {
    fontWeight: 600,
    fontSize: 14,
    color: '#1e293b',
  };

  const recipientsStyle = {
    fontSize: 12,
    color: '#64748b',
  };

  const timestampStyle = {
    fontSize: 12,
    color: '#94a3b8',
    whiteSpace: 'nowrap',
  };

  const attachmentsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTop: attachments.length > 0 ? '1px solid #e2e8f0' : 'none',
  };

  const attachmentsLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
    width: '100%',
  };

  return (
    <article style={containerStyle} className={styles.fadeIn}>
      {/* Avatar */}
      <div style={avatarStyle}>
        {initials}
      </div>

      {/* Message content */}
      <div style={contentStyle}>
        {/* Header with sender info and timestamp */}
        <header style={headerStyle}>
          <div style={senderInfoStyle}>
            <span style={senderNameStyle}>
              {sender.name}
              {isCurrentUser && (
                <span style={{ fontWeight: 400, color: '#6366f1', marginLeft: 8 }}>
                  (You)
                </span>
              )}
            </span>
            <span style={recipientsStyle}>
              to {recipients.join(', ')}
            </span>
          </div>
          <time style={timestampStyle} dateTime={timestamp}>
            {formatMessageDateTime(timestamp)}
          </time>
        </header>

        {/* Message body - rendered as HTML */}
        {/**
         * dangerouslySetInnerHTML USAGE:
         * 
         * This is the React way to set innerHTML. The prop name is intentionally
         * scary to remind developers of the XSS risk.
         * 
         * The object structure { __html: string } is required - this extra step
         * makes it harder to accidentally pass unsanitized content.
         * 
         * SAFETY: The HTML has already been sanitized by the parent component
         * using our sanitizer utility before being passed as sanitizedHtml.
         */}
        <div
          className={styles.messageContent}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />

        {/* Attachments section */}
        {attachments.length > 0 && (
          <div style={attachmentsContainerStyle}>
            <div style={attachmentsLabelStyle}>
              <Paperclip size={14} />
              {attachments.length} attachment{attachments.length !== 1 ? 's' : ''}
            </div>
            {attachments.map((attachment, index) => (
              /**
               * Using index as key here is acceptable because:
               * 1. Attachments are static - they don't get reordered
               * 2. We don't have unique IDs for attachments
               * 3. The list won't change during the component's lifetime
               * 
               * In general, prefer unique IDs over indices when possible.
               */
              <AttachmentChip key={index} attachment={attachment} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default React.memo(MessageBubble);
