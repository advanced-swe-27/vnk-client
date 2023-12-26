import ResidentMultiStepForm from "@/components/forms/resident-multi-step-form";

export default function ResidentPage() {
    return (
        <section className="w-full h-screen grid  md:grid-cols-2 ">
            <div className="w-full  hidden md:block relative bg-cover " style={{
                backgroundImage: `url('/assets/images/resident.jpg')`
            }} >

            </div>
            <div className="w-full flex flex-col gap-8 p-4 lg:p-8 flex-1 h-full">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl">
                        Register as a Resident
                    </h2>
                    <p className="text-sm text-neutral-500">
                    Enter all the correct details to register as a resident of the hall
                    </p>
                </div>
                <ResidentMultiStepForm />
            </div>
        </section>
    )
}