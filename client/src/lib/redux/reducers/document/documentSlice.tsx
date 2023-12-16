import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createDocument, infoDocument, listDocument, updateDocument } from "./thunks";

const initialState: documentSliceState = {
    value: {
        current: {},
        list: []
    },
    status: 'idle',
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrent: (state, action:PayloadAction<Object>) => {
            state.value.current = action.payload;
        },
        setList: (state, action:PayloadAction<Array<Object>>) => {
            state.value.list = action.payload;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(createDocument.pending, (state) => {
            state.status = "loading"
        })
        .addCase(createDocument.fulfilled, (state, action) => {
            state.status = "idle";

            if(action.payload.status === "ok" ) {
                state.value.current = action.payload.data.doc;

                let doc = action.payload.data.doc;
                state.value.list.push({
                    title: doc.title, 
                    owner: doc.owener,
                    publish: doc.publish,
                    create_at: doc.create_at,
                    modify_at: doc.modify_at,
                    _id: doc._id,
                })
            }
        })
        .addCase(updateDocument.pending, (state) => {
            state.status = "loading"
        })
        .addCase(updateDocument.fulfilled, (state, action) => {
            state.status = "idle";

            let result:docState = action.payload || {status: "fail", doc: {_id:""}};

            if(result.status === "ok") {
                state.value.current = action.payload;
                state.value.list = state.value.list.map((e: { _id: any; })=> {
                    if(e._id === result.doc._id) {
                        return result.doc;
                    }
                    return e;
                });                 
            }

        })
        .addCase(listDocument.pending, (state) => {
            state.status = "loading";
        })
        .addCase(listDocument.fulfilled, (state, action) => {
            state.status = "idle";

            if(action.payload.status === "ok") {
                state.value.list = action.payload.data;
            }
        })
        .addCase(infoDocument.pending, (state) => {
            state.status = "loading";
        })
        .addCase(infoDocument.fulfilled, (state, action) => {
            state.status = "idle";

            if(action.payload.status === "ok") {
                state.value.current = action.payload.data;
            }
        })
    },
});

export interface documentSliceState {
    value: any
    status: 'idle' | 'loading' | 'failed'
}

export interface docState {
    status: String,
    doc: any
}