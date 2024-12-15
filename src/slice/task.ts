import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTask, createTask as createTaskAPI, updateTask as updateSpecificTask, deleteTask as deleteSpecificTask } from "@/lib/fetch-from-api";
import { Task as TaskInterface, TasksState } from "@/utils/interfaces";
import { toast } from "sonner";

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkApi) => {
    try {
        const tasks = await getAllTask();
        return tasks;
    } catch (error) {
        return thunkApi.rejectWithValue((error as Error).message);
    }
});

// Async thunk to create a task
export const createTask = createAsyncThunk('tasks/createTask', async (task: TaskInterface, thunkApi) => {
    try {
        const newTask = await createTaskAPI(task); // Call the API function to create a task
        return newTask; // Return the created task
    } catch (error) {
        return thunkApi.rejectWithValue((error as Error).message);
    }
});

// Async thunk to update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async (task: TaskInterface, thunkApi) => {
    try {
        const updatedTask = await updateSpecificTask(`${task._id}`, task);
        return updatedTask;
    } catch (error) {
        return thunkApi.rejectWithValue((error as Error).message);
    }
});

// Async thunk to delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string, thunkApi) => {
    try {
        const data = await deleteSpecificTask(`${taskId}`);
        console.log(data)
        
        return taskId; // Return the ID of the deleted task
    } catch (error) {
        return thunkApi.rejectWithValue((error as Error).message);
    }
});

// Initial state
const initialState: TasksState = {
    tasks: [] as TaskInterface[],
    loading: false,
    error: null,
};

// Create the tasks slice
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // addTask: (state, action) => {
        //     state.tasks.push(action.payload);
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload); // Add the new task to the state
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                const taskIndex = state.tasks.findIndex(task => task._id === updatedTask._id);
                if (taskIndex !== -1) {
                    state.tasks[taskIndex] = updatedTask;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                // Handle the error case here
                // state.error = action.payload as string; // Store the error message
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskId = action.payload;
                state.tasks = state.tasks.filter(task => task._id !== taskId);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                // Handle the error case here
                // state.error = action.payload as string; // Store the error message
                // Optionally, you can show a toast notification or log the error
            });
    }
});

// Export actions and reducer
// export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
