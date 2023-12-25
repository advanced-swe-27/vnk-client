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
import { useMutation } from "@tanstack/react-query"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { useState } from "react"
import { LOGIN_USER, RESET_PASSWORD, SEND_VERIFICATION_CODE, VERIFY_CODE } from "@/utils/server/auth"
import { useLocalStorage } from 'react-use';
import { ForgotStoreType, } from '@/types';
import Link from "next/link"
import { useRouter } from "next/navigation"


const schemas = {
    sendCode: z.object({
        email: z.string().email({
            message: "Please enter a valid email"
        }).min(8, {
            message: "Please enter more than 8 characters"
        }),
    }),
    verifyCode: z.object({
        code: z.string().min(6, {
            message: "Enter 6 characters"
        }).max(6, "Enter 6 characters"),
    }),
    resetPassword: z.object({
        newPassword: z.string().min(6, {
            message: "Please enter more than 6 characters"
        }),
        rNewPassword: z.string(),
    }).refine((data) => data.newPassword === data.rNewPassword, {
        message: "Passwords don't match",
        path: ["rNewPassword"], // path of error
    }),
}

export default function ForgotPasswordForm() {
    const [forgotStore, setForgotStore] = useLocalStorage<ForgotStoreType>("forgot-store", { username: "", tab: "send-code", token: "" });

    const router = useRouter()

    const forms = {
        sendCode: useForm<z.infer<typeof schemas.sendCode>>({
            resolver: zodResolver(schemas.sendCode),
            defaultValues: {
                email: "",
            },
        }),
        verifyCode: useForm<z.infer<typeof schemas.verifyCode>>({
            resolver: zodResolver(schemas.verifyCode),
            defaultValues: {
                code: "",
            },
        }),
        resetPassword: useForm<z.infer<typeof schemas.resetPassword>>({
            resolver: zodResolver(schemas.resetPassword),
            defaultValues: {
                newPassword: "",
                rNewPassword: "",
            },
        }),
    }

    const mutations = {
        sendCode: useMutation({
            mutationFn: (values: z.infer<typeof schemas.sendCode>) => {
                const info = {
                    email: values.email,
                }

                return SEND_VERIFICATION_CODE(info)
            }
        }),
        verifyCode: useMutation({
            mutationFn: (values: z.infer<typeof schemas.verifyCode>) => {
                const info = {
                    code: values.code,
                    email: forgotStore?.username || ""
                }

                return VERIFY_CODE(info)
            }
        }),
        resetPassword: useMutation({
            mutationFn: (values: z.infer<typeof schemas.resetPassword>) => {
                const info = {
                    newPassword: values.newPassword,
                    email: forgotStore?.username || ""
                }

                return RESET_PASSWORD(info)
            }
        }),
    }

    const submitFunctions = {
        sendCode: function onSubmit(values: z.infer<typeof schemas.sendCode>) {
            const toastSubmitId = toast.loading("Sending code")

            mutations.sendCode.mutate(values, {
                onSuccess: (data) => {
                    console.log("send-code", data);

                    toast.success(`Code Sent`, {
                        id: toastSubmitId
                    })

                    setForgotStore({
                        tab: "verify-code",
                        username: values.email,
                        token: ""
                    })

                    // if (typeof window !== "undefined") {
                    //     location.reload()
                    // }
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Couldn't send code", {
                        id: toastSubmitId
                    })
                    console.log(error);
                }
            })
        },
        verifyCode: function onSubmit(values: z.infer<typeof schemas.verifyCode>) {
            const toastSubmitId = toast.loading("Sending code")

            mutations.verifyCode.mutate(values, {
                onSuccess: (data) => {
                    console.log("verify-code", data);

                    toast.success(`Code Verified`, {
                        id: toastSubmitId
                    })

                    setForgotStore({
                        ...forgotStore,
                        tab: "reset-password",
                    })

                    // if (typeof window !== "undefined") {
                    //     location.reload()
                    // }
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Couldn't verify code", {
                        id: toastSubmitId
                    })
                    console.log(error);
                }
            })
        },
        resetPassword: function onSubmit(values: z.infer<typeof schemas.resetPassword>) {
            const toastSubmitId = toast.loading("Changing Password")

            mutations.resetPassword.mutate(values, {
                onSuccess: (data) => {
                    console.log("reset-password", data);

                    toast.success(`Password Changed`, {
                        id: toastSubmitId
                    })

                    setForgotStore({
                        ...forgotStore,
                        tab: "send-code",
                    })

                    router.push("/admin")


                    // if (typeof window !== "undefined") {
                    //     location.reload()
                    // }
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Couldn't change password", {
                        id: toastSubmitId
                    })
                    console.log(error);
                }
            })
        },
    }

    return (
        <>
            {/* SEND CODE FORM */}
            {
                forgotStore?.tab === "send-code" && (
                    <Form {...forms.sendCode}>
                        <form onSubmit={forms.sendCode.handleSubmit(submitFunctions.sendCode)} className="max-w-lg w-full space-y-4 bg-white shadow-md rounded-lg p-4 sm:p-8">
                            <div className="flex flex-col gap-2 text-sm text-center">
                                <h1 className="text-3xl text-center font-medium">Forgot your password?</h1>
                                <p className="text-neutral-500 text-xs">
                                    Enter your email address to receive an email with a verification code.
                                </p>
                            </div>
                            <FormField
                                control={forms.sendCode.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={mutations.sendCode.isPending} placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="mt-4">

                                <Link href="/" className="text-xs  text-blue-600" >
                                    Remember your password?
                                </Link>
                            </div>
                            <Button disabled={mutations.sendCode.isPending} className=" w-full" type="submit">
                                {mutations.sendCode.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                                Submit
                            </Button>
                        </form>
                    </Form>
                )
            }

            {/* VERIFY CODE FORM */}
            {
                forgotStore?.tab === "verify-code" && (
                    <Form {...forms.verifyCode}>
                        <form onSubmit={forms.verifyCode.handleSubmit(submitFunctions.verifyCode)} className="max-w-lg w-full space-y-4 bg-white shadow-md rounded-lg p-4 sm:p-8">
                            <div className="flex flex-col gap-2 text-sm text-center">
                                <h1 className="text-3xl text-center font-medium">Forgot your password?</h1>
                                <p className="text-neutral-500 text-xs">
                                    Enter the 6 digit code sent to your email address ({forgotStore?.username})
                                </p>
                            </div>
                            <FormField
                                control={forms.verifyCode.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={mutations.verifyCode.isPending} placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="mt-4">

                                <Link href="/" className="text-xs  text-blue-600" >
                                    Remember your password?
                                </Link>
                            </div>
                            <Button disabled={mutations.verifyCode.isPending} className=" w-full" type="submit">
                                {mutations.verifyCode.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                                Submit
                            </Button>
                        </form>
                    </Form>
                )
            }
            {/* RESET PASSWORD FORM */}
            {
                forgotStore?.tab === "reset-password" && (
                    <Form {...forms.resetPassword}>
                        <form onSubmit={forms.resetPassword.handleSubmit(submitFunctions.resetPassword)} className="max-w-lg w-full space-y-4 bg-white shadow-md rounded-lg p-4 sm:p-8">
                            <div className="flex flex-col gap-2 text-sm text-center">
                                <h1 className="text-3xl text-center font-medium">Update password</h1>
                                <p className="text-neutral-500 text-xs">
                                    Hello {forgotStore?.username}, kindly enter a new password to use with your account
                                </p>
                            </div>
                            <FormField
                                control={forms.resetPassword.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="password" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={mutations.resetPassword.isPending} placeholder="New Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={forms.resetPassword.control}
                                name="rNewPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="password" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={mutations.resetPassword.isPending} placeholder="Confirm New Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="mt-4">

                                <Link href="/" className="text-xs  text-blue-600" >
                                    Remember your password?
                                </Link>
                            </div>
                            <Button disabled={mutations.resetPassword.isPending} className=" w-full" type="submit">
                                {mutations.resetPassword.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                                Submit
                            </Button>
                        </form>
                    </Form>
                )
            }
        </>
    )
}