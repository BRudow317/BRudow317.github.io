/**
 * @file ContactForm.jsx
 * 
 * @description A contact form component with integrated Google Address Selection and validation.
 * 
 * @summary Outputs the form for the home page. The GoogleAddrSelMap is an array of components and they have
 * to have their state managed here. 
 * 
 * @Bugs Bad UX - The components are supposed to have timers independent of one another. But they share the same debounce timer.
 * The timer resets on any field change, so if you are typing in one field and then type in another field before the timer ends,
 * the first field's timer resets. This means that if you are filling out multiple fields, the validation may never trigger
 * until you stop typing for all fields for the debounce duration. Which defeats the purpose of validating while the user 
 * fills out the form, showing them errors in near real-time.
 * 
 * @Bug Error State is not working. Fields that should be red on submit are not red.
 * 
 * @todo Improve UX - Separate debounce timers for each field.
 * @todo Improve UX - Show a spinner or some indicator that validation is in progress.
 * @todo Improve Accessibility - Ensure all form elements are fully accessible.
 * @todo Clean up the code, it could take awhile, the form is brittle at best. State is very delicately managed.
 * 
 */
import { useEffect, useState, useCallback } from "react";
import { GoogleAddrSelMap } from "../../../../features/GoogleAddrSelMap/GoogleAddrSelMap";
import {useBreakpoint} from "../../../../context/BreakpointContext";
import {Honeypot} from "../../../../components/Honeypot/Honeypot";
import {useHoneypot} from "../../../../components/Honeypot/useHoneypot";
import {supabase} from "../../../../features/Supabase/supabase";
import "./ContactFormStyles.css";
export { ContactForm };

// CONFIGURATION
const DEBOUNCE_TIME = 2000;

// Field validation configuration - Single source of truth
const FORM_CONFIG = {
  name: {
    label: "Name",
    type: "text",
    placeholder: "Name",
    autoComplete: "name",
    required: true,
    validate: (value) => {
      if (!value.trim()) return 'Name is required';
      return null;
    },
  },
  email: {
    label: "Email Address",
    type: "email",
    placeholder: "Email Address",
    autoComplete: "email",
    validate: (value, formData) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim() && !emailRegex.test(value)) {
        return 'Invalid email format';
      }
      if (!value.trim() && !formData.phone?.trim()) {
        return 'Email or phone required';
      }
      return null;
    },
    crossValidate: ['phone'],
  },
  phone: {
    label: "Phone Number",
    type: "tel",
    placeholder: "Phone Number",
    autoComplete: "tel",
    inputMode: "tel",
    validate: (value, formData) => {
      const phoneRegex = /^[0-9()\-/\s]*$/;
      if (value.trim() && !phoneRegex.test(value)) {
        return 'Invalid phone format';
      }
      if (!value.trim() && !formData.email?.trim()) {
        return 'Email or phone required';
      }
      return null;
    },
    crossValidate: ['email'],
  },
  address: {
    label: "Service Address",
    type: "google-select",
    placeholder: "Type Address...",
    required: false,
    validate: (value) => {
      // Only validate if the field is marked as required
      if (FORM_CONFIG.address.required && !value.trim()) {
        return "Address is required";
      }
      return null;
    },
  },
  customMessage: {
    label: "Service Type",
    type: "textarea",
    placeholder: "How can we help?...",
    rows: 4,
    required: false,
  },

};




// MULTI-FIELD DEBOUNCE HOOK

function useFieldDebounces(config, activeFields, debounceTime, onValidate) {
  useEffect(() => {
    const timeouts = {};
    
    // Set up a timeout for each active field
    Object.keys(config).forEach(fieldName => {
      if (activeFields[fieldName]) {
        timeouts[fieldName] = setTimeout(() => {
          onValidate(fieldName);
        }, debounceTime);
      }
    });
    
    // Cleanup: clear all timeouts if dependencies change (user keeps typing)
    return () => {
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, [config, activeFields, debounceTime, onValidate]);
}


function useFormValidation(config) {
  // Form data
  const [formData, setFormData] = useState(() => {
    const initial = {};
    Object.keys(config).forEach(key => {
      initial[key] = "";
    });
    return initial;
  });

  // Field states: 'default' | 'active' | 'validated' | 'warning' | 'error' | 'locked'
  const [fieldStates, setFieldStates] = useState({});

  // Validation errors
  const [errors, setErrors] = useState({});

  // active fields being edited
  const [activeFields, setActiveFields] = useState({});

  // Form submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validate a single field
  const validateField = useCallback((fieldName, value = null) => {
    const fieldConfig = config[fieldName];
    if (!fieldConfig?.validate) return null;

    const valueToValidate = value !== null ? value : formData[fieldName];
    return fieldConfig.validate(valueToValidate, formData);
  }, [config, formData]);

  // Run validation and update state (called after debounce completes)
  const runValidation = useCallback((fieldName) => {
    if (isSubmitted) return; // Don't validate if form is locked

    const error = validateField(fieldName);
    
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: error ? 'warning' : 'validated'
    }));

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    // Cross-validate dependent fields if they're not active
    const fieldConfig = config[fieldName];
    if (fieldConfig.crossValidate) {
      fieldConfig.crossValidate.forEach(dependentField => {
        if (!activeFields[dependentField] && fieldStates[dependentField]) {
          const dependentError = validateField(dependentField);
          setFieldStates(prev => ({
            ...prev,
            [dependentField]: dependentError ? 'warning' : 'validated'
          }));
          setErrors(prev => ({
            ...prev,
            [dependentField]: dependentError
          }));
        }
      });
    }

    // Mark field as no longer active
    setActiveFields(prev => ({ ...prev, [fieldName]: false }));

    return error;
  }, [validateField, isSubmitted, config, activeFields, fieldStates]);

  // Use the custom debounce hook for all fields
  useFieldDebounces(config, activeFields, DEBOUNCE_TIME, runValidation);

  // Handle input change
  const handleChange = (e) => {
    if (isSubmitted) return; // Don't allow changes if locked

    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Mark field as active (white border, timer starts)
    setActiveFields(prev => ({ ...prev, [name]: true }));
    setFieldStates(prev => ({ ...prev, [name]: 'active' }));

    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle user actions that reset timer (focus, paste, cut, etc.)
  const handleFieldAction = (fieldName) => {
    if (isSubmitted) return;

    setActiveFields(prev => ({ ...prev, [fieldName]: true }));
    setFieldStates(prev => ({ ...prev, [fieldName]: 'active' }));
  };

  // Handle blur - instant validation (no debounce)
  const handleBlur = (fieldName) => {
    if (isSubmitted) return;

    setActiveFields(prev => ({ ...prev, [fieldName]: false }));
    
    // Instant validation on blur
    const error = validateField(fieldName);
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: error ? 'warning' : 'validated'
    }));
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  // Validate entire form (for submission)
  const validateForm = () => {
    const newErrors = {};
    const newStates = {};
    
    Object.keys(config).forEach(fieldName => {
      const error = validateField(fieldName);
      if (error) {
        newErrors[fieldName] = error;
        // Orange fields become red on submit attempt
        newStates[fieldName] = fieldStates[fieldName] === 'warning' ? 'error' : 'warning';
      } else {
        newStates[fieldName] = 'validated';
      }
    });

    setErrors(newErrors);
    setFieldStates(prev => ({ ...prev, ...newStates }));

    return Object.keys(newErrors).length === 0;
  };

  // submit form
  // const submitForm = async (payload) => {
  //   const isValid = validateForm();
    
  //   if (!isValid) {
  //     return false;
  //   }

  //   // Lock all fields (green, disabled)
  //   const lockedStates = {};
  //   Object.keys(config).forEach(fieldName => {
  //     lockedStates[fieldName] = 'locked';
  //   });
  //   setFieldStates(lockedStates);
  //   setIsSubmitted(true);

  //   try {
  //     const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  //     const response = await fetch(`${apiUrl}/contact`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`API error: ${response.status}`);
  //     }

  //     setShowSuccess(true);
  //     return true;
  //   } catch (error) {
  //     console.error("Form submission error:", error);
  //     // Unlock fields on error so user can try again
  //     setFieldStates(prev => {
  //       const unlockedStates = { ...prev };
  //       Object.keys(config).forEach(fieldName => {
  //         unlockedStates[fieldName] = errors[fieldName] ? 'warning' : 'validated';
  //       });
  //       return unlockedStates;
  //     });
  //     setIsSubmitted(false);
  //     alert("Failed to submit form. Please try again.");
  //     return false;
  //   }
  // };

  // submit form
  const submitForm = async (payload) => {
    const isValid = validateForm();
    
    if (!isValid) {
      return false;
    }

    // Lock all fields (green, disabled)
    const lockedStates = {};
    Object.keys(config).forEach(fieldName => {
      lockedStates[fieldName] = 'locked';
    });
    setFieldStates(lockedStates);
    setIsSubmitted(true);

    try {
      //const { supabase } = await import('../../../../features/Supabase/supabase');
      
      const { error } = await supabase
        .from('Contacts')
        .insert({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          address: payload.address,
          message: payload.message,
        });

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      // Send email notification
  await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      template_params: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        message: payload.message,
      },
    }),
  });

  setShowSuccess(true);
  return true;
    } catch (error) {
      console.error("Form submission error:", error);
      // Unlock fields on error so user can try again
      setFieldStates(prev => {
        const unlockedStates = { ...prev };
        Object.keys(config).forEach(fieldName => {
          unlockedStates[fieldName] = errors[fieldName] ? 'warning' : 'validated';
        });
        return unlockedStates;
      });
      setIsSubmitted(false);
      alert("Failed to submit form. Please try again.");
      return false;
    }
  };


  // Submit again - unlock fields
  const submitAgain = () => {
    setIsSubmitted(false);
    setShowSuccess(false);

    // Reset all locked fields to their validated state
    const unlockedStates = {};
    Object.keys(config).forEach(fieldName => {
      unlockedStates[fieldName] = errors[fieldName] ? 'warning' : 'validated';
    });
    setFieldStates(unlockedStates);
  };

  // Handle address selection from GoogleAddressInput (uncontrolled component)
  const handleAddressSelected = (fieldName, address) => {
    if (isSubmitted) return;

    // Update form data
    setFormData(prev => ({ ...prev, [fieldName]: address }));

    // Validate the selected address
    const error = validateField(fieldName, address);
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: error ? 'warning' : 'validated'
    }));
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  return {
    formData,
    fieldStates,
    errors,
    isSubmitted,
    showSuccess,
    handleChange,
    handleFieldAction,
    handleBlur,
    submitForm,
    submitAgain,
    handleAddressSelected,
  };
}


// COMPONENT

function ContactForm() {

  const screenSize = useBreakpoint();


  const [GoogleSelectInput, GoogleMapBox] = GoogleAddrSelMap();

  const {
    formData,
    fieldStates,
    errors,
    isSubmitted,
    showSuccess,
    handleChange,
    handleFieldAction,
    handleBlur,
    submitForm,
    submitAgain,
    handleAddressSelected,
  } = useFormValidation(FORM_CONFIG);

  // Honeypot bot detection
  const { honeypotValue, handleHoneypotChange, isBotDetected } = useHoneypot((value) => {
    console.warn('Bot detected - honeypot field filled with:', value);
  });

  // Handle form submission
  const handleSubmit = async () => {
    // Block submission if bot is detected
    if (isBotDetected) {
      console.warn('Form submission blocked - bot detected');
      // Silently fail for bots - don't give them feedback
      return;
    }

    const payload = {
      ...formData,
      honeypot: honeypotValue, // Include honeypot for backend validation
    };
    await submitForm(payload);
  };

  // Render field helper
  const renderField = (fieldName, fieldConfig) => {
    const isTextarea = fieldConfig.type === 'textarea';
    const state = fieldStates[fieldName] || 'default';
    const isGoogleSelect = fieldConfig.type === 'google-select';

    // NEW: Fully controlled GoogleSelectInput
    if (isGoogleSelect) {
      return (
        <GoogleSelectInput
          id={fieldName}
          name={fieldName}
          value={formData[fieldName] || ""}
          onChange={handleChange}
          onFocus={() => handleFieldAction(fieldName)}
          onBlur={() => handleBlur(fieldName)}
          onPaste={() => handleFieldAction(fieldName)}
          onCut={() => handleFieldAction(fieldName)}
          onSelectionChange={(location) => {
            // Use existing handler (validates and updates state)
            handleAddressSelected(fieldName, location.address);
          }}
          placeholder={fieldConfig.placeholder}
          disabled={state === 'locked'}
          data-validation-state={state}
          className="form-input form-input-with-icon"
        />
      );
    }

    // Standard controlled inputs (text, email, phone, textarea)
    const commonProps = {
      id: fieldName,
      name: fieldName,
      value: formData[fieldName] || "",
      onChange: handleChange,
      onFocus: () => handleFieldAction(fieldName),
      onBlur: () => handleBlur(fieldName),
      onPaste: () => handleFieldAction(fieldName),
      onCut: () => handleFieldAction(fieldName),
      placeholder: fieldConfig.placeholder,
      disabled: state === 'locked',
      'data-validation-state': state,
      className: "form-input",
    };

    if (isTextarea) {
      return <textarea {...commonProps} rows={fieldConfig.rows || 4} />;
    }

    return (
      <input
        {...commonProps}
        type={fieldConfig.type}
        autoComplete={fieldConfig.autoComplete}
        inputMode={fieldConfig.inputMode}
      />
    );
  };

  return (
    <div className="section-wrapper">
    <section id="contact-form" aria-label="Contact Form" 
    className={screenSize==='xsm'? "contact-form-section contact-form-section-xsm" : "contact-form-section"}>
      <header className="form-header">
        <h3 className="form-title">Request a Free Service Quote</h3>
      </header>

      <form className={screenSize==='xsm'? "form-stack form-stack-xsm" : "form-stack"}>
        {/* First row: Name, Email, Phone */}
        <div className={`form-grid ${screenSize === 'xsm' ? 'form-grid-mobile' : ''}`}>
          {['name', 'email', 'phone'].map(fieldName => {
            const fieldConfig = FORM_CONFIG[fieldName];
            return (
              <div key={fieldName} className="field">
                <label htmlFor={fieldName} className="label">
                  {fieldConfig.label}
                  {errors[fieldName] && (
                    <span className="error">{errors[fieldName]}</span>
                  )}
                </label>
                {renderField(fieldName, fieldConfig)}
              </div>
            );
          })}
        </div>
        <Honeypot value={honeypotValue} onChange={handleHoneypotChange} />

        {/* Address (GoogleSelectInput) */}
        <div className="field field-full-width">
          <label htmlFor="address" className="label">
            {FORM_CONFIG.address.label}
            {errors.address && (
              <span className="error">{errors.address}</span>
            )}
          </label>
          {renderField('address', FORM_CONFIG.address)}
        </div>

        {/* Service Type */}
        <div className="field field-full-width">
          <label htmlFor="customMessage" className="label">
            {FORM_CONFIG.customMessage.label}
          </label>
          {renderField('customMessage', FORM_CONFIG.customMessage)}
        </div>

        {/* TODO: Add more field rows here as needed */}

        {/* Submit / Submit Again */}
        <div className="footer-row">
          {showSuccess && (
            <div className="success-message">
              <span className="success-icon">✓</span>
              <span>Thanks for reaching out! We'll contact you ASAP.</span>
            </div>
          )}
          
          {!isSubmitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit Request
            </button>
          ) : (
            <button
              type="button"
              onClick={submitAgain}
              className="submit-again-button"
            >
              Submit Another Form?
            </button>
          )}
        </div>
      </form>

      {/* Google Maps */}
      <div className="map-shell">
        <GoogleMapBox className="map" />
        <div className="map-overlay" />
      </div>
    </section>
    </div>
  );
}