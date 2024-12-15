import { toast } from "sonner";

const fetchData = async (
    route: string,
    method: string,
    data?: object
) => {
    try {
        const res = await fetch(`/api/${route}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Check if the response status is not OK (200)
        if (!res.ok) {
            const { message } = await res.json(); // Attempt to parse the error response
            toast(message, {
                // Optional toast configuration
            });
            throw new Error(message || 'An error occurred'); // Throw an error with the message from the server
        }

        const { data: ResponseData, message } = await res.json();

        // Show toast notification for non-GET requests
        if (method !== 'GET') {
            toast(message, {
                // Optional toast configuration
            });
        }

        return ResponseData;
    } catch (error) {
        // Throw the error to be caught in the thunk
        throw new Error((error as Error).message);
    }
}



export const getAllTask = async () => {
    return await fetchData('tasks', 'GET')
}

export const getSpecificTask = async (_id: string) => {
    return await fetchData(`tasks/${_id}`, 'GET')
}

export const deleteTask = async (_id: string) => {
    return await fetchData(`tasks/${_id}`, 'DELETE')
}

export const createTask = async (task: object) => {
    return await fetchData('tasks', 'POST', task)
}

export const updateTask = async (_id: string, task: object) => {
    return await fetchData(`tasks/${_id}`, 'PUT', task)
}