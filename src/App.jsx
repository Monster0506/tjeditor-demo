import { useState } from "react";
import "./App.css";
import Example from "./components/Example";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>Advanced Editor Demo</h1>
        <p>Experiment with the rich text editor features!</p>
      </header>

      {/* Main Content Section */}
      <main className="app-main">
        <Example />
      </main>
    </div>
  );
}

export default App;
