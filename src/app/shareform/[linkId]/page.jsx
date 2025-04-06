"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DetailForm from "../../component/DetaiForm";
const Page = ({ params }) => {
  const { linkId } = params;
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  // const validateFormLink = "http://localhost:5000/api/formLink/validate-link"
  const validateFormLink = "https://intakeportalbe.vercel.app/api/formLink/validate-link"


  useEffect(() => {
    const validateLink = async () => {
      console.log("Link ID: ", linkId);
      if (!linkId) {
        toast.error("Link ID is missing");
        return;
      }

      try {
        const res = await fetch(`${validateFormLink}/${linkId}`);
        const data = await res.json();
        console.log("Validation response: ", data);

        if (!data.success) {
          if (data.message === "Form already submitted") {
            toast.error("Form has already been submitted.");
            router.push("/submitted");
          } else if (data.message === "Link expired") {
            toast.error("Link expired or invalid");
            router.push("/expired");
          } else {
            toast.error("Error validating link");
            router.push("/");
          }
        } else {
          setIsValid(true);
        }
      } catch (err) {
        console.error("Error during fetch: ", err);
        toast.error("Error validating link");
        router.push("/");
      }
    };

    validateLink();
  }, [linkId]);

  if (!isValid) return null;

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

