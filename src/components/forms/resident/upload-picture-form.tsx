"use client"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/context/resident-form-context"
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from '@firebase/storage'
import { storage } from "../../../../firebase.config"
import { useState } from "react"
import toast from "react-hot-toast"
import { cn, getRandomID } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import CustomLoader from "@/components/loaders/custom-loader"
import Image from "next/image"
import _ from "lodash"


export default function UploadPictureForm() {
    const { onHandleNext, setFormData, formData, onHandleBack, step } = useFormState();
    const [fileLoading, setFileLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [previewImage, setPreviewImage] = useState<any>(formData.imageUrl || null)

    const previewImageFile = (e: any) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0])
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const deleteImage = () => {
        setFileLoading(true)
        setPreviewImage(null)
        setSelectedFile(null)
        setFileLoading(false)
    }


    function onSubmit() {
        if (!!previewImage && _.startsWith(previewImage, "https://")) {
            return onHandleNext();
        }
        
        setFileLoading(true)
        const uploadToast = toast.loading("Uploading images ...")

        const fileName = getRandomID()
        const file = selectedFile
        const storageRef = ref(storage, `/residents/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, (error) => {
            console.log(error)
            toast.error("Error uploading images", { id: uploadToast })
            setFileLoading(false)
            return
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                toast.success("Image uploaded successfully", { id: uploadToast })
                setFileLoading(false)
                setFormData((prev: any) => ({ ...prev, imageUrl: downloadUrl }));
                onHandleNext();

            })
        }
        )


    }
    return (
        <form  className="  w-full space-y-5  ">
            <h4 className="text-xl">
                Upload Image
            </h4>

            <div className={cn(
                "w-full max-w-[320px] mx-auto aspect-square rounded-lg bg-white border-2 border-dashed flex items-center justify-center ",
                previewImage || fileLoading ? "border-transparent" : "border-neutral-400",
                !!previewImage && "relative overflow-hidden"
            )}>
                {
                    fileLoading ? (
                        <CustomLoader />
                    ) : (
                        <>
                            {
                                !!previewImage ?
                                    <>
                                        <Image alt="preview" src={previewImage} fill className="object-cover" />
                                        <Button onClick={deleteImage} type="button" variant="destructive" size="icon" className="absolute z-10 bottom-2 right-2 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </Button>
                                    </> :
                                    <label
                                        className='w-full h-full flex-col gap-2 items-center justify-center flex cursor-pointer'
                                        onClick={() => { }}
                                    >
                                        <div className='flex items-center cursor-pointer justify-center border h-12 w-12 rounded-full bg-gray-100/50 '>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-neutral-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                            </svg>

                                        </div>
                                        <p className='text-xs text-gray-400'>
                                            Click/ Tap to upload an image *
                                        </p>
                                        <input
                                            type='file'
                                            name='uploadimage'
                                            accept='image/*'
                                            onChange={
                                                previewImageFile
                                            }
                                            className='w-0 h-0	'
                                        />
                                    </label>
                            }
                        </>
                    )
                }

            </div>


            <div className="ml-auto w-max flex items-center gap-4">
                {
                    step !== 1 &&
                    <Button onClick={onHandleBack} variant="secondary" type="button" className="px-8 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                        Previous
                    </Button>
                }
                <Button disabled={!previewImage} onClick={onSubmit} type="button" className="px-8 gap-4">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>

                </Button>
            </div>
        </form>
    )
}