"use client"
import { Gender, Room, RoomRes, UserRes, UserRoles } from "@/types";
import { CREATE_USER } from "@/utils/server/user";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
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
import { CREATE_VISITOR } from "@/utils/server/visitor";
import { Checkbox } from "../ui/checkbox";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }).min(10, {
        message: "Please enter more than 10 characters"
    }),
    othernames: z.string().min(3, "Othername should be more than 3 characters"),
    surname: z.string().min(3, "Surname should be more than 3 characters"),
    residence: z.string().min(3, "Residence should be more than 3 characters"),
    sid: z.string(),
    phone: z.string().regex(phoneRegex, 'Invalid Number!'),
    isStudent: z.boolean().default(true),
})


export default function CreateVisitorForm() {
    const [localUser, setLocalUser,] = useLocalStorage<UserRes | null>("user", null)
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            othernames: "",
            surname: "",
            phone: "",
            residence: "",
            sid: "",
            isStudent: true,
        },
    })

    const createUser = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            if (!localUser || !localUser?.token) {
                throw new Error("Please login again")
            }


            return CREATE_VISITOR(values, localUser.token)
        },
        onSuccess: (newData) => {
            queryClient.setQueryData([`visitors`], (oldData: RoomRes[]) => {
                return [...oldData, newData]
            })
            location.reload()

            // toast.success("Created User successfully")
            if (typeof window !== "undefined") {
                location.reload()
            }
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const toastSubmitId = toast.loading("Creating visitor")

        createUser.mutate(values, {
            onSuccess: (data) => {
                console.log(data);

                toast.success(`Visitor created`, {
                    id: toastSubmitId
                })

                location.reload()

                if (typeof window !== "undefined") {
                    location.reload()
                }
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Couldn't create visitor", {
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
                    name="surname"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Surname *" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="othernames"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Othernames *" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" inputMode="email" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Email *" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="tel" inputMode="tel" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Phone number *" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="residence"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Residence *" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sid"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input inputMode="numeric" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Student ID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isStudent"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-end gap-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="font-light">
                                This visitor is a student in the university
                            </FormLabel>

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