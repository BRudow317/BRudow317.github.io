/**
 * dateUtils.js
 * 
 * DATE FORMATTING UTILITIES
 * 
 * Email clients typically show dates in a "smart" format:
 * - Today's messages show just the time (e.g., "2:30 PM")
 * - This week's messages show the day (e.g., "Tuesday")
 * - Older messages show the date (e.g., "Jan 2")
 * - Very old messages include the year (e.g., "Jan 2, 2025")
 * 
 * This module provides utilities for these smart date formats.
 */

/**
 * Check if a date is today.
 * @param {Date} date - The date to check
 * @returns {boolean}
 */
function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is yesterday.
 * @param {Date} date - The date to check
 * @returns {boolean}
 */
function isYesterday(date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Check if a date is within the last 7 days.
 * @param {Date} date - The date to check
 * @returns {boolean}
 */
function isThisWeek(date) {
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);
  return date > weekAgo && date <= now;
}

/**
 * Check if a date is in the current year.
 * @param {Date} date - The date to check
 * @returns {boolean}
 */
function isThisYear(date) {
  return date.getFullYear() === new Date().getFullYear();
}

/**
 * Format a date/time string for display in a message list.
 * Shows smart relative formatting based on how recent the date is.
 * 
 * @param {string|Date} dateInput - ISO date string or Date object
 * @returns {string} Formatted date string
 */
export function formatMessageDate(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  
  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return '';
  }
  
  if (isToday(date)) {
    // Show time only for today's messages
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  
  if (isThisWeek(date)) {
    // Show day name for this week
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
    });
  }
  
  if (isThisYear(date)) {
    // Show month and day for this year
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
  
  // Show full date for older messages
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date/time for display in message headers.
 * Shows more complete information than the list view.
 * 
 * @param {string|Date} dateInput - ISO date string or Date object
 * @returns {string} Formatted date string with time
 */
export function formatMessageDateTime(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: isThisYear(date) ? undefined : 'numeric',
  });
  
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return `${dateStr} at ${timeStr}`;
}

/**
 * Get a relative time string (e.g., "5 minutes ago", "2 hours ago").
 * Useful for showing how recent an action was.
 * 
 * @param {string|Date} dateInput - ISO date string or Date object
 * @returns {string} Relative time string
 */
export function getRelativeTime(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) {
    return 'Just now';
  }
  
  if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  }
  
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }
  
  if (diffDays === 1) {
    return 'Yesterday';
  }
  
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  
  // Fall back to formatted date for older dates
  return formatMessageDate(date);
}
