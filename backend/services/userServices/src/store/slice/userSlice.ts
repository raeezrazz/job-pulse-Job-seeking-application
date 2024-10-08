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

// const initialSlice: userState = {
//     userType: null,
//     userInfo: 
// }


// export const userTypeSlce = createSlice({
//     name: "user",
//     reducers:{
//         setCredentials: (state, action) =>{
//             state.userInfo = action.payload;
//             localStorage.setItem("userInfo",JSON.stringify(action.payload));
//         },

//     }
// })