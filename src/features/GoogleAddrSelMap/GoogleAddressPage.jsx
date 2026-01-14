import { useState } from "react";
import { GoogleAddrSelMap } from "./GoogleAddrSelMap.jsx";

export { GoogleAddressPage };

function GoogleAddressPage() {
  const [address, setAddress] = useState("");
  const [GoogleSelectInput, GoogleMapBox] = GoogleAddrSelMap();

  return (
    <>
      <h2>Google Input with Select</h2>
      <GoogleSelectInput
        style={{ width: "300px" , lineHeight: "2rem"}}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onSelectionChange={(location) => {
          console.log("Selected:", location);
        }}
      />
      <h2>Google Map</h2>
      <GoogleMapBox style={{ width: "300px", aspectRatio: "1/1" }} />
    </>
  );
}
