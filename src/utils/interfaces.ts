export interface Task {
    title: string;
    description: string;
    _id?: string;
    author?: string | User
    createdAt?: string
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    tasks: Task[];
    profile: string
    image: string
}

export interface TasksState {
    tasks: Task[]; // Array of tasks
    loading: boolean;       // Loading state
    error: string | null;   // Error message or null if no error
}