/**
 * messageService.js
 * 
 * SERVICE LAYER EXPLANATION:
 * This module implements the "Service Layer" pattern, which abstracts all data
 * operations away from the UI components. Benefits:
 * 
 * 1. Separation of Concerns: Components don't need to know HOW data is fetched/stored
 * 2. Testability: Easy to mock this service in unit tests
 * 3. Swappability: Can swap sessionStorage for a real API without changing components
 * 4. Centralized Logic: All persistence logic lives in one place
 * 
 * All functions return Promises to simulate async operations (like real API calls).
 * This prepares the codebase for eventual migration to a real backend.
 */

// Storage key constants - single source of truth for localStorage/sessionStorage keys
const STORAGE_KEYS = {
  CONVERSATIONS: 'message_center_conversations',
  DRAFTS: 'message_center_drafts',
};

// Simulate network latency (ms) - makes the UI behave more like a real app
const SIMULATED_DELAY = 300;

// Flag to simulate occasional failures for testing optimistic updates & rollback
// Set to true to randomly fail ~20% of write operations
let SIMULATE_FAILURES = false;

/**
 * Enable or disable simulated failures.
 * Useful for testing error handling and rollback behavior.
 * @param {boolean} enabled 
 */
export function setSimulateFailures(enabled) {
  SIMULATE_FAILURES = enabled;
}

/**
 * Check if this operation should fail (for testing purposes).
 * When SIMULATE_FAILURES is true, ~20% of operations will fail.
 */
function shouldFail() {
  return SIMULATE_FAILURES && Math.random() < 0.2;
}

/**
 * Helper to simulate async delay.
 * Using Promise + setTimeout is a common pattern for simulating network latency.
 * @param {number} ms - Milliseconds to delay
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * SEED DATA
 * 
 * This mock data represents our initial state. In a real app, this would come
 * from a database. The structure is designed to be:
 * - Normalized: Each conversation has an ID, messages are nested within
 * - Complete: Contains all fields needed for UI rendering
 * - Realistic: Mimics actual email/message data
 */
const SEED_CONVERSATIONS = [
  {
    id: '1',
    sender: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: null, // Could be a URL to an avatar image
    },
    subject: 'Project update',
    // Preview is typically the first ~100 chars of the latest message
    preview: 'Hey — quick update on the project. We finished the initial wireframes and started on the API integration...',
    lastMessageTime: '2026-01-02T01:10:00-05:00',
    isRead: false,
    isStarred: false,
    labels: ['Work'],
    messages: [
      {
        id: 'msg-1-1',
        conversationId: '1',
        sender: {
          name: 'Alex Johnson',
          email: 'alex@example.com',
        },
        recipients: ['me@company.com'],
        timestamp: '2026-01-02T01:10:00-05:00',
        // bodyHtml contains the full rich HTML content of the message
        // This will be sanitized before rendering to prevent XSS attacks
        bodyHtml: `
          <p>Hey —</p>
          <p>Quick update on the project.</p>
          <p>We finished the initial wireframes and started on the API integration. 
          Next up: validation and error states.</p>
          <p>Thanks!</p>
          <p><strong>Alex Johnson</strong><br/>
          Senior Developer</p>
        `,
        attachments: [
          {
            name: 'sample-image.png',
            kind: 'image',
            url: 'https://via.placeholder.com/1000x600.png?text=Sample+Image',
            size: '245 KB',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    sender: {
      name: 'Billing',
      email: 'billing@company.com',
      avatar: null,
    },
    subject: 'Your January invoice',
    preview: 'Your invoice is ready. Please see the attached PDF.',
    lastMessageTime: '2026-01-01T18:30:00-05:00',
    isRead: true,
    isStarred: false,
    labels: ['Billing'],
    messages: [
      {
        id: 'msg-2-1',
        conversationId: '2',
        sender: {
          name: 'Billing',
          email: 'billing@company.com',
        },
        recipients: ['me@company.com'],
        timestamp: '2026-01-01T18:30:00-05:00',
        bodyHtml: `
          <p>Your invoice is ready.</p>
          <p>Please see the attached PDF.</p>
          <hr/>
          <p>— Billing Team</p>
        `,
        attachments: [
          {
            name: 'invoice.pdf',
            kind: 'pdf',
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            size: '128 KB',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    sender: {
      name: 'Sarah Chen',
      email: 'sarah.chen@designstudio.io',
      avatar: null,
    },
    subject: 'Re: Design review feedback',
    preview: 'Thanks for the detailed feedback! I\'ve made the revisions you suggested...',
    lastMessageTime: '2026-01-02T09:15:00-05:00',
    isRead: false,
    isStarred: true,
    labels: ['Design', 'Important'],
    messages: [
      {
        id: 'msg-3-1',
        conversationId: '3',
        sender: {
          name: 'Me',
          email: 'me@company.com',
        },
        recipients: ['sarah.chen@designstudio.io'],
        timestamp: '2026-01-01T14:30:00-05:00',
        bodyHtml: `
          <p>Hi Sarah,</p>
          <p>I reviewed the mockups and have a few suggestions:</p>
          <ul>
            <li>The header could use more contrast</li>
            <li>Consider larger touch targets for mobile</li>
            <li>Love the color palette!</li>
          </ul>
          <p>Let me know your thoughts.</p>
          <p>Best,<br/>Me</p>
        `,
        attachments: [],
      },
      {
        id: 'msg-3-2',
        conversationId: '3',
        sender: {
          name: 'Sarah Chen',
          email: 'sarah.chen@designstudio.io',
        },
        recipients: ['me@company.com'],
        timestamp: '2026-01-02T09:15:00-05:00',
        bodyHtml: `
          <p>Thanks for the detailed feedback!</p>
          <p>I've made the revisions you suggested. The header now has a 
          <strong>4.5:1 contrast ratio</strong> and I've increased all touch 
          targets to <em>48px minimum</em>.</p>
          <p>Attached is the updated Figma export. Let me know if you'd like 
          any other changes!</p>
          <p>Best,<br/>
          <strong>Sarah Chen</strong><br/>
          Design Lead @ DesignStudio</p>
        `,
        attachments: [
          {
            name: 'mockups-v2.fig',
            kind: 'file',
            url: '#',
            size: '2.4 MB',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    sender: {
      name: 'GitHub',
      email: 'noreply@github.com',
      avatar: null,
    },
    subject: '[frontend-app] PR #142: Fix navigation bug',
    preview: 'marcus-dev requested your review on this pull request.',
    lastMessageTime: '2026-01-01T22:45:00-05:00',
    isRead: true,
    isStarred: false,
    labels: ['GitHub', 'Code Review'],
    messages: [
      {
        id: 'msg-4-1',
        conversationId: '4',
        sender: {
          name: 'GitHub',
          email: 'noreply@github.com',
        },
        recipients: ['me@company.com'],
        timestamp: '2026-01-01T22:45:00-05:00',
        bodyHtml: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
            <p><strong>marcus-dev</strong> requested your review on this pull request.</p>
            <hr style="border: none; border-top: 1px solid #e1e4e8;"/>
            <h3 style="margin: 16px 0 8px;">Fix navigation bug when clicking back button</h3>
            <p style="color: #586069;">
              This PR fixes an issue where the navigation would break when users 
              clicked the browser back button after a deep link.
            </p>
            <p>
              <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px;">
                +24
              </span>
              <span style="background: #cb2431; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px; margin-left: 4px;">
                -8
              </span>
            </p>
            <p><a href="#" style="color: #0366d6;">View pull request →</a></p>
          </div>
        `,
        attachments: [],
      },
    ],
  },
  {
    id: '5',
    sender: {
      name: 'Team Updates',
      email: 'team@company.com',
      avatar: null,
    },
    subject: 'Weekly standup notes - Week 1',
    preview: 'Here are the highlights from this week\'s standup meetings...',
    lastMessageTime: '2025-12-31T16:00:00-05:00',
    isRead: true,
    isStarred: false,
    labels: ['Team'],
    messages: [
      {
        id: 'msg-5-1',
        conversationId: '5',
        sender: {
          name: 'Team Updates',
          email: 'team@company.com',
        },
        recipients: ['me@company.com', 'team@company.com'],
        timestamp: '2025-12-31T16:00:00-05:00',
        bodyHtml: `
          <h2>Weekly Standup Notes - Week 1</h2>
          <p>Here are the highlights from this week's standup meetings:</p>
          <h3>🎯 Completed</h3>
          <ul>
            <li>Finished user authentication flow</li>
            <li>Deployed staging environment</li>
            <li>Code review backlog cleared</li>
          </ul>
          <h3>🚧 In Progress</h3>
          <ul>
            <li>Dashboard analytics integration</li>
            <li>Mobile responsive layouts</li>
          </ul>
          <h3>⚠️ Blockers</h3>
          <ul>
            <li>Waiting on API documentation from backend team</li>
          </ul>
          <p>Have a great weekend! 🎉</p>
        `,
        attachments: [],
      },
    ],
  },
];

/**
 * Initialize storage with seed data if empty.
 * This runs once when the service is first imported.
 * 
 * PATTERN: Lazy initialization
 * We only seed data if sessionStorage is empty, preserving any existing state
 * from previous sessions (within the same browser session).
 */
function initializeStorage() {
  const existing = sessionStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
  if (!existing) {
    sessionStorage.setItem(
      STORAGE_KEYS.CONVERSATIONS,
      JSON.stringify(SEED_CONVERSATIONS)
    );
  }
  
  // Initialize empty drafts storage if not present
  const existingDrafts = sessionStorage.getItem(STORAGE_KEYS.DRAFTS);
  if (!existingDrafts) {
    sessionStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify({}));
  }
}

// Run initialization when module loads
initializeStorage();

/**
 * Get all conversations from storage.
 * @returns {Array} Array of conversation objects
 */
function getStoredConversations() {
  const data = sessionStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
  return data ? JSON.parse(data) : [];
}

/**
 * Save conversations to storage.
 * @param {Array} conversations - Array of conversation objects to save
 */
function saveConversations(conversations) {
  sessionStorage.setItem(
    STORAGE_KEYS.CONVERSATIONS,
    JSON.stringify(conversations)
  );
}

/**
 * Get drafts from storage.
 * @returns {Object} Object mapping conversationId -> draft HTML content
 */
function getStoredDrafts() {
  const data = sessionStorage.getItem(STORAGE_KEYS.DRAFTS);
  return data ? JSON.parse(data) : {};
}

/**
 * Save drafts to storage.
 * @param {Object} drafts - Object mapping conversationId -> draft HTML content
 */
function saveDrafts(drafts) {
  sessionStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
}

// ============================================================================
// PUBLIC API - These functions are exported and used by React components
// ============================================================================

/**
 * List all conversations (for sidebar display).
 * Returns a summary view (not full message bodies) to minimize data transfer.
 * 
 * @returns {Promise<Array>} Array of conversation summaries
 */
export async function listConversations() {
  await delay(SIMULATED_DELAY);
  
  const conversations = getStoredConversations();
  
  // Return summary data for each conversation (not full message bodies)
  // This is a common optimization - list views don't need all the details
  return conversations.map(conv => ({
    id: conv.id,
    sender: conv.sender,
    subject: conv.subject,
    preview: conv.preview,
    lastMessageTime: conv.lastMessageTime,
    isRead: conv.isRead,
    isStarred: conv.isStarred,
    labels: conv.labels,
    messageCount: conv.messages.length,
  }));
}

/**
 * Get a full conversation thread by ID.
 * Includes all messages with full HTML bodies.
 * 
 * @param {string} conversationId - The conversation ID to fetch
 * @returns {Promise<Object|null>} Full conversation object or null if not found
 */
export async function getThread(conversationId) {
  await delay(SIMULATED_DELAY);
  
  const conversations = getStoredConversations();
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (!conversation) {
    return null;
  }
  
  // Mark as read when fetched (common email behavior)
  if (!conversation.isRead) {
    conversation.isRead = true;
    saveConversations(conversations);
  }
  
  return conversation;
}

/**
 * Send a new message in a conversation thread.
 * Appends the message to the existing thread.
 * 
 * OPTIMISTIC UPDATE PATTERN:
 * The UI should:
 * 1. Immediately show the new message (optimistic)
 * 2. Call this function
 * 3. If it fails, rollback the UI state
 * 
 * @param {string} conversationId - The conversation to add the message to
 * @param {string} htmlBody - The HTML content of the message
 * @returns {Promise<Object>} The created message object
 * @throws {Error} If conversation not found or simulated failure
 */
export async function sendMessage(conversationId, htmlBody) {
  await delay(SIMULATED_DELAY);
  
  // Simulate occasional failure for testing rollback
  if (shouldFail()) {
    throw new Error('Network error: Failed to send message. Please try again.');
  }
  
  const conversations = getStoredConversations();
  const conversationIndex = conversations.findIndex(c => c.id === conversationId);
  
  if (conversationIndex === -1) {
    throw new Error(`Conversation ${conversationId} not found`);
  }
  
  const conversation = conversations[conversationIndex];
  
  // Create the new message object
  const newMessage = {
    id: `msg-${conversationId}-${Date.now()}`,
    conversationId,
    sender: {
      name: 'Me',
      email: 'me@company.com',
    },
    recipients: [conversation.sender.email],
    timestamp: new Date().toISOString(),
    bodyHtml: htmlBody,
    attachments: [],
  };
  
  // Add message to thread
  conversation.messages.push(newMessage);
  
  // Update conversation metadata
  conversation.lastMessageTime = newMessage.timestamp;
  conversation.preview = htmlBody
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .substring(0, 100); // Truncate to 100 chars
  
  // Clear any draft for this conversation
  const drafts = getStoredDrafts();
  delete drafts[conversationId];
  saveDrafts(drafts);
  
  // Save updated conversations
  saveConversations(conversations);
  
  return newMessage;
}

/**
 * Delete a conversation.
 * 
 * @param {string} conversationId - The conversation ID to delete
 * @returns {Promise<boolean>} True if deleted successfully
 * @throws {Error} If conversation not found or simulated failure
 */
export async function deleteConversation(conversationId) {
  await delay(SIMULATED_DELAY);
  
  if (shouldFail()) {
    throw new Error('Network error: Failed to delete conversation. Please try again.');
  }
  
  const conversations = getStoredConversations();
  const index = conversations.findIndex(c => c.id === conversationId);
  
  if (index === -1) {
    throw new Error(`Conversation ${conversationId} not found`);
  }
  
  // Remove the conversation
  conversations.splice(index, 1);
  saveConversations(conversations);
  
  // Also remove any draft
  const drafts = getStoredDrafts();
  delete drafts[conversationId];
  saveDrafts(drafts);
  
  return true;
}

/**
 * Update (save) a draft for a conversation.
 * Drafts are auto-saved periodically while composing a reply.
 * 
 * @param {string} conversationId - The conversation the draft is for
 * @param {string} htmlBody - The draft HTML content
 * @returns {Promise<Object>} The saved draft object
 */
export async function updateDraft(conversationId, htmlBody) {
  await delay(SIMULATED_DELAY / 2); // Drafts save faster
  
  // Drafts shouldn't fail (they're just local saves)
  // but in a real app, you might want to handle this
  
  const drafts = getStoredDrafts();
  drafts[conversationId] = {
    conversationId,
    htmlBody,
    savedAt: new Date().toISOString(),
  };
  saveDrafts(drafts);
  
  return drafts[conversationId];
}

/**
 * Get a saved draft for a conversation.
 * 
 * @param {string} conversationId - The conversation to get draft for
 * @returns {Promise<Object|null>} The draft object or null if none exists
 */
export async function getDraft(conversationId) {
  await delay(SIMULATED_DELAY / 2);
  
  const drafts = getStoredDrafts();
  return drafts[conversationId] || null;
}

/**
 * Toggle starred status for a conversation.
 * 
 * @param {string} conversationId - The conversation to toggle
 * @returns {Promise<boolean>} The new starred status
 */
export async function toggleStarred(conversationId) {
  await delay(SIMULATED_DELAY);
  
  if (shouldFail()) {
    throw new Error('Network error: Failed to update star status.');
  }
  
  const conversations = getStoredConversations();
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (!conversation) {
    throw new Error(`Conversation ${conversationId} not found`);
  }
  
  conversation.isStarred = !conversation.isStarred;
  saveConversations(conversations);
  
  return conversation.isStarred;
}

/**
 * Mark a conversation as read/unread.
 * 
 * @param {string} conversationId - The conversation to update
 * @param {boolean} isRead - The new read status
 * @returns {Promise<boolean>} The new read status
 */
export async function markAsRead(conversationId, isRead) {
  await delay(SIMULATED_DELAY);
  
  const conversations = getStoredConversations();
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (!conversation) {
    throw new Error(`Conversation ${conversationId} not found`);
  }
  
  conversation.isRead = isRead;
  saveConversations(conversations);
  
  return isRead;
}

/**
 * Reset all data to seed values.
 * Useful for testing or "reset to defaults" functionality.
 */
export function resetToSeedData() {
  sessionStorage.setItem(
    STORAGE_KEYS.CONVERSATIONS,
    JSON.stringify(SEED_CONVERSATIONS)
  );
  sessionStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify({}));
}
