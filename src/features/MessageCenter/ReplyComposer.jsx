/**
 * ReplyComposer.jsx
 * 
 * COMPONENT OVERVIEW:
 * The reply/compose form that appears below message threads.
 * Contains the rich text editor and send/cancel buttons.
 * 
 * STATE MANAGEMENT:
 * This component manages:
 * - Draft content (what the user is typing)
 * - Sending state (to disable buttons during send)
 * 
 * It receives from parent:
 * - Initial draft content (if restoring a saved draft)
 * - Callbacks for sending and draft auto-save
 * 
 * OPTIMISTIC UPDATES:
 * When the user clicks Send:
 * 1. We immediately disable the form (prevent double-submit)
 * 2. Parent handles the optimistic UI update (showing the message)
 * 3. If the send fails, parent handles rollback
 * 4. We clear the editor on success, or re-enable on failure
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import styles from '../MessageCenterPage.module.css';

/**
 * ReplyComposer - Form for composing and sending replies.
 * 
 * @param {Object} props
 * @param {string} props.conversationId - The conversation being replied to
 * @param {string} props.recipientName - Name to show in "To:" field
 * @param {string} props.recipientEmail - Email to show in "To:" field
 * @param {string} props.initialDraft - Initial content (from saved draft)
 * @param {Function} props.onSend - Callback to send message, receives HTML string
 * @param {Function} props.onDraftChange - Callback when draft changes, for auto-save
 * @param {Function} props.onCancel - Callback when user cancels reply
 * @param {boolean} props.isVisible - Whether the composer is shown
 */
function ReplyComposer({
  conversationId,
  recipientName,
  recipientEmail,
  initialDraft = '',
  onSend,
  onDraftChange,
  onCancel,
  isVisible = true,
}) {
  /**
   * LOCAL STATE:
   * - content: The current draft HTML content
   * - isSending: Whether we're currently sending (for UI feedback)
   */
  const [content, setContent] = useState(initialDraft);
  const [isSending, setIsSending] = useState(false);

  /**
   * useRef to track if we need to update content when initialDraft changes.
   * This handles the case where a saved draft is loaded after mount.
   */
  const hasInitialized = useRef(false);

  /**
   * EFFECT: Update content when initialDraft changes.
   * This handles loading saved drafts.
   */
  useEffect(() => {
    // Only update if this is a new draft being loaded
    if (initialDraft && !hasInitialized.current) {
      setContent(initialDraft);
      hasInitialized.current = true;
    }
  }, [initialDraft]);

  /**
   * Reset state when conversation changes.
   */
  useEffect(() => {
    hasInitialized.current = false;
    setContent(initialDraft || '');
  }, [conversationId, initialDraft]);

  /**
   * Handle content changes from the editor.
   * Debounced auto-save could be added here for draft persistence.
   */
  const handleContentChange = useCallback((html) => {
    setContent(html);
    
    // Notify parent for draft auto-save
    // In a real app, you'd debounce this to avoid too many saves
    if (onDraftChange) {
      onDraftChange(html);
    }
  }, [onDraftChange]);

  /**
   * DEBOUNCED AUTO-SAVE:
   * 
   * For production, you'd want to debounce draft saves to avoid
   * hammering the server. Here's how you could implement it:
   * 
   * const debouncedSave = useMemo(
   *   () => debounce((html) => onDraftChange?.(html), 1000),
   *   [onDraftChange]
   * );
   * 
   * useEffect(() => {
   *   return () => debouncedSave.cancel();
   * }, [debouncedSave]);
   * 
   * Then call debouncedSave(html) in handleContentChange.
   */

  /**
   * Handle send button click.
   * Manages the sending state and clears the form on success.
   */
  const handleSend = async () => {
    // Validate: don't send empty messages
    const trimmedContent = content.trim();
    if (!trimmedContent || trimmedContent === '<br>' || trimmedContent === '<div><br></div>') {
      return;
    }

    setIsSending(true);

    try {
      if (onSend) {
        await onSend(content);
      }
      // Clear the form on success
      setContent('');
    } catch (error) {
      // Error is handled by parent - we just re-enable the form
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  /**
   * Handle cancel button click.
   */
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  /**
   * Check if the content is empty (or just whitespace/empty tags).
   */
  const isContentEmpty = () => {
    const trimmed = content.trim();
    return !trimmed || trimmed === '<br>' || trimmed === '<div><br></div>';
  };

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  /**
   * INLINE STYLES:
   */
  const containerStyle = {
    padding: 20,
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#fafbfc',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  };

  const recipientStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: '#475569',
  };

  const labelStyle = {
    color: '#94a3b8',
  };

  const emailStyle = {
    color: '#64748b',
    fontSize: 13,
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    justifyContent: 'space-between',
  };

  const leftActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#94a3b8',
    fontSize: 12,
  };

  const rightActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  };

  return (
    <div style={containerStyle} className={styles.fadeIn}>
      {/* Header showing recipient */}
      <div style={headerStyle}>
        <div style={recipientStyle}>
          <span style={labelStyle}>To:</span>
          <span>{recipientName}</span>
          <span style={emailStyle}>{'<'}{recipientEmail}{'>'}</span>
        </div>
      </div>

      {/* Rich text editor */}
      <RichTextEditor
        value={content}
        onChange={handleContentChange}
        placeholder="Write your reply..."
        autoFocus
      />

      {/* Action buttons */}
      <div style={actionsStyle}>
        <div style={leftActionsStyle}>
          {content && !isContentEmpty() && (
            <span>Draft auto-saved</span>
          )}
        </div>

        <div style={rightActionsStyle}>
          <button
            className={styles.secondaryButton}
            onClick={handleCancel}
            disabled={isSending}
            type="button"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            className={styles.primaryButton}
            onClick={handleSend}
            disabled={isSending || isContentEmpty()}
            type="button"
          >
            {isSending ? (
              <>
                <div className={styles.spinner} style={{ width: 18, height: 18 }} />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReplyComposer;
