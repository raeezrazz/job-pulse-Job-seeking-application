import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    userType: string | null;
    userInfo:userInfo | null;
}

export interface userInfo {
    _id: string;
    name: string;
    email: string;

}

const initialState: userState = {
    userType: null,
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null
}


export const userTypeSlce = createSlice({
    name: "user",
    initialState,
    reducers:{
        setCredentials: (state, action) =>{
            state.userInfo = action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        },

    }
})

export const {setUserType , setCredentials ,logout} = userTypeSlce.actions;

export default userTypeSlce.reducer;