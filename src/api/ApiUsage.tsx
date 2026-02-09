import { useState } from "react";
import { loginUser, getProfile } from "./api";

export function LoginExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    const { token } = await loginUser(email, password);
    // Store token in memory or storage; then use it for auth requests
    const profile = await getProfile(token);
    console.log(profile);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin().catch(console.error);
      }}
    >
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}