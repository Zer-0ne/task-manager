'use client'
import { signIn, signOut } from "next-auth/react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { PostModal } from './new-post'
import { Cards } from "./task-card"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks } from "@/slice/task"
import { AppDispatch, RootState } from "@/store/store"
import { Task } from "@/utils/interfaces"
import { useSession } from "next-auth/react"

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div
            className='flex-1 overflow-auto w-full'
        >
            <Header />

            <div className="flex mt-5 !w-auto items-center space-x-2">
                <Input
                    className='flex flex-1'
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                />
                <PostModal />
                {/* <New /> */}
            </div>
            <div
                className="flex flex-wrap gap-4 my-4 justify-center transition-all delay-500 ease-in-out items-center"
            >

                <PostContainer searchTerm={searchTerm} />
            </div>
        </div>
    )
}

const PostContainer = ({ searchTerm }: { searchTerm?: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state?.tasks); // Access tasks from Redux state

    useEffect(() => {
        dispatch(fetchTasks()); // Fetch tasks when the component mounts
    }, [dispatch]);

    if (loading) {
        return <p className="start-0">Loading tasks...</p>; // Show loading state
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; // Show error message
    }
    if(!tasks.length && !error && !loading){
        return <p className="text-[#ff000084] font-bold text-lg">No tasks found</p>
    }
    // Filter tasks based on the search term
    const filteredTasks = searchTerm ? tasks.filter(task =>
        task.title.toLowerCase().includes((searchTerm as string)?.toLowerCase()) || // Filter by title
        task.description.toLowerCase().includes((searchTerm as string)?.toLowerCase()) // Filter by description
    ) : tasks;
    return <>
        {
            (filteredTasks as Task[])?.map((task, index) => <Cards data={task} key={index} />)
        }
    </>
}

const Header = () => {
    return <header
        className='my-4 sticky top-[15px] transition-all delay-500 ease-in-out px-0 py-2 rounded-xl items-center border-[0px] flex justify-end border-[#ffffff1f] w-full '
    >
        {/* <p
            className='font-semibold text-[1.5rem]'
        >Task Manager</p> */}
        <SessionCard />
    </header>
}


export function SessionCard() {
    const { data: session, status } = useSession();
    // console.log(session)
    return (
        <HoverCard 
        >
            <HoverCardTrigger asChild>
                <Button variant="link">
                    <Avatar
                        className='cursor-pointer'
                    >
                        {(session && status === 'authenticated') &&

                            <AvatarImage src={session?.user?.image as string} alt="@shadcn" />
                        }
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 z-10">
                <div className="flex space-x-4">
                    {
                        (!session && status === 'unauthenticated') ? <>
                            <Button
                                onClick={async () => {
                                    signIn('google');
                                }}
                                className="w-full"
                            >Login with Google</Button>
                        </> : <>
                            <Avatar>
                                <AvatarImage src={session?.user?.image as string} />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{session?.user?.name}</h4>
                                <p className="text-sm">
                                    {session?.user?.email}
                                </p>
                                <div className="flex items-center pt-2">
                                    <Button
                                        onClick={async () => await signOut()}
                                    >Logout</Button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default Home