import { createSlice } from '@reduxjs/toolkit'

export const TrackListSlice = createSlice({
    name: 'TrackList',
    // Define initial state of the reducer/slice
    initialState: {
        currentTrackList: [],
    },
    // Define the reducers
    reducers: {
        update_currentTrackList: (state, action) => {
            state.currentTrackList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { update_currentTrackList} = TrackListSlice.actions

export default TrackListSlice.reducer