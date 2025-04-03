"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DetailForm from "../../component/DetaiForm";
const Page = ({ params }) => {
  const { linkId } = params;
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const validateLink = async () => {
      try {
        const res = await fetch(`https://intakeportalbe.vercel.app/api/formLink/validate-link/${linkId}`);
        const data = await res.json();
        if (!data.success) {
          alert("This link has expired or is invalid.");
          router.push("/"); 
        } else {
          
          setIsValid(true);
        }
      } catch (error) {
        console.error("Error validating link:", error); 
        alert("Something went wrong. Please try again later.");
        router.push("/"); 
      }
    };
    validateLink();
  }, [linkId, router]);
  return (
    <div className="p-5">
      {isValid ? (
        <DetailForm />
      ) : (
        <p>Validating link...</p> 
      )}
    </div>
  );
};
export default Page;