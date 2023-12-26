"use client"

import { CreateResidentInput } from "@/types";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

interface IFormContext {
    formData: CreateResidentInput;
    setFormData: Dispatch<SetStateAction<CreateResidentInput>>;
    onHandleBack: () => void;
    onHandleNext: () => void;
    step: number;
}

const FormContext = createContext<IFormContext>({
    formData: {
        // personal details
        othernames: "",
        surname: "",
        dob: new Date(),
        gender: "MALE",
        phone: "",

        // school details
        sid: "",
        email: "",
        programme: "",
        level: "100",

        // upload picture form
        imageUrl: "",

        // hall details
        room: "",
    },
    onHandleBack: () => { },
    onHandleNext: () => { },
    setFormData: () => { },
    step: 0,
});

interface IProps {
    children: ReactNode;
}

export function FormProvider({ children }: IProps) {
    const [formData, setFormData] = useState<CreateResidentInput>({
        othernames: "",
        surname: "",
        dob: new Date(),
        gender: "MALE",
        phone: "",
        sid: "",
        email: "",
        programme: "",
        level: "100",
        imageUrl: "",
        room: "",
    });
    const [step, setStep] = useState(1);

    function onHandleNext() {
        setStep((prev) => prev + 1);
    }

    function onHandleBack() {
        setStep((prev) => prev - 1);
    }

    return (
        <FormContext.Provider
            value={{ formData, setFormData, onHandleBack, onHandleNext, step }}
        >
            {children}
        </FormContext.Provider>
    );
}

export function useFormState() {
    return useContext(FormContext);
}