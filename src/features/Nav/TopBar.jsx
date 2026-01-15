
export const TopBar = () => {
  
  const styles = {
    TopBar: {
      /* position: sticky;
  top: 0; */
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      zIndex: 5,
      backgroundColor: "var(--bg-2)",
      backdropFilter: "blur(10px)",
      minHeight: "60px",
      padding: "0",
      boxShadow: "var(--box-shadow-1)",
      justifyContent: "space-between",
      // borderBottom: "1px solid var(--border-1)",
    },

    TopBarRow: {
      display: "flex",
      flexDirection: "row",
      gap: "18px",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },

    ContactInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "8px",
      alignItems: "center",
      fontSize: "18px",
    },
  };

  return (
    <div style={styles.TopBar}>
      <div id="TopBarRow1" style={styles.TopBarRow}>
      <h3 style={styles.BrandName}><a href="https://www.linkedin.com/in/blaine-rudow/"
      >Blaine Rudow</a></h3>
      <h3 style={styles.BrandMeta}><a href="https://aws.amazon.com/what-is/full-stack-development"
      >Full Stack Engineer</a></h3>
      <h3 style={styles.BrandMeta}><a href="https://github.com/BRudow317" target="_blank" rel="noreferrer"
      >GitHub</a></h3>
      <h3 style={styles.BrandMeta}><a href="https://www.linkedin.com/in/blaine-rudow/" target="_blank"
          rel="noreferrer"
        >Linkedin</a>
      </h3>
      <h3 style={styles.BrandMeta}><a href="mailto:blainerudow@gmail.com">blainerudow@gmail.com</a></h3>
      </div>
    </div>
  );
};
