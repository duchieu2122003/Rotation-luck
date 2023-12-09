import React, { useState } from "react";
import "./App.css";
import LuckyWheel from "./hepler/LuckyWheel";

function App() {
  const items = [
    { label: "Prize 1", color: "red", additionalInfo: "Additional Info 1" },
    { label: "Prize 2", color: "green", additionalInfo: "Additional Info 2" },
    { label: "Prize 3", color: "blue", additionalInfo: "Additional Info 3" },
  ];

  const defaultSelectedItem = {
    label: "Prize 3",
    color: "blue",
    additionalInfo: "Default Info",
  };
  return (
    <div className="App">
      <header className="App-header">
        <LuckyWheel items={items} defaultSelectedItem={defaultSelectedItem} />
      </header>
    </div>
  );
}

export default App;
