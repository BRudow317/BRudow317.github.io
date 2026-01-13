export default MainBackground;
export { MainBackground };

function MainBackground() {
  const styles = {
    background: {
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
        </div>
    );
  };