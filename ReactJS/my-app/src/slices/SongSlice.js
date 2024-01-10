import { createSlice } from '@reduxjs/toolkit'

export const songSlice = createSlice({
    name: 'Song',
    // Define initial state of the reducer/slice
    initialState: {
        current_song: {},
    },
    // Define the reducers
    reducers: {
        update_selected_song: (state, action) => {
            state.current_song = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { update_selected_song} = songSlice.actions

export default songSlice.reducer