"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { useState } from "react"
import Link from "next/link"

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }).min(10, {
        message: "Please enter more than 10 characters"
    }),
    password: z.string().min(8, "Password should be more than 7 characters")
})

export default function ForgotPasswordForm() {



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const toastSubmitId = toast.success("Logging in")

        

    }
    return(
        <Form   {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg w-full space-y-5 bg-white shadow-md rounded-lg md:p-8">
                <div className="flex flex-col gap-2 text-sm text-center">
                    <h1 className="text-3xl text-left font-bold">Forgot Password?</h1>

                  
                </div>
                <div>
                    <p className="text-gray text-[12px] font-medium ">Enter your email and we will send you are link to reset your password</p>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                

                <Button disabled={false} className=" w-full bg-primaryy" type="submit">
                    {false && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                    Submit
                </Button>
            
                <Button variant={"secondary"} disabled={false} className=" w-full bg-[#EEEEEE] text-black font-medium"  type="submit">
                    {false && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                    Back to Login
                </Button>

                
            </form>
        </Form>
    )
}