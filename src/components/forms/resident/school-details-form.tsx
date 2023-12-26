"use client"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/context/resident-form-context"
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
import { Gender } from "@/types"
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
    sid: z.string().min(2, "Student ID should be more than 1 characters"),
    email: z.string().email({
        message: "Please enter a valid email"
    }).min(2, "School email should be more than 1 characters"),
    programme: z.string().min(3, "Programme should be more than 3 characters"),
    level: z.string().min(2, "Level should be more than 6 characters"),
})

export default function SchoolDetailsForm() {
    const { onHandleNext, setFormData, formData, onHandleBack, step } = useFormState();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sid: formData.sid,
            email: formData.email,
            programme: formData.programme,
            level: formData.level,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setFormData((prev: any) => ({ ...prev, ...values }));
        onHandleNext();
    }
    return (
        <Form   {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="  w-full space-y-5  ">
                <h4 className="text-xl">
                    School Details
                </h4>
                <FormField
                    control={form.control}
                    name="sid"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Student ID" {...field} />
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
                                <Input type="email" inputMode="email" className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="School email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="programme"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="text-black outline-0 focus:ring-0 focus-visible:ring-offset-0 " disabled={false} placeholder="Programme" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

              

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a level" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Level</SelectLabel>
                                        <SelectItem value="100">100</SelectItem>
                                        <SelectItem value="200">200</SelectItem>
                                        <SelectItem value="300">300</SelectItem>
                                        <SelectItem value="400">400</SelectItem>
                                        <SelectItem value="500">500</SelectItem>
                                        <SelectItem value="600">600</SelectItem>
                                        <SelectItem value="700">700</SelectItem>

                                    </SelectGroup>

                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="ml-auto w-max flex items-center gap-4">
                    {
                        step !== 1 &&
                        <Button onClick={onHandleBack} variant="secondary" className="px-8 gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                            Previous
                        </Button>
                    }
                    <Button type="submit" className="px-8 gap-4">
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>

                    </Button>
                </div>
            </form>
        </Form>
    )
}