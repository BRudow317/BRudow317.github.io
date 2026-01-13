/**
 * DualModeTest.jsx
 *
 * Test component demonstrating both CONTROLLED and UNCONTROLLED modes
 * of GoogleAddrSelMap.
 *
 * This file is for testing purposes only - remove when satisfied.
 */

import { useState } from "react";
import { GoogleAddrSelMap } from "./GoogleAddrSelMap";
import "./DualModeTest.css";

export function DualModeTest() {
  // State for controlled mode example
  const [controlledAddress, setControlledAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Create two separate instances
  const [UncontrolledInput, UncontrolledMap] = GoogleAddrSelMap();
  const [ControlledInput, ControlledMap] = GoogleAddrSelMap();

  return (
    <div className="dual-mode-test">
      <h1>GoogleAddrSelMap - Dual Mode Test</h1>

      {/* UNCONTROLLED MODE */}
      <section className="test-section">
        <h2>1. Uncontrolled Mode (Simple)</h2>
        <p>No state management needed - component handles everything internally.</p>

        <div className="test-content">
          <div className="input-wrapper">
            <label>Address (Uncontrolled):</label>
            <UncontrolledInput placeholder="Type address..." />
          </div>

          <div className="map-wrapper">
            <UncontrolledMap style={{ height: "300px", width: "100%" }} />
          </div>
        </div>

        <div className="code-example">
          <pre>{`// Simple usage - no state needed
const [GoogleSelectInput, GoogleMapBox] = GoogleAddrSelMap();

<GoogleSelectInput />
<GoogleMapBox />`}</pre>
        </div>
      </section>

      {/* CONTROLLED MODE */}
      <section className="test-section">
        <h2>2. Controlled Mode (With Validation)</h2>
        <p>Parent manages state - can validate, track changes, etc.</p>

        <div className="test-content">
          <div className="input-wrapper">
            <label>Address (Controlled):</label>
            <ControlledInput
              value={controlledAddress}
              onChange={(e) => setControlledAddress(e.target.value)}
              onSelectionChange={(location) => {
                console.log("Address selected:", location);
                setSelectedLocation(location);
              }}
              placeholder="Type address..."
            />
          </div>

          <div className="map-wrapper">
            <ControlledMap style={{ height: "300px", width: "100%" }} />
          </div>

          {/* Show controlled state */}
          <div className="state-display">
            <h3>Parent State:</h3>
            <p><strong>Address:</strong> {controlledAddress || "(empty)"}</p>
            {selectedLocation && (
              <>
                <p><strong>Latitude:</strong> {selectedLocation.lat}</p>
                <p><strong>Longitude:</strong> {selectedLocation.lng}</p>
              </>
            )}
          </div>
        </div>

        <div className="code-example">
          <pre>{`// Controlled usage - parent manages state
const [address, setAddress] = useState("");
const [GoogleSelectInput, GoogleMapBox] = GoogleAddrSelMap();

<GoogleSelectInput
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  onSelectionChange={(location) => {
    console.log("Selected:", location);
  }}
/>
<GoogleMapBox />`}</pre>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="test-section comparison">
        <h2>When to Use Each Mode</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Uncontrolled</th>
              <th>Controlled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>State Management</td>
              <td>✅ Internal (automatic)</td>
              <td>⚠️ External (manual)</td>
            </tr>
            <tr>
              <td>Code Required</td>
              <td>✅ Minimal</td>
              <td>⚠️ More verbose</td>
            </tr>
            <tr>
              <td>Validation</td>
              <td>❌ Not possible</td>
              <td>✅ Full control</td>
            </tr>
            <tr>
              <td>Form Integration</td>
              <td>⚠️ Basic only</td>
              <td>✅ Full integration</td>
            </tr>
            <tr>
              <td>Access to Value</td>
              <td>❌ No direct access</td>
              <td>✅ Always available</td>
            </tr>
            <tr>
              <td>Use Case</td>
              <td>✅ Simple forms</td>
              <td>✅ Complex forms (ContactForm)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
