'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "@/slice/task";
import { AppDispatch } from "@/store/store";
import { Task } from "@/utils/interfaces";

export function PostModal({ data, btnText }: { data?: Task, btnText?: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isDisabled, setIsDisabled] = useState(false)
    const [formData, setFormData] = useState({
        title: data?.title || "",
        description: data?.description || "",
        error: "",
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || "",
                description: data.description || "",
                error: "",
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, error: "" })); // Clear error on input change
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { title, description } = formData;
        setIsDisabled(true)

        // Validate inputs
        if (!title) {
            setFormData((prev) => ({ ...prev, error: "Title is required." }));
            return;
        }
        if (!description) {
            setFormData((prev) => ({ ...prev, error: "Description is required." }));
            return;
        }

        try {
            // Dispatch the action to create or update the task
            await dispatch(data ? updateTask({ _id: data?._id as string, ...formData }) : createTask({ title, description }));

        } catch (error) {
            // Handle the error (you can customize the error message based on the error type)
            setFormData((prev) => ({ ...prev, error: "An error occurred while saving the task. Please try again." }));
            console.error("Error submitting task:", error); // Log the error for debugging
        } finally {
            // Clear the inputs after submission
            setFormData({ title: "", description: "", error: "" });

            // Close the dialog
            setIsOpen(false);

            setIsDisabled(false)
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)} className="truncate">
                    <p
                        className="truncate"
                    >{btnText || 'Add new task'}</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle><p
                        className="truncate"
                    >{btnText || 'Add new task'}</p></DialogTitle>
                    <DialogDescription>
                        {
                            btnText ? `Make changes to your task here. Click "Post" when you're done.` :
                                `Fill in the details for your new task. Click "Post" when you're done.`
                        }

                        {/* Make changes to your task here. Click save when you're done. */}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Enter Your title.."
                            className="col-span-3"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Type your message here."
                            className="col-span-3"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    {formData.error && <p className="text-red-500 text-sm">{formData.error}</p>}
                    <DialogFooter>
                        <Button disabled={isDisabled} type="submit">{isDisabled ? 'Posting...' : 'Post'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
