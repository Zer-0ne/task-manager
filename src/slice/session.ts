import { currentSession } from "@/lib/session";
import { User } from "@/utils/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch the current user's session
export const fetchCurrentUser = createAsyncThunk('session', async (_, thunkApi) => {
    try {
        const user = await currentSession();
        return user; // Return the current user
    } catch (error) {
        return thunkApi.rejectWithValue((error as Error).message); // Reject with error message
    }
});

// Initial state
const initialState = {
    session: undefined as User | undefined,
    loading: false,
    error: null as null | string,
};

// Create the session slice
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null; // Clear the error message
        },
        removeSession: (state) => {
            state.session = undefined
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true; // Set loading to true when fetching current user starts
                state.error = null; // Reset error state
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when fetching is successful
                state.session = action.payload as unknown as User; // Set the current user
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false; // Set loading to false when fetching fails
                state.error = action.payload as string; // Store the error message
            });
    }
});

// Export actions and reducer
export const { clearError, removeSession } = sessionSlice.actions;
export default sessionSlice.reducer;
