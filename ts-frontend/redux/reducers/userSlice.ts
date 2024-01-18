import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

const expressUrl = process.env.NEXT_PUBLIC_EXPRESS_URL;

enum Status {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed',
};

//Define the intial state
const initialState: UserState = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    status: Status.Idle, //idle | loading | succeeded | failed
    error: null
}


const changeUsername = (state = initialState, action: PayloadAction<string>) =>{
    switch (action.type){
        case "user/changeUsername":
            return {
                //this spread operation is okay as long as the state is not overly large otherwise you should consider just relying on the immer library for copying state
                ...state,
                username: action.payload
            }
        default:
            return state;
    }
};

//slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUsername,
    }
});


export const {changeUsername: usernameAction} = userSlice.actions;

export default userSlice.reducer;