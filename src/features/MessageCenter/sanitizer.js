/**
 * sanitizer.js
 * 
 * HTML SANITIZATION UTILITY
 * 
 * WHY SANITIZE?
 * When rendering user-provided or external HTML content (like email bodies),
 * we must protect against Cross-Site Scripting (XSS) attacks. Malicious HTML
 * could include:
 * - <script> tags that execute arbitrary JavaScript
 * - Event handlers like onclick="maliciousCode()"
 * - javascript: URLs in href attributes
 * - CSS that could exfiltrate data or mislead users
 * 
 * This simple sanitizer removes dangerous elements and attributes.
 * For production use, consider a battle-tested library like DOMPurify.
 * 
 * INTEGRATION NOTE:
 * To upgrade to DOMPurify:
 * 1. npm install dompurify
 * 2. import DOMPurify from 'dompurify';
 * 3. Replace sanitizeHtml with: export const sanitizeHtml = (html) => DOMPurify.sanitize(html);
 */

// Elements that are always allowed
const ALLOWED_TAGS = new Set([
  // Text formatting
  'p', 'br', 'hr', 'span', 'div',
  'strong', 'b', 'em', 'i', 'u', 's', 'strike',
  'sub', 'sup', 'small', 'mark',
  
  // Headings
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  
  // Lists
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  
  // Links and media
  'a', 'img',
  
  // Tables
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
  
  // Semantic elements
  'blockquote', 'pre', 'code', 'cite', 'q',
  'article', 'section', 'header', 'footer', 'aside', 'nav',
  'figure', 'figcaption',
]);

// Attributes that are allowed on specific elements
const ALLOWED_ATTRIBUTES = {
  // Global attributes allowed on any element
  '*': ['class', 'id', 'style', 'title', 'dir', 'lang'],
  
  // Element-specific attributes
  'a': ['href', 'target', 'rel'],
  'img': ['src', 'alt', 'width', 'height', 'loading'],
  'td': ['colspan', 'rowspan', 'headers'],
  'th': ['colspan', 'rowspan', 'scope', 'headers'],
  'ol': ['type', 'start', 'reversed'],
  'li': ['value'],
  'blockquote': ['cite'],
  'q': ['cite'],
  'time': ['datetime'],
};

// URL schemes that are safe
const SAFE_URL_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:', '#'];

/**
 * Check if a URL is safe (not javascript: or data: etc.)
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL is safe
 */
function isSafeUrl(url) {
  if (!url) return true;
  
  const trimmed = url.trim().toLowerCase();
  
  // Allow relative URLs
  if (trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.startsWith('../')) {
    return true;
  }
  
  // Allow anchor links
  if (trimmed.startsWith('#')) {
    return true;
  }
  
  // Check against safe schemes
  return SAFE_URL_SCHEMES.some(scheme => trimmed.startsWith(scheme));
}

/**
 * Check if an attribute is allowed on an element.
 * @param {string} tagName - The element tag name (lowercase)
 * @param {string} attrName - The attribute name (lowercase)
 * @param {string} attrValue - The attribute value
 * @returns {boolean} True if the attribute is allowed
 */
function isAttributeAllowed(tagName, attrName, attrValue) {
  const globalAllowed = ALLOWED_ATTRIBUTES['*'] || [];
  const elementAllowed = ALLOWED_ATTRIBUTES[tagName] || [];
  
  // Check if attribute name is allowed
  if (!globalAllowed.includes(attrName) && !elementAllowed.includes(attrName)) {
    return false;
  }
  
  // Special handling for URL attributes
  if (['href', 'src'].includes(attrName)) {
    return isSafeUrl(attrValue);
  }
  
  // Block event handlers (onclick, onload, etc.)
  if (attrName.startsWith('on')) {
    return false;
  }
  
  // Special handling for style attribute - remove dangerous CSS
  if (attrName === 'style') {
    // Block CSS that could be dangerous
    const dangerousCss = [
      'expression',
      'javascript:',
      'behavior:',
      '-moz-binding',
    ];
    const lowerValue = attrValue.toLowerCase();
    return !dangerousCss.some(dangerous => lowerValue.includes(dangerous));
  }
  
  return true;
}

/**
 * Sanitize HTML content to prevent XSS attacks.
 * 
 * This uses the browser's built-in DOM parser to safely parse the HTML,
 * then walks the tree removing dangerous elements and attributes.
 * 
 * @param {string} html - The raw HTML string to sanitize
 * @returns {string} The sanitized HTML string
 */
export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  // Use the browser's DOM parser - this is safe because we're parsing,
  // not executing. The dangerous part is inserting unsanitized HTML into the DOM.
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  /**
   * Recursively sanitize a DOM node and its children.
   * @param {Node} node - The node to sanitize
   * @returns {Node|null} The sanitized node, or null if it should be removed
   */
  function sanitizeNode(node) {
    // Text nodes are always safe
    if (node.nodeType === Node.TEXT_NODE) {
      return node.cloneNode();
    }
    
    // Only process element nodes
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }
    
    const tagName = node.tagName.toLowerCase();
    
    // Remove disallowed elements entirely
    if (!ALLOWED_TAGS.has(tagName)) {
      // For disallowed elements, we still want to preserve their text content
      // (but not script/style content)
      if (tagName === 'script' || tagName === 'style') {
        return null;
      }
      
      // Create a document fragment to hold the children
      const fragment = document.createDocumentFragment();
      for (const child of node.childNodes) {
        const sanitizedChild = sanitizeNode(child);
        if (sanitizedChild) {
          fragment.appendChild(sanitizedChild);
        }
      }
      return fragment;
    }
    
    // Create a clean version of the element
    const cleanElement = document.createElement(tagName);
    
    // Copy allowed attributes
    for (const attr of node.attributes) {
      const attrName = attr.name.toLowerCase();
      const attrValue = attr.value;
      
      if (isAttributeAllowed(tagName, attrName, attrValue)) {
        cleanElement.setAttribute(attrName, attrValue);
      }
    }
    
    // For links, add rel="noopener noreferrer" for security when target="_blank"
    if (tagName === 'a' && cleanElement.getAttribute('target') === '_blank') {
      cleanElement.setAttribute('rel', 'noopener noreferrer');
    }
    
    // Recursively sanitize children
    for (const child of node.childNodes) {
      const sanitizedChild = sanitizeNode(child);
      if (sanitizedChild) {
        cleanElement.appendChild(sanitizedChild);
      }
    }
    
    return cleanElement;
  }
  
  // Sanitize the body content
  const container = document.createElement('div');
  for (const child of doc.body.childNodes) {
    const sanitizedChild = sanitizeNode(child);
    if (sanitizedChild) {
      container.appendChild(sanitizedChild);
    }
  }
  
  return container.innerHTML;
}

/**
 * Strip all HTML tags and return plain text.
 * Useful for generating previews or search text.
 * 
 * @param {string} html - The HTML string to strip
 * @returns {string} Plain text content
 */
export function stripHtml(html) {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Truncate HTML content to a maximum length while preserving some formatting.
 * Useful for previews that need basic formatting.
 * 
 * @param {string} html - The HTML to truncate
 * @param {number} maxLength - Maximum character length
 * @returns {string} Truncated HTML
 */
export function truncateHtml(html, maxLength = 100) {
  const text = stripHtml(html);
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
}
