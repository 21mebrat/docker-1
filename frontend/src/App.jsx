import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      console.log("Registering user with data:", form);
   const response =  await axios.post("http://localhost:5000/", form);
   console.log(response);
    alert("User registered!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register User</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <br />

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />

      <input name="password" placeholder="Password" onChange={handleChange} />
      <br />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default App;