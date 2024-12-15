
import Task from "@/db/Models/tasks";
import Users from "@/db/Models/user";
import connect from "@/db/mongodb";
import { currentSession } from "@/lib/session";
import { isValidObjectId } from "mongoose";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
    try {
        await connect()
        const { id } = await params;
        const session = await currentSession() as Session;
        if (!session) return NextResponse.json({ message: 'Please login' }, { status: 401 })
        if (!isValidObjectId(id)) {
            throw new Error('Task Id is not valid!')
        }
        const task = await Task.findById(id);
        return NextResponse.json({
            data: task
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: (error as Error).message })
    }
}

export const PUT = async (request: NextRequest, { params }: any) => {
    try {
        const { id } = await params;
        await connect()
        const session = await currentSession() as Session;
        if (!session) return NextResponse.json({ message: 'Please login' }, { status: 401 })
        if (!isValidObjectId(id)) {
            throw new Error('Task Id is not valid!')
        }
        const user = await Users.findOne({ email: session?.user?.email })

        const taskTobeUpdate = await Task.findById(id);

        // Check if the task author matches the session user ID
        if (taskTobeUpdate.author.toString() !== user?._id.toString()) {
            return NextResponse.json({ message: 'Unauthorized access' }, { status: 403 });
        }
        const task = await Task.findByIdAndUpdate(id, await request.json(), { new: true });
        await task.populate('author');
        return NextResponse.json({
            data: task,
            message: 'Task updated successfully'
        })
    } catch (error) {
        return NextResponse.json({
            error: (error as Error).message
        })
    }
}

export const DELETE = async (request: NextRequest, { params }: any) => {
    try {
        const { id } = await params;
        await connect();
        const session = await currentSession() as Session;
        if (!session) return NextResponse.json({ message: 'Please login' }, { status: 401 });
        if (!isValidObjectId(id)) {
            throw new Error('Task Id is not valid!');
        }

        const user = await Users.findOne({ email: session?.user?.email })

        const taskTobedelete = await Task.findById(id);
        // console.log(taskTobedelete.author.toString() ,user?._id.toString().toString())

        // Check if the task author matches the session user ID
        if (taskTobedelete.author.toString() !== user?._id.toString()) {
            return NextResponse.json({ message: 'Unauthorized access' }, { status: 403 });
        }

        // Find the task by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(id);

        // If the task was not found, return a 404 response
        if (!deletedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Task deleted successfully',
            data: deletedTask
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: (error as Error).message
        });
    }
}