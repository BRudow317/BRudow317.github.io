import { useState } from "react";

export const stateButtonExample = () => {
    const[buttonState, setState] = useState(false);

    setState(() => {
        if (buttonState === true) { return false } else { return true }
    });

    return (
        <div>
            <h1>Nav Change</h1>
            <button id="stateButton" onClick={() => setState }>Change State</button>
        </div>
    );
}