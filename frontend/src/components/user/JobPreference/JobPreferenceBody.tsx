import React, { useState } from "react";
import { MapPin } from "lucide-react";
import SelectableCard from "../../common/Cards/SelectableCards";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { Button } from "../../common/Buttons/Button";

function JobPreferenceBody() {
  // State to handle selected job preferences
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [preferenceType, setPreferenceType] = useState<string>("Jobs");
  // List of sample job preferences (these could be fetched from an API)
  const jobPreferences = [
    "Software Development",
    "Data Science",
    "Product Management",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Sales",
    "Customer Support",
    "Finance",
    "Product Management",
    "Data Science",
    "Software Development",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Finance",
    "Sales",
    "Customer Support",
    "Finance",
    "Product Management",
    "Data Science",
    "Software Development",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Finance",
    "Sales",
    "Customer Support",
    "Finance",
    "Product Management",
    "Data Science",
    "Software Development",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Finance",
    "Finance",
    "Product Management",
    "Data Science",
    "Software Development",
    "Sales",
    "Customer Support",
    "Finance",
    "Product Management",
    "Data Science",
    "Software Development",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Finance",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "Finance", // Add more if needed
  ];
  const locationPreference = [
    "Delhi",
    "Kerala",
    "Banglore",
    "Thiruvananthapuram",
    "Madhy Pradesh",
  ];

  const TimePreference = [
    "full",
    "half",
   
    "Madh",
  ];

  const getCurrentPreferences = () => {
    switch (preferenceType) {
      case "Job Locations":
        return locationPreference;
      case "Working Time":
        return TimePreference
      default:
        return jobPreferences;
    }
  };

  // Toggle a job preference
  const handlePreferenceChange = (preference: string) => {
    setSelectedPreferences((prevSelected) =>
      prevSelected.includes(preference)
        ? prevSelected.filter((item) => item !== preference)
        : [...prevSelected, preference]
    );
  };

  const handleNext = () => {
    if (preferenceType == "Jobs") {
      setPreferenceType("Job Locations");
    } else {
      setPreferenceType("Working Time");
    }
  };
  
  const handlePrev = () => {
    if (preferenceType == "Working Time") {
      setPreferenceType("Job Locations");
    } else {
      setPreferenceType("Jobs");
    }
  };

  return (
    <>
      {/* Header with title and icon */}
      <header className="sticky top-0 z-10 px-4 md:px-6 h-16 flex items-center bg-white shadow-md">
        <a className="flex items-center" href="#">
          <MapPin className="h-6 w-6" />
          <span className="ml-2 text-lg md:text-2xl font-bold">Job Pulse</span>
        </a>
      </header>

      {/* Breadcrumbs and Skip button */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 bg-gray-200 rounded-2xl w-full h-16">
          <Breadcrumbs className="gap-3">
            <a
              onClick={()=>setPreferenceType('Jobs')}
              className={`${
                preferenceType === "Jobs" ? "text-dark text-lg font-bold" : "opacity-60 text-sm"
              } text-sm md:text-md`}
            >
              Preferred Jobs
            </a>
            <a 
            onClick={()=>setPreferenceType('Job Locations')}
             className={`${
                preferenceType === "Job Locations" ?"text-dark text-lg font-bold" : "opacity-60 text-sm"
              } text-sm md:text-md`}>
              Job Locations
            </a>
            <a
             onClick={()=>setPreferenceType('Working Time')}
             className={`${
                preferenceType === "Working Time" ? "text-dark text-lg font-bold" : "opacity-60 text-sm"
              }  md:text-md`}>
              Job Time
            </a>
            
          </Breadcrumbs>
          <Button className="text-xs md:text-sm">Skip</Button>
        </div>
      </div>

      {/* Main content section with scrollable job preferences */}
      <section className="relative h-[calc(100vh-240px)] w-100vh px-4 md:px-6 py-4">
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-semibold">
            Please Select Your Preferred {preferenceType}
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Choose the {preferenceType} that best match your career interests.
          </p>
        </div>

        {/* Scrollable Job preferences container */}
        <div className="overflow-y-auto h-[45vh] pr-4 md:pr-6">
          <div className="flex flex-wrap gap-4 md:gap-6">
            {getCurrentPreferences().map((preference , index) => (
              <SelectableCard
                key={preference +index }
                label={preference}
                selected={selectedPreferences.includes(preference)}
                onClick={() => handlePreferenceChange(preference)}
                className="w-24 md:w-32 lg:w-40"
              />
            ))}
          </div>
        </div>

        {/* Positioned Next button at the bottom */}
        <div className="text-center md:text-right mt-4 px-8 md:mt-6">
          {preferenceType === 'Jobs'? (<></>) :( <Button
    onClick={handlePrev}
    className="bg-white !text-blue-500 px-4 py-2 hover:bg-blue-200 shadow-lg rounded-md text-sm md:text-base mr-2"
    style={{ color: 'rgb(37, 99, 235)' }} // Inline style to force color blue
  >
    Prev
  </Button>) }
 
  <Button
    onClick={handleNext}
    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-base"
  >
    {preferenceType === "Working Time" ? "Finish" : "Next"}
  </Button>
</div>


      </section>
    </>
  );
}

export default JobPreferenceBody;
