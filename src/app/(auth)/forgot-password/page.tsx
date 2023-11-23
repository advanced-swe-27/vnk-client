import ForgotPasswordForm from '@/components/forms/forgot-password-form'
import Image from 'next/image'
import React from 'react'
export default function ForgotPasswordPage() {
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
      <ForgotPasswordForm />
      </div>
    </main>
      
    
  )
}
