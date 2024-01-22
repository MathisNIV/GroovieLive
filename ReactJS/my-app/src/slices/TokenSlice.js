import { createSlice } from '@reduxjs/toolkit'

export const TokenSlice = createSlice({
    name: 'Token',
    // Define initial state of the reducer/slice
    initialState: {
        current_token: {},
    },
    // Define the reducers
    reducers: {
        update_selected_token: (state, action) => {
            state.current_token = action.payload
        },
    }
})

export const { update_selected_token} = TokenSlice.actions

export default TokenSlice.reducer