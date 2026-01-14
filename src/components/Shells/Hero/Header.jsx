export { Header };

function Header({ children }) {
  const styles = {
    headerShell: {
        // display: "flex",
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "center",
        // width: "100%",
        // height: "80px",
        // padding: "0",
        // margin: "0",
        // boxSizing: "content-box",
        // borderColor: "var(--My-Navy)",
        // borderWidth: "4px",
        // borderStyle: "solid",
        // overflow: "hidden",
        
    },
  };

  return (
    <div style={styles.headerShell}
      name="header"
      role="header">
      {children}
      {/* <span> Header Container</span>
       */}
    </div>
  );
}