"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://intake-back-end.vercel.app/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      // Store token in local storage
      localStorage.setItem("token", data.token);

      console.log(data)

      // Redirect to dashboard or home page
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4 flex flex-col gap-2">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-4 mt-1 border rounded-lg outline-none"
              required
            />
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-4 mt-1 border rounded-lg outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?
          <Link href="/signup" className="text-blue-500"> Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Page;