/**
 * useMessageCenter.js
 * 
 * CUSTOM HOOK OVERVIEW:
 * 
 * This hook encapsulates all the state management logic for the Message Center.
 * It provides a clean API to the main component while handling:
 * - Fetching conversation list
 * - Fetching individual threads
 * - Sending messages
 * - Deleting conversations
 * - Managing drafts
 * - Optimistic updates with rollback
 * - Toast notifications
 * 
 * CUSTOM HOOKS EXPLAINED:
 * 
 * Custom hooks are functions that start with "use" and can use other hooks.
 * They allow you to extract and reuse stateful logic across components.
 * 
 * Benefits:
 * - Separation of concerns (UI vs logic)
 * - Testability (can test logic independently)
 * - Reusability (same logic in different components)
 * - Cleaner components (less code in render)
 * 
 * Rules of Hooks:
 * - Only call hooks at the top level (not in loops/conditions)
 * - Only call hooks from React functions (components or custom hooks)
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import * as messageService from '../services/messageService';

/**
 * useMessageCenter - Custom hook for message center state management.
 * 
 * @returns {Object} State and handlers for the message center
 */
export function useMessageCenter() {
  // ============================================================================
  // STATE DECLARATIONS
  // ============================================================================
  
  /**
   * NORMALIZED STATE STRUCTURE:
   * 
   * We keep state normalized for efficiency:
   * - conversations: Array of conversation summaries (for sidebar)
   * - selectedId: ID of the currently selected conversation
   * - selectedThread: Full conversation data (for thread view)
   * - drafts: Object mapping conversationId -> draft content
   * 
   * This avoids duplication and makes updates easier to reason about.
   */
  
  // List of conversations for the sidebar
  const [conversations, setConversations] = useState([]);
  
  // Currently selected conversation ID
  const [selectedId, setSelectedId] = useState(null);
  
  // Full thread data for the selected conversation
  const [selectedThread, setSelectedThread] = useState(null);
  
  // Drafts mapped by conversation ID
  const [drafts, setDrafts] = useState({});
  
  // Loading states for different operations
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingThread, setIsLoadingThread] = useState(false);
  
  // Toast notification state
  const [toast, setToast] = useState(null);

  /**
   * useRef for storing previous state (used in rollback).
   * Refs persist across renders without triggering re-renders.
   */
  const previousStateRef = useRef({
    conversations: [],
    selectedThread: null,
  });

  // ============================================================================
  // TOAST HELPERS
  // ============================================================================
  
  /**
   * Show a toast notification.
   * @param {string} message - The message to display
   * @param {string} type - 'success', 'error', or 'info'
   */
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  /**
   * Hide the current toast.
   */
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // ============================================================================
  // DATA FETCHING
  // ============================================================================
  
  /**
   * Fetch the list of conversations.
   * Called on mount and when refreshing.
   */
  const fetchConversations = useCallback(async () => {
    setIsLoadingList(true);
    try {
      const data = await messageService.listConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      showToast('Failed to load conversations', 'error');
    } finally {
      setIsLoadingList(false);
    }
  }, [showToast]);

  /**
   * Fetch a specific conversation thread.
   * @param {string} conversationId - The conversation ID to fetch
   */
  const fetchThread = useCallback(async (conversationId) => {
    setIsLoadingThread(true);
    try {
      const thread = await messageService.getThread(conversationId);
      setSelectedThread(thread);
      
      // Update the conversations list to reflect any changes (e.g., marking as read)
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId ? { ...conv, isRead: true } : conv
      ));
      
      // Check for saved draft
      const savedDraft = await messageService.getDraft(conversationId);
      if (savedDraft) {
        setDrafts(prev => ({ ...prev, [conversationId]: savedDraft.htmlBody }));
      }
    } catch (error) {
      console.error('Failed to fetch thread:', error);
      showToast('Failed to load conversation', 'error');
    } finally {
      setIsLoadingThread(false);
    }
  }, [showToast]);

  /**
   * EFFECT: Fetch conversations on mount.
   * 
   * This runs once when the hook is first used.
   * The empty dependency array [] means "run only on mount".
   */
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  /**
   * EFFECT: Fetch thread when selection changes.
   * 
   * When selectedId changes, fetch the full thread data.
   * If selectedId is null, clear the thread.
   */
  useEffect(() => {
    if (selectedId) {
      fetchThread(selectedId);
    } else {
      setSelectedThread(null);
    }
  }, [selectedId, fetchThread]);

  // ============================================================================
  // CONVERSATION SELECTION
  // ============================================================================
  
  /**
   * Select a conversation to view.
   * @param {string} conversationId - The conversation ID to select
   */
  const selectConversation = useCallback((conversationId) => {
    setSelectedId(conversationId);
  }, []);

  /**
   * Clear the selection (go back to list view).
   */
  const clearSelection = useCallback(() => {
    setSelectedId(null);
    setSelectedThread(null);
  }, []);

  // ============================================================================
  // OPTIMISTIC UPDATES
  // ============================================================================
  
  /**
   * OPTIMISTIC UPDATES EXPLAINED:
   * 
   * Optimistic updates immediately show the expected result of an action,
   * before the server confirms it. If the server request fails, we "rollback"
   * to the previous state.
   * 
   * Pattern:
   * 1. Save current state to ref
   * 2. Update state optimistically
   * 3. Make API call
   * 4. If success: done (or update with server response)
   * 5. If failure: restore saved state + show error
   * 
   * Benefits:
   * - UI feels instant and responsive
   * - Good UX for actions that usually succeed
   * 
   * Drawbacks:
   * - More complex code
   * - UI may flash if rollback happens
   */
  
  /**
   * Send a message in the current thread.
   * Uses optimistic update - shows the message immediately.
   * 
   * @param {string} htmlBody - The HTML content of the message
   */
  const sendMessage = useCallback(async (htmlBody) => {
    if (!selectedId || !selectedThread) return;

    // Save current state for potential rollback
    previousStateRef.current = {
      conversations: [...conversations],
      selectedThread: { ...selectedThread },
    };

    // Create optimistic message
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      conversationId: selectedId,
      sender: {
        name: 'Me',
        email: 'me@company.com',
      },
      recipients: [selectedThread.sender.email],
      timestamp: new Date().toISOString(),
      bodyHtml: htmlBody,
      attachments: [],
    };

    // OPTIMISTIC UPDATE: Add message to thread immediately
    setSelectedThread(prev => ({
      ...prev,
      messages: [...prev.messages, optimisticMessage],
      lastMessageTime: optimisticMessage.timestamp,
    }));

    // Update conversation preview in sidebar
    const preview = htmlBody.replace(/<[^>]*>/g, '').substring(0, 100);
    setConversations(prev => prev.map(conv =>
      conv.id === selectedId
        ? { ...conv, preview, lastMessageTime: optimisticMessage.timestamp }
        : conv
    ));

    // Clear the draft (optimistically)
    setDrafts(prev => {
      const newDrafts = { ...prev };
      delete newDrafts[selectedId];
      return newDrafts;
    });

    try {
      // Make the actual API call
      const sentMessage = await messageService.sendMessage(selectedId, htmlBody);
      
      // Replace temporary message with the real one
      setSelectedThread(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === optimisticMessage.id ? sentMessage : msg
        ),
      }));
      
      showToast('Message sent', 'success');
    } catch (error) {
      // ROLLBACK: Restore previous state on failure
      console.error('Failed to send message:', error);
      setConversations(previousStateRef.current.conversations);
      setSelectedThread(previousStateRef.current.selectedThread);
      
      // Restore draft
      setDrafts(prev => ({ ...prev, [selectedId]: htmlBody }));
      
      showToast(error.message || 'Failed to send message', 'error');
      throw error; // Re-throw so caller knows it failed
    }
  }, [selectedId, selectedThread, conversations, showToast]);

  /**
   * Delete a conversation.
   * Uses optimistic update - removes from list immediately.
   * 
   * @param {string} conversationId - The conversation ID to delete
   */
  const deleteConversation = useCallback(async (conversationId) => {
    const idToDelete = conversationId || selectedId;
    if (!idToDelete) return;

    // Save current state for rollback
    previousStateRef.current = {
      conversations: [...conversations],
      selectedThread: selectedThread,
    };

    // OPTIMISTIC UPDATE: Remove from list immediately
    setConversations(prev => prev.filter(conv => conv.id !== idToDelete));
    
    // Clear selection if we're deleting the selected conversation
    if (idToDelete === selectedId) {
      setSelectedId(null);
      setSelectedThread(null);
    }

    try {
      await messageService.deleteConversation(idToDelete);
      showToast('Conversation deleted', 'success');
    } catch (error) {
      // ROLLBACK
      console.error('Failed to delete conversation:', error);
      setConversations(previousStateRef.current.conversations);
      if (idToDelete === selectedId) {
        setSelectedId(idToDelete);
        setSelectedThread(previousStateRef.current.selectedThread);
      }
      showToast(error.message || 'Failed to delete conversation', 'error');
    }
  }, [selectedId, selectedThread, conversations, showToast]);

  /**
   * Toggle starred status for a conversation.
   * @param {string} conversationId - The conversation ID to toggle
   */
  const toggleStar = useCallback(async (conversationId) => {
    const idToToggle = conversationId || selectedId;
    if (!idToToggle) return;

    // Find current status
    const conv = conversations.find(c => c.id === idToToggle);
    if (!conv) return;

    // OPTIMISTIC UPDATE
    const newStarred = !conv.isStarred;
    setConversations(prev => prev.map(c =>
      c.id === idToToggle ? { ...c, isStarred: newStarred } : c
    ));
    if (selectedThread?.id === idToToggle) {
      setSelectedThread(prev => ({ ...prev, isStarred: newStarred }));
    }

    try {
      await messageService.toggleStarred(idToToggle);
    } catch (error) {
      // ROLLBACK
      setConversations(prev => prev.map(c =>
        c.id === idToToggle ? { ...c, isStarred: conv.isStarred } : c
      ));
      if (selectedThread?.id === idToToggle) {
        setSelectedThread(prev => ({ ...prev, isStarred: conv.isStarred }));
      }
      showToast('Failed to update star', 'error');
    }
  }, [selectedId, selectedThread, conversations, showToast]);

  /**
   * Toggle read/unread status for a conversation.
   */
  const toggleRead = useCallback(async () => {
    if (!selectedId || !selectedThread) return;

    const newRead = !selectedThread.isRead;

    // OPTIMISTIC UPDATE
    setConversations(prev => prev.map(c =>
      c.id === selectedId ? { ...c, isRead: newRead } : c
    ));
    setSelectedThread(prev => ({ ...prev, isRead: newRead }));

    try {
      await messageService.markAsRead(selectedId, newRead);
    } catch (error) {
      // ROLLBACK
      setConversations(prev => prev.map(c =>
        c.id === selectedId ? { ...c, isRead: !newRead } : c
      ));
      setSelectedThread(prev => ({ ...prev, isRead: !newRead }));
      showToast('Failed to update read status', 'error');
    }
  }, [selectedId, selectedThread, showToast]);

  // ============================================================================
  // DRAFT MANAGEMENT
  // ============================================================================
  
  /**
   * Update a draft for a conversation.
   * Debounced in a real app to avoid too many saves.
   * 
   * @param {string} htmlBody - The draft content
   */
  const updateDraft = useCallback(async (htmlBody) => {
    if (!selectedId) return;

    // Update local state immediately
    setDrafts(prev => ({ ...prev, [selectedId]: htmlBody }));

    // Save to storage (fire and forget - drafts don't need error handling)
    try {
      await messageService.updateDraft(selectedId, htmlBody);
    } catch (error) {
      console.error('Failed to save draft:', error);
      // Don't show error toast for drafts - they're not critical
    }
  }, [selectedId]);

  // ============================================================================
  // RETURN VALUE
  // ============================================================================
  
  /**
   * Return the public API of this hook.
   * 
   * This object contains:
   * - State values (read-only to consumers)
   * - Action handlers (callbacks for user interactions)
   * 
   * The component using this hook only needs to wire up the UI to these
   * values and handlers - all the logic is encapsulated here.
   */
  return {
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
    refresh: fetchConversations,
    hideToast,
    showToast,
  };
}
