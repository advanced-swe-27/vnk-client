"use client"
import { UserRes, UserRoles } from "@/types";
import { CHANGE_USER_PASSWORD, CREATE_USER, UPDATE_USER } from "@/utils/server/user";
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
import { useLocalStorage } from "react-use"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import _ from "lodash";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
    oldPassword: z.string().min(3, "Old password should be more than 3 characters"),
    newPassword: z.string().min(6, "New password should be more than 6 characters"),
})

export default function ChangePasswordForm() {
    const [localUser, setLocalUser, removeLocalUser] = useLocalStorage<UserRes | null>("user", null)

    function onLogout() {
        removeLocalUser()
        if (typeof window !== "undefined") {
            location.reload()
        }
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    })

    const createUser = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            if (!localUser || !localUser?.token) {
                throw new Error("Please login again")
            }

            const newVals = {
                ...values,
                email: localUser.email
            }
            return CHANGE_USER_PASSWORD(newVals, localUser.token)
        },
        onSuccess: (newData) => {
           onLogout()
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const toastSubmitId = toast.loading("Updating your password")

        createUser.mutate(values, {
            onSuccess: (data) => {
                console.log(data);

                toast.success(`Your password has been updated`, {
                    id: toastSubmitId
                })

                onLogout()

            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Couldn't update details", {
                    id: toastSubmitId
                })
                console.log(error);

            }

        })

    }

    return (
        <Form   {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-lg w-full space-y-5  ">
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Old Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="New Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                



                <Button disabled={createUser.isPending} className=" w-full bg-primaryy" type="submit">
                    {createUser.isPending && <Loader2 className="animate-spin h-4 w-4 mr-4" />}
                    Submit
                </Button>
            </form>

        </Form>
    )
}