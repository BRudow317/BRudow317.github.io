import React from "react";

function SaveAndDeleteButtons() {

  const styles = {
    RowContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    }
  }
const [ButtonOutput, setButtonOutput] = React.useState("");

return (
  <>
      <label htmlFor="InputTest">Input Test:</label>
      <input type="text" placeholder="" id="InputTest" />
      <label htmlFor="ButtonTest">ButtonTest:</label>
      <div style={styles.RowContent}>
        <button
          id="SaveTest"
          onClick={() =>
            setButtonOutput(
              `${document.getElementById("persist").textContent} ${
                document.getElementById("InputTest").value
              } `,
              (document.getElementById("InputTest").value = "")
            )
          }
        >Save Input</button>
        <button
          id="DeleteTest"
          onClick={() =>
            setButtonOutput(
              "",
              (document.getElementById("InputTest").value = "")
            )
          }
        >Delete Input</button>
      </div>
      <span id="persist">{ButtonOutput}</span>
  </>
);
}

export default SaveAndDeleteButtons;
export { SaveAndDeleteButtons };
