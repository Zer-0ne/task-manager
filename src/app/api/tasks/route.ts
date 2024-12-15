import Task from "@/db/Models/tasks";
import Users from "@/db/Models/user";
import connect from "@/db/mongodb";
import { currentSession } from "@/lib/session";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await connect();
        const { title, description } = await request.json();
        const session = await currentSession() as Session;

        if (!session) {
            return NextResponse.json({ message: 'Please login' }, { status: 401 });
        }

        const user = await Users.findOne({ email: session?.user?.email });

        // Create the task
        const task = await Task.create({ title, description, author: user._id });

        // Populate the author field
        await task.populate('author');

        return NextResponse.json({
            data: task,
            message: 'Task created successfully'
        });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export const GET = async () => {
    try {
        await connect();
        const session = await currentSession() as Session;

        if (!session) {
            return NextResponse.json({ message: 'Please login' }, { status: 401 });
        }

        const user = await Users.findOne({ email: session?.user?.email });

        // Check if user exists
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Fetch tasks where author matches user._id
        const tasks = await Task.find({ author: user._id }).populate('author');
``
        return NextResponse.json({ data: tasks });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

