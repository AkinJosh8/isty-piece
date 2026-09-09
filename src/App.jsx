import { useState } from "react"
import Home from "./pages/Home"
import SecretRoom from "./pages/SecretRoom"


function App() {
  const [view, setView] = useState("home");

  if (view === "secret") {
    return <SecretRoom />;
  }

  return (
    <Home
      onSecretRoom={() => setView("secret")}
    />
  );
}

export default App