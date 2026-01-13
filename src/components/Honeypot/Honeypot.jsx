import React from 'react';

export { Honeypot };




/**
 * Honeypot component - invisible field that should remain empty for legitimate users
 * Bots will often auto-fill this field, allowing us to detect and block them
 *
 * @param {string} value - Controlled value from parent (optional, for controlled mode)
 * @param {function} onChange - Change handler from parent (optional, for controlled mode)
 * @param {string} fieldName - Name attribute for the field (default: "website")
 */
function Honeypot({ value, onChange, fieldName = "contact_me_by_fax_only" }) {
    return (
        <input
            type="text"
            name={fieldName}
            value={value || ""}
            onChange={onChange}
            style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
            }}
            tabIndex="-1"
            autoComplete="new-password"
            aria-hidden="true"
        />
    );
}