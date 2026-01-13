/**
 * Services Cards Component
 * Displays a list of service offerings with icons and descriptions.
 *
 *
 */

import { useRef, useState, useEffect } from "react";
import ServicesCarousel from "../ServicesCarousel/ServicesCarousel";
import { SERVICE_OFFERINGS } from "../../../../constants/SERVICE_OFFERINGS";
import { SERVICE_MEDIA_BY_ID } from "../../../../constants/SERVICE_MEDIA";
// import { BreakpointContext } from "../../../../context/Breakpoint/BreakpointProvider";
import {useBreakpoint} from "../../../../context/BreakpointContext";
// import styles from './Services.module.css';

export { ServicesSection };

function ServicesSection() {
  const screenSize = useBreakpoint();

  const [selectedService, setSelectedService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  const contentSectionRef = useRef(null);

  // Breakpoint context to determine columns
  const colNum = () => {
    if (screenSize === "xsm" || screenSize === "sm") return 3;
    // else if (screenSize === 'md' || screenSize === 'lg') return 3;
    else return 6;
  };

  // Handle service button click for displaying content
  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  useEffect(() => {
    if (!selectedService) return;

    const el = contentSectionRef.current;
    if (!el) return;

    // Wait for content to render, then smooth scroll
    const timeoutId = setTimeout(() => {
      const rect = el.getBoundingClientRect();

      // Align the BOTTOM of the content area with the BOTTOM of the viewport
      const margin = 16; // breathing room so it's not flush to bottom
      const targetTop =
        window.scrollY + rect.bottom - window.innerHeight + margin;
      const finalTarget = Math.max(0, targetTop);

      // Custom smooth scroll with easing
      const startPosition = window.scrollY;
      const distance = finalTarget - startPosition;
      const duration = 800; // milliseconds - adjust this for speed (higher = slower)
      let startTime = null;

      // Easing function for smooth deceleration
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedService]);

  const styles = {
    sectionWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },

    /* Content Display Area */
    contentArea: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minHeight: "500px",
      // background: "var(--tint-50)",
      width: "100%",
      maxWidth: "90%",
    },

    contentAreaXsm: {
      width: "100%",
      maxWidth: "100%",
    },

    /* Section Header */
    sectionHeader: {
      padding: "8px",
      paddingBottom: "0",
      margin: "0", 
    },

    sectionTitle: {
      margin: 0,
      color: "var(--text-color)",
      fontSize: "30px",
      lineHeight: "36px",
      fontWeight: "600",
      textShadow: "var(--text-shadow-depth)",
    },

    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      width: "100%",
      border: "var(--border-section)",
      borderRadius: "12px",
      padding: "24px",
      background: "var(--tint-50)",
    },

    contentWrapperXsm: {
      border: "none",
    },

    /* Service Buttons Sidebar */
    servicesSidebar: {
      display: "grid",
      gridTemplateColumns: `repeat(${colNum()}, minmax(0, 1fr))`,
      gridAutoRows: "minmax(64px, auto)",
      gap: "12px",
      width: "100%",
      // background: 'var(--My-Navy)',
      // padding: '16px',
      // borderRadius: '12px',
      paddingBottom: "16px",
      borderBottom: "2px solid var(--My-LightGreen)",
      marginBottom: "8px",
    },

    serviceButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 12px",
      minHeight: "140px",
      height: "100%",
      background: "var(--tint-75)",
      // backdropFilter: 'var(--BackBlur)',
      // WebkitBackdropFilter: 'var(--WebkitBackBlur)',
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "var(--text-color)",
      borderRadius: "8px",
      // color: 'var(--text-color)',
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },

    serviceButtonHover: {
      borderColor: "var(--My-LightGreen)",
      borderWidth: "2px",
      fontSize: "1.1rem",
      boxShadow: "0 0 8px var(--My-LightGreen)",
      transform: "translateX(4px)",
    },

    serviceButtonActive: {
      borderWidth: "2px",
      borderColor: "var(--My-LightGreen)",
      fontSize: "1.1rem",
      boxShadow:
        "0 0 12px color-mix(in srgb, var(--My-LightGreen) 40%, transparent)",
    },

    buttonIconWrap: {
      position: "relative",
      width: "100%",
      height: "120px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    buttonIcon: {
      flexShrink: 0,
      color: "var(--My-LightGreen)",
      width: "100%",
      height: "100%",
      maxWidth: "96px",
      maxHeight: "96px",
      opacity: "0.4",
      filter: "drop-shadow(0 0 8px var(--My-LightGreen))",
      position: "relative",
      zIndex: "1",
      transition: "all 0.3s ease",
    },

    buttonOverlay: {
      position: "absolute",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px",
      textAlign: "center",
      color: "var(--text-color)",
      fontWeight: "700",
      lineHeight: "1.2",
      textShadow: "0 1px 3px rgba(0, 0, 0, 0.45)",
      whiteSpace: "normal",
      wordBreak: "keep-all",
      overflowWrap: "break-word",
      zIndex: "2",
      pointerEvents: "none",
      transition: "all 0.3s ease",
    },

    buttonIconHover: {
      opacity: "0.55",
    },

    serviceButtonIconActive: {
      opacity: "0.3",
    },

    serviceButtonOverlayActive: {
      opacity: "1",
      textShadow:
        "0 0 8px rgba(73, 255, 24, 0.6), 0 0 16px rgba(73, 255, 24, 0.4), 0 0 24px rgba(73, 255, 24, 0.2)",
    },

    

    serviceContent: {
      animation: "fadeIn 0.3s ease",
      width: "100%",
    },

    contentHeader: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "24px",
      paddingBottom: "16px",
      borderBottom: "2px solid var(--My-LightGreen)",
    },

    contentIcon: {
      color: "var(--My-LightGreen)",
      flexShrink: 0,
    },

    contentTitle: {
      margin: 0,
      fontSize: "28px",
      color: "var(--text-color)",
      lineHeight: "1.3",
    },

    contentBody: {
      color: "var(--text-color)",
      lineHeight: "1.6",
    },

    carouselWrap: {
      marginTop: "20px",
      width: "100%",
    },

    placeholder: {
      marginBottom: "16px",
      opacity: "0.8",
    },

    emptyState: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      minHeight: "400px",
      color: "var(--text-color)",
      fontSize: "18px",
      opacity: "0.6",
    },
  };

  return (
    <section style={{ ...styles.sectionWrapper }}>
      {/* Services Section */}

      {/* Content Display Area */}
      <div ref={contentSectionRef} 
        style={ screenSize === 'xsm' ? {...styles.contentArea, ...styles.contentAreaXsm} : styles.contentArea} >
        <div style={{ ...styles.sectionHeader }}>
          <h3 style={styles.sectionTitle}>Our Services</h3>
        </div>
        <div style={ screenSize === 'xsm' ? {...styles.contentWrapper, ...styles.contentWrapperXsm} : styles.contentWrapper}>
          {/* Service Buttons Sidebar */}
          <div style={styles.servicesSidebar}>
            {SERVICE_OFFERINGS.map((service) => {
              const Icon = service.Icon;
              const isActive = selectedService?.id === service.id;
              const isHovered = hoveredService === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    ...styles.serviceButton,
                    ...(isHovered ? styles.serviceButtonHover : {}),
                    ...(isActive ? styles.serviceButtonActive : {}),
                  }}
                >
                  <div style={styles.buttonIconWrap}>
                    {Icon && (
                      <Icon
                        style={{
                          ...styles.buttonIcon,
                          ...(isActive ? styles.serviceButtonIconActive : {}),
                        }}
                      />
                    )}
                    <span
                      style={{
                        ...styles.buttonOverlay,
                        ...(isActive ? styles.serviceButtonOverlayActive : {}),
                      }}
                    >
                      {service.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          {selectedService ? (
            <div style={styles.serviceContent}>
              <div style={styles.contentHeader}>
                {selectedService.Icon && (
                  <selectedService.Icon size={32} style={styles.contentIcon} />
                )}
                <h2 style={styles.contentTitle}>{selectedService.title}</h2>
              </div>
              <div style={styles.contentBody}>
                <p style={styles.placeholder}>{selectedService.description}</p>
                <div style={styles.carouselWrap}>
                  <ServicesCarousel
                    images={SERVICE_MEDIA_BY_ID[selectedService.id] ?? []}
                    altPrefix={selectedService.title}
                    showSetButtons={false}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <h3>
                Select a service and explore the work Miller Land Management
                delivers.
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
