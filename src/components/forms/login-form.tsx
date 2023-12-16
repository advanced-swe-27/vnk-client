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
import { LOGIN_USER } from "@/utils/server/auth"
import { useMutation } from "@tanstack/react-query"
import { ForgotStoreType, UserRes } from "@/types"
import { useLocalStorage } from "react-use"

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }).min(10, {
        message: "Please enter more than 10 characters"
    }),
    password: z.string().min(8, "Password should be more than 7 characters")
})

export default function LoginForm() {
    const [localUser, setLocalUser,] = useLocalStorage<UserRes | null>("user", null)
    const [_forgotStore, setForgotStore] = useLocalStorage<ForgotStoreType>("forgot-store", { username: "", tab: "send-code", token: "" });
    const [viewPassword, setViewPassword] = useState(false)

    const toggleViewPassword = () => {
        setViewPassword((prev) => !prev)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const loginUser = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            const info = {
                email: values.email,
                password: values.password,
            }

            return LOGIN_USER(info)
        }
    })
        

    function onSubmit(values: z.infer<typeof formSchema>) {
        const toastSubmitId = toast.success("Logging in")

        loginUser.mutate(values, {
            onSuccess: (data) => {
                console.log(data);

                toast.success(`Login Successful`, {
                    id: toastSubmitId
                })

                setLocalUser(data)

                if (typeof window !== "undefined") {
                    location.reload()
                }
            },
            onError: (error: any) => {
                toast.error(error?.response?.data || "Couldn't log you in", {
                    id: toastSubmitId
                })
                console.log(error);

            }

        })

    }
    return (
        <main className="w-screen bg-black/5 h-screen overflow-hidden flex flex-col gap-4 items-center justify-center">

        <Form   {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 py-8 max-w-lg w-full space-y-5 bg-white shadow-md rounded-lg md:p-8">
                <div className="flex flex-col gap-2 text-sm text-center">
                    <h1 className="text-3xl text-left font-bold">Login</h1>

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
                <FormField
                    control={form.control}
                    name="password"
                    disabled={false}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex relative ">
                                    <Input type={viewPassword ? "text" : "password"} className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0  " placeholder="Password" {...field} />
                                    <button onClick={toggleViewPassword} type="button" className="absolute right-0 rounded-lg  bg-neutral-200 flex items-center justify-center h-full aspect-square ">
                                        {
                                            viewPassword ? <BsEyeSlash /> : <BsEye />
                                        }
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <Link href="/forgot-password"><p className="text-neonblue ">Forgot Password?</p></Link>
                </div>

                <Button disabled={loginUser.isPending} className=" w-full bg-primaryy" type="submit">
                    {loginUser.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                    Submit
                </Button>

                

            </form>
        </Form>
        </main>
    )
}