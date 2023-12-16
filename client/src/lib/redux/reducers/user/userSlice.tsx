import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginAsync, singupAsync } from ".";

const initialState: userSliceState = {
    value: {},
    status: 'idle',
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        set: (state, action:PayloadAction<Object>) => {
            state.value = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(loginAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            state.status = "idle";

            let data = action.payload;
            if(data.status === "ok") state.value = action.payload.data;
            else state.value = {};
        })
        .addCase(singupAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(singupAsync.fulfilled, (state, action) => {
            state.status = "idle";
        })
    },
});

export interface userSliceState {
    value: Object
    status: 'idle' | 'loading' | 'failed'
}