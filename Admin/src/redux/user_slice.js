import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signinStart: (state) =>{
            state.loading=true;
        },
        signInSuccess: (state, action) => {
            //state.currentUser = action.payload.usuario;
            state.loading =  false;
            state.error =  null;        
        },
        signInFailure:  (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          }
    }
});

 export const { signinStart, signInSuccess, signInFailure} = userSlice.actions;
 export default userSlice.reducer;