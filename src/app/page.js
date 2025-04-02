"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Page = () => {
  const [formData, setFormData] = useState([]);
  const getFormData = "https://intake-portal-back-end.vercel.app/api/userForm/getformdata";
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  useEffect(() => {
    fetchFormData();
  }, []);
  const fetchFormData = async () => {
    try {
      const response = await fetch(getFormData);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mt-[100px] w-[80%] mx-auto">
        <h2 className="text-center text-3xl font-semibold mb-4">Injury Detail Table</h2>
        <div className="flex justify-end items-center gap-3">
          <Link href="/form">
            <button className="text-white text-lg bg-blue-600 cursor-pointer py-4 px-8 border-none outline-none rounded-[5px]">
              Add Form Detail
            </button>
          </Link>
          <Link href="/shareform">
            <button className="text-white text-lg bg-blue-600 cursor-pointer py-4 px-8 border-none outline-none rounded-[5px]">
              Share Form Via Link
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-6 mx-auto w-[80%]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Date of Birth</th>
                <th className="border border-gray-300 p-2">Social Security Number</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Marital Status</th>
                <th className="border border-gray-300 p-2">Injury</th>
              </tr>
            </thead>
            <tbody>
              {formData.length > 0 ? (
                formData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-gray-100 cursor-pointer hover:bg-gray-200"
                    onClick={() => router.push(`/form/${item._id}`)} // Navigate to details page
                  >
                    <td className="border border-gray-300 p-2">{item.name}</td>
                    <td className="border border-gray-300 p-2">{item.email}</td>
                    <td className="border border-gray-300 p-2">{item.mobilePhone}</td>
                    <td className="border border-gray-300 p-2">{item.dateOfBirth}</td>
                    <td className="border border-gray-300 p-2">{item.socialSecurityNumber}</td>
                    <td className="border border-gray-300 p-2">{item.address}</td>
                    <td className="border border-gray-300 p-2">{item.maritalStatus}</td>
                    <td className="border border-gray-300 p-2">{item.injuryOccurDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="border border-gray-300 p-4 text-center text-gray-500">
                    No form data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Page;






