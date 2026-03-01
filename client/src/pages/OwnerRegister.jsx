import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function OwnerRegister() {

  const navigate = useNavigate();

  const [formdata, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handlechange = (d) => {

    setForm({
      ...formdata,
      [d.target.name]: d.target.value,
    });

  };

  const message = async () => {

    const { name, mobile, email, password } = formdata;

    if (!name || !mobile || !email || !password) {
      alert("Please fill all details");
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            mobile,
            email,
            password,
            role: "owner"
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registered successfully");

      navigate("/ownerlogin");

    }
    catch {

      alert("Server error");

    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-900 bg-opacity-90">

      <div className="bg-white p-10 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Property Owner Register
        </h2>

        <input name="name" placeholder="Name" onChange={handlechange} />

        <input name="mobile" placeholder="Mobile" onChange={handlechange} />

        <input name="email" placeholder="Email" onChange={handlechange} />

        <input name="password" placeholder="Password" onChange={handlechange} />

        <button onClick={message}>
          Register
        </button>

        <NavLink to="/ownerlogin">
          Login
        </NavLink>

      </div>

    </div>
  );

}

export default OwnerRegister;