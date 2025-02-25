import { useState } from "react";

const App = () => {

  const handleButton = async (e) => 
    e.PreventDefault();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);

  // promises -> pending, success, failed
  const handleLogin = async () => {
    try {
      const response = await fetch(`localhost:8000/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: loginForm,
      })
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={handleButton}>Click Me Pal</button>
      <p>--------------------------------------------</p>
      <form onSubmit={handleLogin}></form>
    </div>
  )
}

export default App;