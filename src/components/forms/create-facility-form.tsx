"use client"
import { FacilityRes, UserRes, } from "@/types";
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
import { Textarea } from "@/components/ui/textarea"
import { CREATE_FACILITY } from "@/utils/server/facility";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Please enter more than 10 characters"
    }),
    description: z.string().min(5, "Surname should be more than 3 characters"),
})
export default function CreateFacilityForm() {
    const [localUser, setLocalUser,] = useLocalStorage<UserRes | null>("user", null)
    const queryClient = useQueryClient()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const createUser = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            if (!localUser || !localUser?.token) {
                throw new Error("Please login again")
            } 


            return CREATE_FACILITY(values, localUser.token )
        },
        onSuccess: (newData) => {
            queryClient.setQueryData([`facilities`], (oldData: FacilityRes[]) => {
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
        const toastSubmitId = toast.loading("Creating Facility")

        createUser.mutate(values, {
            onSuccess: (data) => {
                console.log(data);

                toast.success(`Facility created`, {
                    id: toastSubmitId
                })

                location.reload()

                if (typeof window !== "undefined") {
                    location.reload()
                }
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Couldn't create facility", {
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               
               <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                           <Textarea className="text-black outline-0 resize-none focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Description" {...field} />
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