"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const page = ({ params }) => {
  const { id } = params; // Get the dynamic ID from URL
  const [formDetail, setFormDetail] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  useEffect(() => {
    fetchFormDetail();
  }, []);
  const fetchFormDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/userForm/getformdata/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch form details");
      }
      const data = await response.json();
      setFormDetail(data);
    } catch (error) {
      console.error("Error fetching form detail:", error);
    }
  };
  if (!formDetail) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const renderField = (label, value) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <p className="text-lg text-gray-800">{value}</p>
    </div>
  );
  return (
    <div className="w-[80%] mx-auto mt-10  p-8  space-y-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800">Injured User Detail</h2>
      <div className="space-y-4">
        {/* Dynamic Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Name", formDetail.name)}
          {renderField("Email", formDetail.email)}
          {renderField("Phone", formDetail.mobilePhone)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Date of Birth", formatDate(formDetail.dateOfBirth))}
          {renderField("Social Security Number", formDetail.socialSecurityNumber)}
          {renderField("Address", formDetail.address)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Marital Status", formDetail.maritalStatus)}
          {renderField("Injury Occurred Date", formatDate(formDetail.injuryOccurDate))}
          {renderField("Referred You To Our Office", formDetail.referredYouToOurOffice)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Injury Cause", formDetail.injuryCause)}
          {renderField("Injury City", formDetail.injuryCity)}
          {renderField("State", formDetail.state)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Country", formDetail.country)}
          {renderField("Date of Incident", formatDate(formDetail.dateOfIncident))}
          {renderField("How Injury Occurred", formDetail.howInjuryOccurred)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Responsible For Injury", formDetail.responsibleForYourInjury)}
          {renderField("Describe Injuries", formDetail.describeInjuries)}
          {renderField("Doctor Name", formDetail.doctorName)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Doctor Phone", formDetail.doctorPhoneNumber)}
          {renderField("Doctor Address", formDetail.doctorAddress)}
          {renderField("Medical Expenses Incurred", formDetail.medicalExpensesIncurredToDate)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Insurance Company", formDetail.insuranceCompanyInvolve)}
          {renderField("Expected Future Medical Expenses", formDetail.expectedFutureMedicalExpenses)}
          {renderField("Income Before Injury", formDetail.incomeBeforeInjuryPer)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Income After Injury", formDetail.incomeAfterInjuryPer)}
          {renderField("Lost Income Due to Injury", formDetail.lostIncomeDueToInjury ? "Yes" : "No")}
          {renderField("Employer Name", formDetail.employerName)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Employer Position", formDetail.employerPosition)}
          {renderField("Employer Address", formDetail.employerAddress)}
          {renderField("Employer Telephone", formDetail.employerTelephoneNumber)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("In Pain", formDetail.inPain)}
          {renderField("Currently Working", formDetail.currentlyWorking ? "Yes" : "No")}
          {renderField("Way Your Life Damaged", formDetail.wayYourLifeDamage)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Spouse Experienced Any Loss", formDetail.spouseExperiencedAnyLossDueToInjury)}
          {renderField("Witness Detail", formDetail.witnessDetail)}
          {renderField("Conversation of the Incident", formDetail.conversationOfTheIncident)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Information Provided at the Scene", formDetail.informationProvideYouAtTheScene)}
          {renderField("Shoes Worn at the Time of Injury", formDetail.shoesWornAtTheTimeOfInjury)}
          {renderField("Fall Occurred How Land", formDetail.fallOccurredHowLand)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {renderField("Slipped But Not Fall, What Stopped", formDetail.slippedButNotFallWhatStop)}
          {renderField("Previously Consulted an Attorney", formDetail.previouslyConsultedAnAttorney)}
          {renderField("Additional Note", formDetail.additionalNote)}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
          onClick={() => router.push("/")}
        >
          Back to Table
        </button>
      </div>
    </div>
  );
};
export default page;
