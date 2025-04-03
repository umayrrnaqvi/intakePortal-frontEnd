"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DetailForm from "../../component/DetaiForm"; // Make sure the path is correct
const Page = ({ params }) => {
  const { linkId } = params; // Retrieve the linkId from the params
  const [isValid, setIsValid] = useState(false); // State to track if the link is valid
  const router = useRouter(); // Next.js router to handle redirection
  useEffect(() => {
    const validateLink = async () => {
      try {
        // Fetch validation data from the backend
        const res = await fetch(`https://intakeportalbe.vercel.app/api/formLink/validate-link/${linkId}`);
        const data = await res.json();
        if (!data.success) {
          // If link is invalid or expired, show an alert and redirect to home
          alert("This link has expired or is invalid.");
          router.push("/"); // Redirect to the home page
        } else {
          // If link is valid, update the state to render the form
          setIsValid(true);
        }
      } catch (error) {
        console.error("Error validating link:", error);
        alert("Something went wrong. Please try again later.");
        router.push("/"); // Redirect to home on error
      }
    };
    validateLink(); // Call the validateLink function on component mount
  }, [linkId, router]); // Re-run the effect when the linkId changes
  return (
    <div className="p-5">
      {isValid ? (
        <DetailForm /> // Render DetailForm if the link is valid
      ) : (
        <p>Validating link...</p> // Show loading text while validating
      )}
    </div>
  );
};
export default Page;