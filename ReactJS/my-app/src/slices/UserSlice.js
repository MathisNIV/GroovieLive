import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'Song',
    // Define initial state of the reducer/slice
    initialState: {
        current_user: {},
    },
    // Define the reducers
    reducers: {
        update_selected_user: (state, action) => {
            state.current_user = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { update_selected_user} = userSlice.actions

export default userSlice.reducer