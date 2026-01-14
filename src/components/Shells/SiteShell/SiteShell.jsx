// import { min } from "@floating-ui/utils";

export function SiteShell({children}) {
  const styles = {
    background: {
        isolation: "isolate",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
        zIndex: "-10",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        background: "radial-gradient(circle at center, #a2ff9aff, #f0eefcff)",
    },
  };
// {children}
    return (
        <div style={styles.background}
          name="MainBackground"
            aria-hidden="true"
        >
          {children}
        </div>
    );
  };