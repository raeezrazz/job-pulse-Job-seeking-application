import {configureStore} from "@reduxjs/toolkit"


export const store = configureStore({
    reducer: {
        user: 
    },
})

export type Rootstate = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch