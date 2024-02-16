import { configureStore } from '@reduxjs/toolkit'
import { reducer as tasksReducer } from './first-step/first-step.slice';
import { reducer as secondStepReducer } from './second-step/second-step.slice';
import { reducer as stepperReducer } from './stepper/stepper.slice';
import { reducer as thirdStepReducer } from './third-step/third-step.slice';
import { reducer as fourthStepReducer } from './fourth-step/fourth-step.slice';


//const reducers = combineReducers([tasksReducer, stepperReducer])


export const store = configureStore({
    reducer: {
        firstStep: tasksReducer,
        stepper: stepperReducer,
        secondStep: secondStepReducer,
        thirdStep: thirdStepReducer,
        fourthStep: fourthStepReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch