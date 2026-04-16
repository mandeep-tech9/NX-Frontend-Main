import { useState } from "react";

export default function AdminUsers() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const createUser = async () => {
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(user),
    });

    alert("User Created");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Create User</h2>

      <input
        placeholder="Email"
        className="w-full mb-3 px-3 py-2 border rounded"
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
      />

      <input
        placeholder="Password"
        type="password"
        className="w-full mb-3 px-3 py-2 border rounded"
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
      />

      <button
        onClick={createUser}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Create User
      </button>
    </div>
  );
}