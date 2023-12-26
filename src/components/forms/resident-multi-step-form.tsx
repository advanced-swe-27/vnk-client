"use client";

import { FormProvider, useFormState } from "@/context/resident-form-context";
import PersonalDetailsForm from "./resident/personal-details-form";
import SchoolDetailsForm from "./resident/school-details-form";
import UploadPictureForm from "./resident/upload-picture-form";
import HallDetailsForm from "./resident/hall-details-form";


function MultiStepForm() {
    const { step } = useFormState();
    switch (step) {
        case 1:
          return <PersonalDetailsForm />;
        case 2:
          return <SchoolDetailsForm />;
        case 3:
          return <UploadPictureForm />;
        case 4:
          return <HallDetailsForm />;
        default:
          return null;
      }
}

export default function ResidentMultiStepForm() {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  )
}