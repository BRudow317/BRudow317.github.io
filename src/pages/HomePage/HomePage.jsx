import { mixer } from "../../utils/Stylers/mixer";

export { HomePage };

function HomePage() {
  const styles = {
    StackedContent: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    RowContent: {
      display: "flex",
      flexDirection: "row",
    },
  };

  return (
    <div style={styles.StackedContent} name="PageShell" role="PageShell">
      <div style={styles.RowContent} role="RowOfContent-1">
        <h2 style={styles.StackedContent}>
          Hello, Welcome to Blaine Rudows Git Hub Pages!
        </h2>
        <span>What about me? </span>
      </div>
      <div style={styles.RowContent} role="RowOfContent-2">
        <span>Where do I go?</span>
      </div>
      <div>
        
        <div
          style={{height: "50px", width: "150px", 
          padding: "12px",
          backgroundColor: "var(--Text-Color)",
          borderColor: mixer("var(--My-Navy)", 100),
          borderRadius: "12px",
          borderWidth: "4px",
        }}
        ><button role="button"
        style={{  height: "100%", width: "100%", 
        backgroundColor: "var(--My-Cyan)",
        color: mixer("var(--Text-Color)", 50), 
        // borderColor: mixer("var(--My-Cyan)", 50, "in srgb", "var(--My-Navy)", 50, "in srgb"), 
        borderRadius: "8px",
        borderWidth: "4px",
        borderStyle: "solid",
        fontWeight: "bold", 
        fontSize: "16px",
        cursor: "pointer",
        }}
        >Dont Push Me</button></div>
        <p><span> -----------------------------------------------
        --------------------------------------------------</span>
        <span>---------------------------------------------------
        ---------------------------------------------------------
        ---------------------------------------------------------
        ---------------------------------------------------------
        ---------------------------------------------------------
        ---------------------------------------------------------
        ---------------------------------------------------------
        ---------------------------------------------------------
        ---------------------------------------------------------
        ---------------------------------------------------------
        </span>
        
        </p>
      </div>
    </div>
  );
}
