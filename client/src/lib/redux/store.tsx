import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        
    }
});

export default store;
export type ReduxStore = typeof store
export type ReduxState = ReturnType<typeof store.getState>
export type ReduxDispatch = typeof store.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>