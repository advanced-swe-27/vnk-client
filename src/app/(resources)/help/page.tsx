import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Scroll, Terminal } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const RESOURCES = [
    {
        resource: "Typescript",
        description: "Documentation to help you understand more about types and interfaces",
        link: "https://www.typescriptlang.org/docs/",
    },
    {
        resource: "Shadcn UI",
        description: "Documentation to help you understand more about the main reusable components and how to use them effectively",
        link: "https://ui.shadcn.com",
    },
    {
        resource: "Tailwind CSS",
        description: "Documentation to help you understand more about the main styling system in the project",
        link: "https://tailwindcss.com/docs/installation",
    },
    {
        resource: "Axios",
        description: "Learn more about the library we will use to make HTTP requests to the backend",
        link: "https://axios-http.com/docs/intro",
    },
    {
        resource: "Context API",
        description: "This what we use to manage state in the application",
        link: "https://www.freecodecamp.org/news/context-api-in-react/",
    },
    {
        resource: "React Hooks YT",
        description: "A short video on essential React Hooks",
        link: "https://www.youtube.com/watch?v=9mTgKFjJRXg",
    },
    {
        resource: "React Hooks Docs",
        description: "Documentation for essential react hooks",
        link: " https://react.dev/reference/react/hooks",
    },
    {
        resource: "Next App Router",
        description: "Learn more about NextJS App router and how to use 'use client' and stuff like that",
        link: " https://blog.logrocket.com/next-js-13-app-router/",
    },
    {
        resource: "Hydration Errors",
        description: "This is a common bug you may experience if you are not familiar with NextJS. Learn more about it",
        link: "https://blog.stackademic.com/hydration-errors-in-next-js-applications-navigating-mismatches-for-smooth-rendering-39d11df841eb?gi=f0d4449ea34a#:~:text=Hydration%20errors%20occur%20when%20the,HTML%20on%20the%20client%20side",
    },
    {
        resource: "NextJS 13",
        description: "We are using NextJS 14.0.2 but its basically the same as Next13 so you can watch a short video on it here",
        link: "https://www.youtube.com/watch?v=gSSsZReIFRk",
    },
]

export default function HelpPage() {
    return (
        <main className='flex flex-col gap-4 items-center justify-center h-screen container py-8'>
            <ScrollArea className='max-w-3xl h-[500px]'>
            <Table className='max-w-3xl mx-auto '>
                <TableCaption>A list of dev resources.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Resource</TableHead>
                        <TableHead className="text-right flex-shrink-0 ">Link</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {RESOURCES.map((item) => (
                        <TableRow key={item.resource}>
                            <TableCell className=" w-full">
                                <h1 className='w-full font-semibold'>

                                {item.resource}
                                </h1>
                                <p className='max-w-[85%] text-xs text-neutral-500'>
                                {item.description}
                                </p>
                            </TableCell>
                            <TableCell className="text-right  text-blue-500">
                                <Link target='_blank' className='w-full' href={item.link}>
                                    Learn 
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </ScrollArea>
            <Alert className='absolute bottom-8 left-4 mx-auto max-w-lg'>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    Please don&apos;t edit this page until an issue has been created on it
                </AlertDescription>
            </Alert>
        </main>
    )
}