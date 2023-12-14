import LoginForm from "@/components/forms/login-form";
import Image from "next/image";

export default function LoginPage() {
    return ( 
        <main style={{
            backgroundImage: `url("/assets/images/backgroundImg.png")`,
            backgroundRepeat: "no-repeat",
        }} className='min-h-screen flex items-center justify-center'>
            <div className=' absolute top-4 left-4'>
                <Image
                    src="/assets/images/companyLogo.png"
                    width={100}
                    height={100}
                    alt="Logo"
                />
            </div>

            <div className='max-w-lg w-full mx-5 my-5'>
                <LoginForm />
            </div>
        </main>
    )


}