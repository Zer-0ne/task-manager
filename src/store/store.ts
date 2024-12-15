import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '@/slice/task';
import sessionReducer from '@/slice/session';
export const makeStore = () => {
    return configureStore({
        reducer: {
            session: sessionReducer,
            tasks: tasksReducer,
        }
    })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch