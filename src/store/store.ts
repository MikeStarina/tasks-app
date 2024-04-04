import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { reducer as tasksReducer } from './first-step/first-step.slice';
import { reducer as secondStepReducer } from './second-step/second-step.slice';
import { reducer as stepperReducer } from './stepper/stepper.slice';
import { reducer as thirdStepReducer } from './third-step/third-step.slice';
import { reducer as fourthStepReducer } from './fourth-step/fourth-step.slice';
import { reducer as authReducer } from './auth/auth.slice';
import { api } from '../api/api';


//const reducers = combineReducers([tasksReducer, stepperReducer])


export const store = configureStore({
    reducer: {
        firstStep: tasksReducer,
        stepper: stepperReducer,
        secondStep: secondStepReducer,
        thirdStep: thirdStepReducer,
        fourthStep: fourthStepReducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch