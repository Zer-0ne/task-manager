'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { Dialog, DialogDescription } from './ui/drawer'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Task, User } from "@/utils/interfaces"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { deleteTask } from "@/slice/task"
import { PostModal } from "./new-post"
import Image from "next/image"

export function Cards({
    data
}: {
    data?: Task
}) {
    const dispatch = useDispatch<AppDispatch>();
    function TaskCard() {
        return (
            <Card className="max-w-[100%] transition ease-in-out duration-500 dark:hover:border-[#ffffff74] hover:border-[#00000074] flex flex-col cursor-pointer">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">{data?.title}</CardTitle>
                    <div
                        className="!my-3 flex gap-2 items-center"
                    >
                        {
                            (data?.author as User)?.image ? (<>
                                <Image
                                    width={20}
                                    className="rounded-full"
                                    height={20}
                                    alt={(data?.author as User)?.name}
                                    src={(data?.author as User)?.image as string}
                                />
                                <p
                                    className="text-[.8rem] opacity-75 font-medium"
                                >{(data?.author as User)?.name as string}</p>
                            </>
                            ) : (
                                <span className="text-gray-500 p-1 bg-white rounded-full w-[20px] h-[20px] text-xs">{(data?.author as User)?.name?.match(/\b\w/g)?.join("").toUpperCase()}</span> // Placeholder text
                            )
                        }
                    </div>
                    <CardDescription>
                        <p
                            className="truncate"
                        >
                            {data?.description}

                        </p>
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }
    return <Dialog>
        <DialogTrigger asChild>
            <div className="flex-1 overflow-hidden grow lg:grow-0 md:grow-0 basis-[350px] ">
                <TaskCard />
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded lg:rounded">
            <DialogHeader className="space-y-2">
                <DialogTitle>{data?.title}</DialogTitle>
                <DialogDescription>
                    {data?.description}
                    {/* Make changes to your task here. Click save when you're done. */}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter
                className="flex gap-3 flex-wrap lg:gap-1"
            >
                <PostModal
                    data={data}
                    btnText={`Edit ${data?.title}`}
                />
                <Button onClick={() => dispatch(deleteTask(data?._id as string))} className="bg-[#ff000095] text-white hover:bg-white hover:text-[red]">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}