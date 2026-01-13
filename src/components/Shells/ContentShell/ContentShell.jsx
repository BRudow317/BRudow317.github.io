
export { ContentShell };

function ContentShell({ children }) {
  const styles = {
    contentShell: {
        display: "flex",
        flexDirection: "row",
        // alignItems: "stretch",
        // justifyContent: "flex-start",
        // width: "100%",
        // height: "100%",
        // padding: "var(--global-gutter-md)",
        margin: "0",
        borderRadius: "var(--global-border-radius)",
        // boxSizing: "border-box",
        borderColor: "var(--My-LightGreen)",
        borderWidth: "4px",
        borderStyle: "solid",
        // minHeight: "750px"
        height: "100%",
        minHeight: "70%",
    },
  };

  return (
    <div style={styles.contentShell}
      name="ContentShell">
      {children}
    </div>
  );
}

