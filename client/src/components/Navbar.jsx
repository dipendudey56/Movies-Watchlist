import React from "react";

export default function Navbar({ user, handleLogout }) {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
      <div>👋 Welcome, {user.name} ({user.role})</div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
