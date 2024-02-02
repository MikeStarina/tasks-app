import { createSlice } from "@reduxjs/toolkit";

const initialState = {

};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {

        },
        deleteTask: () => {},
    },
});


export const { actions, reducer } = taskSlice;