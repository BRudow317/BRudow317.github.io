/**
 * RichTextEditor.jsx
 * 
 * COMPONENT OVERVIEW:
 * A simple rich-text editor built with contentEditable.
 * Provides basic formatting (bold, italic, link) via a toolbar.
 * 
 * CONTENTEDITABLE EXPLANATION:
 * contentEditable is a browser feature that makes any element editable.
 * Pros:
 * - Native browser support, no dependencies
 * - Handles cursor, selection, undo/redo automatically
 * - Good performance for simple use cases
 * 
 * Cons:
 * - Inconsistent behavior across browsers
 * - Limited control over output HTML structure
 * - Complex features (tables, mentions, etc.) are hard to implement
 * 
 * UPGRADING TO A LIBRARY:
 * For production apps with complex editing needs, consider:
 * 
 * 1. TipTap (recommended):
 *    - Modern, headless editor built on ProseMirror
 *    - Excellent React integration
 *    - Installation: npm install @tiptap/react @tiptap/starter-kit
 *    - Integration point: Replace the contentEditable div with EditorContent
 *    - The toolbar would call editor.chain().focus().toggleBold().run() etc.
 * 
 * 2. Quill:
 *    - Feature-rich, opinionated editor
 *    - Installation: npm install react-quill
 *    - Integration point: Replace this component with ReactQuill
 *    - Quill provides its own toolbar, but it can be customized
 * 
 * 3. Slate:
 *    - Low-level framework for building rich-text editors
 *    - More control but more work
 *    - Good for custom editor experiences
 * 
 * WHERE TO INTEGRATE:
 * The integration would happen in this file. The parent component (ReplyComposer)
 * only needs to receive HTML content, so the interface remains the same:
 * - Props: value, onChange, placeholder
 * - onChange receives the HTML string
 * 
 * This abstraction makes it easy to swap implementations without changing
 * any parent components.
 */

import React, { useRef, useCallback, useEffect } from 'react';
import { Bold, Italic, Link as LinkIcon, List, Undo, Redo } from 'lucide-react';
import styles from '../MessageCenterPage.module.css';

/**
 * RichTextEditor - A simple contentEditable-based rich text editor.
 * 
 * @param {Object} props
 * @param {string} props.value - Current HTML content (used for initial value)
 * @param {Function} props.onChange - Callback when content changes, receives HTML string
 * @param {string} props.placeholder - Placeholder text when empty
 * @param {boolean} props.autoFocus - Whether to focus on mount
 */
function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write your message...',
  autoFocus = false,
}) {
  /**
   * useRef EXPLANATION:
   * 
   * useRef creates a mutable reference that persists across renders.
   * Unlike state, changing a ref doesn't trigger a re-render.
   * 
   * We use it here for:
   * 1. editorRef - to access the DOM element directly (needed for execCommand)
   * 2. isComposing - to track IME composition state
   * 
   * IMPORTANT: We don't use controlled input pattern for contentEditable because:
   * - Setting innerHTML on every render would lose cursor position
   * - It would break undo/redo functionality
   * - Performance would suffer with large content
   * 
   * Instead, we:
   * - Set initial content once
   * - Listen to input events and report changes
   * - Let the browser handle editing
   */
  const editorRef = useRef(null);
  const isComposingRef = useRef(false);

  /**
   * Set initial content on mount.
   * We only do this once - subsequent value changes from parent are ignored.
   * This is intentional for contentEditable to work properly.
   */
  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps = run once on mount

  /**
   * Auto-focus if requested.
   */
  useEffect(() => {
    if (autoFocus && editorRef.current) {
      editorRef.current.focus();
    }
  }, [autoFocus]);

  /**
   * EXECCOMMAND EXPLANATION:
   * 
   * document.execCommand is the classic way to modify contentEditable content.
   * It's deprecated but still works in all browsers.
   * 
   * Common commands:
   * - 'bold' - toggles strong or b tags
   * - 'italic' - toggles em or i tags
   * - 'createLink' - wraps selection in a tag
   * - 'insertUnorderedList' - creates ul li structure
   * - 'undo' / 'redo' - browser-managed undo stack
   * 
   * For modern alternatives, libraries like TipTap use their own command system
   * that gives more control over the output HTML.
   */
  const execCommand = useCallback((command, value = null) => {
    // Focus the editor first (commands only work on focused element)
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    
    // Notify parent of the change
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  /**
   * Handle input changes.
   * This fires on any content modification (typing, pasting, etc.)
   */
  const handleInput = useCallback(() => {
    // Don't fire onChange during IME composition (typing CJK characters, etc.)
    if (isComposingRef.current) return;
    
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  /**
   * IME COMPOSITION HANDLING:
   * 
   * When typing in languages that use Input Method Editors (Chinese, Japanese, Korean),
   * there's a "composition" phase where partial input is shown before confirming.
   * 
   * We don't want to fire onChange during this phase because:
   * - The content is incomplete
   * - It could interfere with the IME
   * - It would cause unnecessary updates
   */
  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = () => {
    isComposingRef.current = false;
    handleInput(); // Fire onChange now that composition is complete
  };

  /**
   * Insert a link by prompting for URL.
   * In a real app, you might use a modal or inline UI instead of window.prompt.
   */
  const handleInsertLink = useCallback(() => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : '';
    
    // Prompt for URL
    const url = window.prompt('Enter URL:', 'https://');
    
    if (url && url !== 'https://') {
      if (selectedText) {
        // If text is selected, wrap it in a link
        execCommand('createLink', url);
      } else {
        // If no selection, insert the URL as both text and link
        const link = `<a href="${url}">${url}</a>`;
        execCommand('insertHTML', link);
      }
    }
  }, [execCommand]);
 
  /**
   * Handle keyboard shortcuts.
   * Standard text editor shortcuts that users expect.
   */
  const handleKeyDown = useCallback((e) => {
    // Ctrl/Cmd + B = Bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      execCommand('bold');
    }
    // Ctrl/Cmd + I = Italic
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      execCommand('italic');
    }
    // Ctrl/Cmd + K = Insert link
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      handleInsertLink();
    }
  }, [execCommand, handleInsertLink]);

  /**
   * TOOLBAR BUTTON DATA:
   * Define toolbar buttons in a data structure for easy maintenance.
   * Each button has an icon, label, and action.
   */
  const toolbarButtons = [
    {
      icon: Bold,
      label: 'Bold (Ctrl+B)',
      action: () => execCommand('bold'),
    },
    {
      icon: Italic,
      label: 'Italic (Ctrl+I)',
      action: () => execCommand('italic'),
    },
    {
      icon: LinkIcon,
      label: 'Insert Link (Ctrl+K)',
      action: handleInsertLink,
    },
    {
      icon: List,
      label: 'Bullet List',
      action: () => execCommand('insertUnorderedList'),
    },
    { type: 'divider' },
    {
      icon: Undo,
      label: 'Undo (Ctrl+Z)',
      action: () => execCommand('undo'),
    },
    {
      icon: Redo,
      label: 'Redo (Ctrl+Y)',
      action: () => execCommand('redo'),
    },
  ];

  /**
   * Get current content as HTML string.
   * Exposed for parent components that need to read the content imperatively.
   */
  const getContent = useCallback(() => {
    return editorRef.current ? editorRef.current.innerHTML : '';
  }, []);

  /**
   * Clear the editor content.
   */
  const clear = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      if (onChange) {
        onChange('');
      }
    }
  }, [onChange]);

  // Expose methods via ref if parent needs them
  React.useImperativeHandle(
    React.useRef(), // This would normally come from forwardRef
    () => ({
      getContent,
      clear,
      focus: () => editorRef.current?.focus(),
    }),
    [getContent, clear]
  );

  /**
   * INLINE STYLES:
   */
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  };

  const toolbarStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    padding: '8px 12px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  };

  const dividerStyle = {
    width: 1,
    height: 20,
    backgroundColor: '#e2e8f0',
    margin: '0 8px',
  };

  return (
    <div style={containerStyle}>
      {/* Toolbar */}
      <div style={toolbarStyle}>
        {toolbarButtons.map((button, index) => {
          if (button.type === 'divider') {
            return <div key={index} style={dividerStyle} />;
          }
          
          const Icon = button.icon;
          return (
            <button
              key={index}
              className={styles.toolbarButton}
              onClick={button.action}
              title={button.label}
              aria-label={button.label}
              type="button"
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>

      {/* Editor area */}
      {/**
       * contentEditable PROPS:
       * - contentEditable="true" makes the div editable
       * - data-placeholder is used by CSS to show placeholder text
       * - suppressContentEditableWarning silences React's warning about
       *   using contentEditable (we know what we're doing)
       */}
      <div
        ref={editorRef}
        className={styles.editor}
        contentEditable="true"
        data-placeholder={placeholder}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        suppressContentEditableWarning={true}
        role="textbox"
        aria-multiline="true"
        aria-label="Message editor"
      />
    </div>
  );
}

/**
 * FORWARDREF PATTERN:
 * 
 * To allow parent components to access the editor methods (clear, getContent, focus),
 * we could use forwardRef and useImperativeHandle. Here's how:
 * 
 * const RichTextEditor = React.forwardRef((props, ref) => {
 *   // ... component code ...
 *   
 *   useImperativeHandle(ref, () => ({
 *     getContent,
 *     clear,
 *     focus: () => editorRef.current?.focus(),
 *   }));
 *   
 *   // ... rest of component ...
 * });
 * 
 * Then parent can:
 * const editorRef = useRef();
 * <RichTextEditor ref={editorRef} />
 * editorRef.current.clear();
 * 
 * For this implementation, we're keeping it simple and the parent
 * manages content via the onChange callback.
 */

export default RichTextEditor;
