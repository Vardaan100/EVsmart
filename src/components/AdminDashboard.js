import React from "react";
import { JsonToTable } from "react-json-to-table";
import cities from "../cities.json"

function AdminDashboard() {
 
  const myJson = cities

  return (
    <div className="App">
      <JsonToTable json={myJson} />
    </div>
  );
}

export default AdminDashboard;

