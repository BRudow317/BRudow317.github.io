import PixelDemo from "../../features/MessageCenter/Demos/PixelDemo.jsx";
import { SaveAndDeleteButtons } from "../../features/MessageCenter/Demos/SaveAndDeleteButtons.jsx";


export { DemoPage };

function DemoPage() {
  
  return (
    <>
      <h4>PixelDemo</h4>
      <PixelDemo />
      <h4>SaveAndDeleteButtons</h4>
      <SaveAndDeleteButtons />
      <h2>Modal demo</h2>
      {/* <label>Screen Details:</label>
      <span>{Window.getScreenDetails()}</span> */}
      <span>{Window.location}</span>
    </>
  );
}
