import React from "react";
import BasicInformation from "./BasicInformation";
import ContactInformation from "./ContactInformation";
import SecureInformation from "./SecureInformation";

const ProfileInformation = () => {
  return (
    <section className="lg:w-9/12 flex gap-2 w-[90%] mx-auto sm:flex-col">
      <div className="w-1/2 sm:w-full">
        <BasicInformation />
      </div>
      <div className="w-1/2 flex flex-col gap-y-2 sm:w-full">
        <div className="basis-5/12">
          <SecureInformation />
        </div>
        <div className="basis-7/12">
          <ContactInformation />
        </div>
      </div>
    </section>
  );
};

export default ProfileInformation;
