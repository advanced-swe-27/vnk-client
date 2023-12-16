"use client"
import { usePathname, useRouter } from "next/navigation"
import _ from "lodash"

export default function PageTitle() {
    const pathname = usePathname()
    const router = useRouter()
    const paths = pathname.split("/")

    function generatePageTitle(): string {
        if (pathname === "/admin") {
            return _.capitalize("dashboard")
        } else if (paths.length === 3) {
            return _.startCase(_.replace(paths[2], "-", " "))
        } else if (paths.length === 4) {
            return `${_.capitalize(paths[3])} ${_.startCase(_.replace(paths[2], "-", " "))}`
        }
        return ""
    }

    const pageTitle = generatePageTitle()
    // console.log(pageTitle);

    return (
        <div className="w-full flex justify-between  gap-2 p-4">
           
            <h1 className="font- text-3xl xl:text-4xl tracking-tighter">
                {pageTitle}
            </h1>

            {
                pathname !== "/admin" && 
            <button className="text-sm text-white py-[1px] bg-black rounded-md w-max pr-2 flex items-center" onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
            </button>
            }
        </div>
    )
}