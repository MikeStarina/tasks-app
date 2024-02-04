import { configureStore } from '@reduxjs/toolkit'
import { reducer as tasksReducer } from './first-step/first-step.slice';
import { reducer as stepperReducer } from './stepper/stepper.slice';


//const reducers = combineReducers([tasksReducer, stepperReducer])


export const store = configureStore({
    reducer: {
        firstStep: tasksReducer,
        stepper: stepperReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch