"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const DetailForm = () => {
    const router = useRouter()
    // // const formSubmitApi = "https://intakeportalbe.vercel.app/api/userForm/submitform";
    // const formSubmitApi = "http://localhost:5000/api/userForm/submitform";

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        socialSecurityNumber: "",
        dateOfBirth: "",
        address: "",
        homePhone: "",
        mobilePhone: "",
        workPhone: "",
        email: "",
        methodToReach: "",
        maritalStatus: "",
        timeToReachYou: "",
        spouseName: "",
        numberOfChildren: "",
        injuryOccurDate: "",
        referredYouToOurOffice: "",
        injuryCause: "",
        otherInjuryCause: "",
        injuryCity: "",
        injuryState: "",
        injuryCountry: "",
        dateOfIncident: "",
        howInjuryOccurred: "",
        responsibleForYourInjury: "",
        describeInjuries: "",
        doctorName: "",
        doctorPhoneNumber: "",
        doctorAddress: "",
        medicalExpensesIncurredToDate: "",
        insuranceCompanyInvolve: "",
        expectedFutureMedicalExpenses: "",
        incomeBeforeInjuryPer: "",
        incomeBeforInjuryPerType: "",
        incomeAfterInjuryPer: "",
        incomeAfterInjuryPerType: "",
        lostIncomeDueToInjury: "",
        employerName: "",
        employerPosition: "",
        employerAddress: "",
        employerTelephoneNumber: "",
        inPain: "",
        currentlyWorking: "",
        wayYourLifeDamage: "",
        spouseExperiencedAnyLossDueToInjury: "",
        witnessDetail: "",
        conversationOfTheIncident: "",
        informationProvideYouAtTheScene: "",
        shoesWornAtTheTimeOfInjury: "",
        fallOccurredHowLand: "",
        slippedButNotFallWhatStop: "",
        previouslyConsultedAnAttorney: "",
        additionalNote: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // or from context, cookie, etc.
            const isLoggedIn = token && token !== "null";

            // If not logged in, you must have a linkId from the URL or somewhere
            const linkId = !isLoggedIn ? getLinkIdFromURL() : null;

            const formSubmitApi = isLoggedIn
                ? "https://intakeportalbe.vercel.app/api/userForm/submitform"
                : `https://intakeportalbe.vercel.app/api/userForm/submitform/${linkId}`;

            const response = await fetch(formSubmitApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(isLoggedIn && { Authorization: token }), // only include token if logged in
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            const data = await response.json();
            alert("Form submitted successfully!");
            console.log("Response from backend:", data);

            // Reset form
            setFormData({
                name: "",
                socialSecurityNumber: "",
                dateOfBirth: "",
                address: "",
                homePhone: "",
                mobilePhone: "",
                workPhone: "",
                email: "",
                methodToReach: "",
                maritalStatus: "",
                timeToReachYou: "",
                spouseName: "",
                numberOfChildren: "",
                injuryOccurDate: "",
                referredYouToOurOffice: "",
                injuryCause: "",
                otherInjuryCause: "",
                injuryCity: "",
                injuryState: "",
                injuryCountry: "",
                dateOfIncident: "",
                howInjuryOccurred: "",
                responsibleForYourInjury: "",
                describeInjuries: "",
                doctorName: "",
                doctorPhoneNumber: "",
                doctorAddress: "",
                medicalExpensesIncurredToDate: "",
                insuranceCompanyInvolve: "",
                expectedFutureMedicalExpenses: "",
                incomeBeforeInjuryPer: "",
                incomeBeforInjuryPerType: "",
                incomeAfterInjuryPer: "",
                incomeAfterInjuryPerType: "",
                lostIncomeDueToInjury: "",
                employerName: "",
                employerPosition: "",
                employerAddress: "",
                employerTelephoneNumber: "",
                inPain: "",
                currentlyWorking: "",
                returnToWorkDate: "",
                willNotReturnToWork: "",
                wayYourLifeDamage: "",
                spouseExperiencedAnyLossDueToInjury: "",
                witnessDetail: "",
                conversationOfTheIncident: "",
                informationProvideYouAtTheScene: "",
                shoesWornAtTheTimeOfInjury: "",
                fallOccurredHowLand: "",
                slippedButNotFallWhatStop: "",
                previouslyConsultedAnAttorney: "",
                additionalNote: "",
            });

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again.");
        }
    };

    // Helper to extract linkId from the URL
    const getLinkIdFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("linkId"); // URL should be like ?linkId=xyz123
    };

    const gridClass = (step) => {
        if (step === 8 || step === 10 || step === 3 || step === 7) {
            return "";
        }
        return "grid grid-cols-2 gap-6"
    }


    const closeForm = () => {
        router.push("/")
    }

    return (
        <>
            <div className="flex w-full  min-h-screen justify-center bg-white
            ">
                <div className="w-full max-w-[1170px] p-6 ">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        {step === 1 && "Personal Details"}
                        {step === 2 && "Info About Injury Occurrence"}
                        {step === 3 && "Injury Description"}
                        {step === 4 && "Treated Doctor Details"}
                        {step === 5 && "Expenses"}
                        {step === 6 && "Employment Details"}
                        {step === 7 && "Personal Loss Due to Injury"}
                        {step === 8 && "Witness Details"}
                        {step === 9 && "Attorney Details"}
                        {step === 10 && "Additional Notes"}
                    </h2>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between gap-4 mb-4">
                        <button type="button" onClick={closeForm} className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg">
                            Close
                        </button>
                        <div className="flex gap-5">
                            {step > 1 && (
                                <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded-lg">
                                    Previous
                                </button>
                            )}

                            {step < 10 ? (
                                <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-lg">
                                    Next
                                </button>
                            ) : (
                                <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white cursor-pointer rounded-lg">
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className={gridClass(step)}>
                            {/* Step 1: Personal Details */}
                            {step === 1 && (
                                <> <div>
                                    <label className="block mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-4 border rounded-lg mb-4"
                                        required
                                    />

                                    <label className="block mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className="w-full px-3 py-4 border rounded-lg mb-4"
                                        required
                                    />
                                </div>

                                    <div>
                                        <label className="block mb-2">Social Security Number</label>
                                        <input
                                            type="text"
                                            name="socialSecurityNumber"
                                            value={formData.socialSecurityNumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                            required
                                        />

                                        <label className="block mb-2">Address</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                            required
                                        ></textarea>
                                    </div>

                                    <div>

                                        <label className="block mb-2">Home Phone</label>
                                        <input
                                            type="tel"
                                            name="homePhone"
                                            value={formData.homePhone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                        />

                                        <label className="block mb-2">Work Phone</label>
                                        <input
                                            type="tel"
                                            name="workPhone"
                                            value={formData.workPhone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                        />

                                    </div>


                                    <div>
                                        <label className="block mb-2">Mobile Phone</label>
                                        <input
                                            type="tel"
                                            name="mobilePhone"
                                            value={formData.mobilePhone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                        />

                                        <label className="block mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">Best Method to Reach You</label>
                                        <input
                                            type="text"
                                            name="methodToReach"
                                            value={formData.methodToReach}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                        />

                                        <label className="block mb-2">Best Times to Reach You</label>
                                        <input
                                            type="text"
                                            name="timeToReachYou"
                                            value={formData.timeToReachYou}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">Marital Status</label>
                                        <select
                                            name="maritalStatus"
                                            value={formData.maritalStatus}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                        >
                                            <option value="">Select</option>
                                            <option value="Married">Married</option>
                                            <option value="Single">Single</option>
                                            <option value="Divorced">Divorced</option>
                                        </select>

                                        <label className="block mb-2">Spouse's Name</label>
                                        <input
                                            type="text"
                                            name="spouseName"
                                            value={formData.spouseName}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">Number of Children</label>
                                        <input
                                            type="number"
                                            name="numberOfChildren"
                                            value={formData.numberOfChildren}
                                            onChange={handleChange}
                                            className="w-full px-3 py-4 border rounded-lg mb-4"
                                        />
                                    </div> </>

                            )}


                            {step === 2 && (
                                <>    <div>
                                    <label className="block mb-2">On what date did your injury occur?</label>
                                    <input
                                        type="date"
                                        name="injuryOccurDate"
                                        value={formData.injuryOccurDate}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        required
                                    />
                                </div>

                                    <div>
                                        <label className="block mb-2">Who referred you to our office?</label>
                                        <input
                                            type="text"
                                            name="referredYouToOurOffice"
                                            value={formData.referredYouToOurOffice}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">How did your injury occur?</label>
                                        <select
                                            name="injuryCause"
                                            value={formData.injuryCause}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                        >
                                            <option value="" disabled>Select an option</option>
                                            {[
                                                "Aircraft accident",
                                                "Animal bite or attack",
                                                "Assault and battery",
                                                "Defective premises",
                                                "Defective product",
                                                "Police negligence",
                                                "Medical malpractice",
                                                "Motor vehicle accident",
                                                "Slip or trip and fall",
                                                "Water-related accident",
                                                "Other",
                                            ].map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        {formData.injuryCause === "Other" && (
                                            <input
                                                type="text"
                                                name="otherInjuryCause"
                                                value={formData.otherInjuryCause}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border rounded-lg mb-4"
                                                placeholder="Specify other injury cause"
                                            />
                                        )}
                                    </div>


                                    <div>
                                        <label className="block mb-2">Where did your injury occur? (City)</label>
                                        <input
                                            type="text"
                                            name="injuryCity"
                                            value={formData.injuryCity}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            required
                                        />

                                        <label className="block mb-2">State</label>
                                        <input
                                            type="text"
                                            name="injuryState"
                                            value={formData.injuryState}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            required
                                        />


                                        <label className="block mb-2">Country</label>
                                        <input
                                            type="text"
                                            name="injuryCountry"
                                            value={formData.injuryCountry}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">Date of Incident</label>
                                        <input
                                            type="date"
                                            name="dateOfIncident"
                                            value={formData.dateOfIncident}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            required
                                        />
                                    </div>


                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <div>
                                        <label className="block mb-2">Describe how your injury occurred</label>
                                        <textarea
                                            name="howInjuryOccurred"
                                            value={formData.howInjuryOccurred}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="4"
                                            required
                                        ></textarea>

                                    </div>

                                    <div>
                                        <label className="block mb-2">
                                            Who do you believe caused or is responsible for your injury, and why?
                                        </label>
                                        <textarea
                                            name="responsibleForYourInjury"
                                            value={formData.responsibleForYourInjury}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block mb-2">Describe your injury(ies)</label>
                                        <textarea
                                            name="describeInjuries"
                                            value={formData.describeInjuries}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div> </>
                            )}

                            {step === 4 && (
                                <>       <div>
                                    <label className="block mb-2">Doctor's Name</label>
                                    <input
                                        type="text"
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        required
                                    />
                                </div>

                                    <div>
                                        <label className="block mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="doctorPhoneNumber"
                                            value={formData.doctorPhoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">Address</label>
                                        <textarea
                                            name="doctorAddress"
                                            value={formData.doctorAddress}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="2"
                                            required
                                        ></textarea>
                                    </div>
                                </>
                            )}



                            {step === 5 && (
                                <>  <div>
                                    <label className="block mb-2">Total Medical Expenses Incurred to Date ($)</label>
                                    <input
                                        type="number"
                                        name="medicalExpensesIncurredToDate"
                                        value={formData.medicalExpensesIncurredToDate}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        required
                                    />

                                    <label className="block mb-2">Total Expected Future Medical Expenses ($)</label>
                                    <input
                                        type="number"
                                        name="expectedFutureMedicalExpenses"
                                        value={formData.expectedFutureMedicalExpenses}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        required
                                    />

                                </div>

                                    <div>

                                        <label className="block mb-2">Insurance Companies Involved (Name, Address, Phone)</label>
                                        <textarea
                                            name="insuranceCompanyInvolve"
                                            value={formData.insuranceCompanyInvolve}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="6"
                                            required
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block mb-2">Income Before Injury ($) per</label>
                                        <div className="flex gap-4 mb-4">
                                            <input
                                                type="number"
                                                name="incomeBeforeInjuryPer"
                                                value={formData.incomeBeforeInjuryPer}
                                                onChange={handleChange}
                                                className="w-1/2 px-3 py-2 border rounded-lg"
                                                required
                                            />
                                            <select
                                                name="incomeBeforInjuryPerType"
                                                value={formData.incomeBeforInjuryPerType}
                                                onChange={handleChange}
                                                className="w-1/2 px-3 py-2 border rounded-lg"
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="hour">Hour</option>
                                                <option value="week">Week</option>
                                                <option value="month">Month</option>
                                                <option value="year">Year</option>
                                            </select>
                                        </div>

                                        <label className="block mb-2">Income After Injury ($) per</label>
                                        <div className="flex gap-4">
                                            <input
                                                type="number"
                                                name="incomeAfterInjuryPer"
                                                value={formData.incomeAfterInjuryPer}
                                                onChange={handleChange}
                                                className="w-1/2 px-3 py-2 border rounded-lg"
                                                required
                                            />
                                            <select
                                                name="incomeAfterInjuryPerType"
                                                value={formData.incomeAfterInjuryPerType}
                                                onChange={handleChange}
                                                className="w-1/2 px-3 py-2 border rounded-lg"
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="hour">Hour</option>
                                                <option value="week">Week</option>
                                                <option value="month">Month</option>
                                                <option value="year">Year</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div>
                                        {/* Income Loss Section */}
                                        <label className="block mb-2">Have you lost income due to your injuries?</label>
                                        <div className="flex items-center gap-4 mb-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="lostIncomeDueToInjury"
                                                    value="Yes"
                                                    checked={formData.lostIncomeDueToInjury === "Yes"}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                Yes
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="lostIncomeDueToInjury"
                                                    value="No"
                                                    checked={formData.lostIncomeDueToInjury === "No"}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                No
                                            </label>
                                        </div>

                                        {formData.lostIncome === "Yes" && (
                                            <div>
                                                <label className="block mb-2">Amount Lost ($)</label>
                                                <input
                                                    type="number"
                                                    name="lostIncomeAmount"
                                                    value={formData.lostIncomeAmount}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border rounded-lg mb-4"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}


                            {step === 6 && (
                                <>    <div>
                                    <label className="block mb-2">Employer</label>
                                    <input
                                        type="text"
                                        name="employerName"
                                        value={formData.employerName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        required
                                    />

                                    <label className="block mb-2">Position</label>
                                    <input
                                        type="text"
                                        name="employerPosition"
                                        value={formData.employerPosition}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        required
                                    />
                                </div>
                                    <div>
                                        <label className="block mb-2">Employer's Address</label>
                                        <textarea
                                            name="employerAddress"
                                            value={formData.employerAddress}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="3"
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block mb-2">Employer’s Telephone Number</label>
                                        <input
                                            type="number"
                                            name="employerTelephoneNumber"
                                            value={formData.employerTelephoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            required
                                        />

                                        {/* Currently Working Section */}
                                        <label className="block mb-2">Are you currently working?</label>
                                        <div className="flex items-center gap-4 mb-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="currentlyWorking"
                                                    value="Yes"
                                                    checked={formData.currentlyWorking === "Yes"}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                Yes
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="currentlyWorking"
                                                    value="No"
                                                    checked={formData.currentlyWorking === "No"}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                No
                                            </label>
                                        </div>


                                        <div>
                                            {/* Return to Work Section */}
                                            {formData.currentlyWorking === "No" && (
                                                <div>
                                                    <label className="block mb-2">Expect to return to work on</label>
                                                    <input
                                                        type="date"
                                                        name="returnToWorkDate"
                                                        value={formData.returnToWorkDate}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                                    />

                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="willNotReturnToWork"

                                                            checked={formData.willNotReturnToWork}
                                                            onChange={handleChange}
                                                            className="mr-2"
                                                        />
                                                        Will not return to work
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-2">Are you in pain? If so, describe.</label>
                                        <textarea
                                            name="inPain"
                                            value={formData.inPain}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div> </>
                            )}


                            {step === 7 && (
                                <>   <div>
                                    <label className="block mb-2">
                                        Describe any other ways in which your life has changed as a result of your injuries.
                                    </label>
                                    <textarea
                                        name="wayYourLifeDamage"
                                        value={formData.wayYourLifeDamage}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>
                                    <div>
                                        <label className="block mb-2">
                                            If married, has your spouse experienced any losses as a result of your injury? If so, describe.
                                        </label>
                                        <textarea
                                            name="spouseExperiencedAnyLossDueToInjury"
                                            value={formData.spouseExperiencedAnyLossDueToInjury}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="6"
                                        ></textarea>
                                    </div> </>
                            )}


                            {step === 8 && (
                                <div>
                                    <label className="block mb-2">
                                        List the names, addresses, and phone numbers of any possible witnesses in your case.
                                    </label>
                                    <textarea
                                        name="witnessDetail"
                                        value={formData.witnessDetail}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>
                            )}


                            {step === 9 && (

                                <>  <div>
                                    <label className="block mb-2">Any conversations at the scene of the incident?</label>
                                    <textarea
                                        name="conversationOfTheIncident"
                                        value={formData.conversationOfTheIncident}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        rows="4"
                                    ></textarea>
                                </div>

                                    <div>
                                        <label className="block mb-2">Information provided to you at the scene?</label>
                                        <textarea
                                            name="informationProvideYouAtTheScene"
                                            value={formData.informationProvideYouAtTheScene}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="4"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block mb-2">Type of shoes worn at the time of injury</label>
                                        <input
                                            type="text"
                                            name="shoesWornAtTheTimeOfInjury"
                                            value={formData.shoesWornAtTheTimeOfInjury}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2">If a fall occurred, how did you land?</label>
                                        <textarea
                                            name="fallOccurredHowLand"
                                            value={formData.fallOccurredHowLand}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block mb-2">If you slipped but didn’t fall, what stopped you?</label>
                                        <textarea
                                            name="slippedButNotFallWhatStop"
                                            value={formData.slippedButNotFallWhatStop}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block mb-2">Have you previously consulted an attorney regarding your case?</label>
                                        <div className="mb-4">
                                            <label className="mr-4">
                                                <input
                                                    type="radio"
                                                    name="previouslyConsultedAnAttorney"
                                                    value="Yes"
                                                    checked={formData.previouslyConsultedAnAttorney === "Yes"}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                Yes
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="previouslyConsultedAnAttorney"
                                                    value="No"
                                                    checked={formData.previouslyConsultedAnAttorney === "No"}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                No
                                            </label>
                                        </div>


                                        {formData.consultedAttorney === "Yes" && (
                                            <>
                                                <label className="block mb-2">Attorney's Name, Firm, Address, and Phone</label>
                                                <textarea
                                                    name="attorneyDetails"
                                                    value={formData.attorneyDetails}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border rounded-lg mb-4"
                                                    rows="4"
                                                ></textarea>

                                                <label className="block mb-2">Is your relationship with the attorney ongoing?</label>
                                                <div className="mb-4">
                                                    <label className="mr-4">
                                                        <input
                                                            type="radio"
                                                            name="ongoingAttorney"
                                                            value="Yes"
                                                            checked={formData.ongoingAttorney === "Yes"}
                                                            onChange={handleChange}
                                                            className="mr-2"
                                                        />
                                                        Yes
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="ongoingAttorney"
                                                            value="No"
                                                            checked={formData.ongoingAttorney === "No"}
                                                            onChange={handleChange}
                                                            className="mr-2"
                                                        />
                                                        No
                                                    </label>
                                                </div>

                                                <label className="block mb-2">Has an attorney declined to represent you?</label>
                                                <div className="mb-4">
                                                    <label className="mr-4">
                                                        <input
                                                            type="radio"
                                                            name="attorneyDeclined"
                                                            value="Yes"
                                                            checked={formData.attorneyDeclined === "Yes"}
                                                            onChange={handleChange}
                                                            className="mr-2"
                                                        />
                                                        Yes
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="attorneyDeclined"
                                                            value="No"
                                                            checked={formData.attorneyDeclined === "No"}
                                                            onChange={handleChange}
                                                            className="mr-2"
                                                        />
                                                        No
                                                    </label>
                                                </div>

                                                {formData.attorneyDeclined === "Yes" && (
                                                    <>
                                                        <label className="block mb-2">If yes, why?</label>
                                                        <textarea
                                                            name="attorneyDeclinedReason"
                                                            value={formData.attorneyDeclinedReason}
                                                            onChange={handleChange}
                                                            className="w-full px-3 py-2 border rounded-lg mb-4"
                                                            rows="3"
                                                        ></textarea>
                                                    </>
                                                )}
                                            </>
                                        )}


                                    </div>

                                </>
                            )}


                            {step === 10 && (
                                <div>
                                    <label className="block mb-2">Additional Notes</label>
                                    <textarea
                                        name="additionalNote"
                                        value={formData.additionalNote}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg mb-4"
                                        rows="5"
                                        placeholder="Enter any additional details related to your case..."
                                    ></textarea>
                                </div>

                            )}



                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default DetailForm

