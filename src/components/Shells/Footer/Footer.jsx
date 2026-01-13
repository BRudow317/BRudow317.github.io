
export { Footer };

function Footer({ children }) {
  const styles = {
    footerShell: {
        display: "flex",
        flexDirection: "row",
        height: "200px",
        alignItems: "center",//y-axis
        justifyContent: "space-evenly",//x-axis
        width: "100%",
        // height: "100%",
        maxHeight: "20%",
        // flexShrink: 1,
        // padding: "var(--global-gutter-md)",
        margin: "0",
        borderRadius: "var(--global-border-radius)",
        boxSizing: "border-box",
        borderColor: "var(--My-Navy)",
        borderWidth: "4px",
        borderStyle: "solid",
        overflow: "hidden",
    },
  };

  return (
    <div style={styles.footerShell}
      name="FooterShell">
      {children}
    </div>
  );
}