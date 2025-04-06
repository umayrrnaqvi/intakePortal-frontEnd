"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {toast,Toaster} from "react-hot-toast";
const Page = () => {
  const signupApi="https://intakeportalbe.vercel.app/api"
  // const signupApi="http://localhost:5000/api"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${signupApi}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      // Store token in localStorage
      localStorage.setItem("token", data);
     
      toast.success("Signup successful", { duration: 1500 });

      // Redirect to login page
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position="top-right" />

      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4 flex flex-col gap-2">
            <label className="block text-gray-600 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-4 mt-1 border rounded-lg outline-none"
              required
            />
          </div>
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
          <div className="mb-4 flex flex-col gap-2">
            <label className="block text-gray-600 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-4 mt-1 border rounded-lg outline-none"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-4 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Page;








