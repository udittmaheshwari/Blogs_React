import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userdata : null
}

const authSlice = createSlice({
name: "auth",
initialState,
reducers:{
     login: (state,action) => {
        state.status= true,
        state.userdata = action.payload

     },

    logout: (state) => {
        state.status= false,
        state.userdata = null
     }
}

})


export default authSlice.reducer
export const {login , logout} = authSlice.actions