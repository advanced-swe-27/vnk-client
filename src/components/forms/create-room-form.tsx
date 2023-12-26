"use client"
import { Gender, Room, RoomRes, UserRes, UserRoles } from "@/types";
import { CREATE_USER } from "@/utils/server/user";
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
import { CREATE_ROOM } from "@/utils/server/room";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const formSchema = z.object({
    num: z.string().min(1, {
        message: "Please enter more than 10 characters"
    }),
    gender: z.custom<Gender>(),
    capacity: z.string().min(1, "Surname should be more than 3 characters"),
})
export default function CreateRoomForm() {
    const [localUser, setLocalUser,] = useLocalStorage<UserRes | null>("user", null)
    const queryClient = useQueryClient()

    const initialGender: Gender = "MALE"

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            num: "",
            gender: initialGender,
            capacity: "4",
        },
    })

    const createUser = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            if (!localUser || !localUser?.token) {
                throw new Error("Please login again")
            } 

            const newVals: Room = {
                num: values.num,
                gender: values.gender,
                capacity: _.toNumber(values.capacity),
            }

            return CREATE_ROOM(newVals, localUser.token )
        },
        onSuccess: (newData) => {
            queryClient.setQueryData([`rooms`], (oldData: RoomRes[]) => {
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
        const toastSubmitId = toast.loading("Creating Room")

        createUser.mutate(values, {
            onSuccess: (data) => {
                console.log(data);

                toast.success(`Room created`, {
                    id: toastSubmitId
                })

                location.reload()

                if (typeof window !== "undefined") {
                    location.reload()
                }
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Couldn't create room", {
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
                    name="num"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Room Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               
               <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>

                                    </SelectGroup>

                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
               <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a capacity" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        <SelectItem value={"2"}>2</SelectItem>
                                        <SelectItem value={"4"}>4</SelectItem>

                                    </SelectGroup>

                                </SelectContent>
                            </Select>

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