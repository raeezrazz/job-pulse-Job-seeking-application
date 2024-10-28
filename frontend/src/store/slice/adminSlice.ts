import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    adminInfo: localStorage.getItem('adminInfo')
        ? JSON.parse(localStorage.getItem('adminInfo') || '{}')
        : null,
};

export const adminTypeSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminCredentials: (state, action) => {
            console.log("admin slice setCredential is working",action)
            state.adminInfo = action.payload.data;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload.data));
        },
        adminLogout: (state) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
        },
    },
});

export const { setAdminCredentials, adminLogout } = adminTypeSlice.actions;
export default adminTypeSlice.reducer;
