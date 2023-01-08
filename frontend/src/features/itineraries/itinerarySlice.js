import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import itineraryService from './itineraryService'


const initialState = {
    itineraries: [],
    itineraryError: false,
    itinerarySuccess: false,
    itineraryLoading: false,
    itineraryMessage: ''
}

// Add itinerary
export const addItinerary = createAsyncThunk('itinerary/add', async (data,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itineraryService.add_itinerary(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Update itinerary
export const updateItinerary = createAsyncThunk('itinerary/update', async (params,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const {id, data} = params
        return await itineraryService.update_itinerary(id, data, token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Search itinerary
export const searchItinerary = createAsyncThunk('itinerary/search', async (data,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itineraryService.search_itinerary(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Delete itinerary
export const deleteItinerary = createAsyncThunk('itinerary/delete', async (id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await itineraryService.delete_itinerary(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState: initialState,
    reducers: {
        resetItinerary: (state) => //{
            initialState
        //}
    },
    extraReducers: (builder) => {
        builder
        .addCase(addItinerary.pending, (state) =>{
            state.itineraryLoading = true
        })
        .addCase(addItinerary.fulfilled, (state) => {
            state.itineraryLoading = false
            state.itinerarySuccess = true
        })
        .addCase(addItinerary.rejected, (state, action) => {
            state.itineraryLoading = false
            state.itineraryError = true
            state.itineraryMessage = action.payload
        })
        .addCase(updateItinerary.pending, (state) => {
            state.itineraryLoading = true
        })
        .addCase(updateItinerary.fulfilled, (state) => {
            state.itineraryLoading = false
            state.itinerarySuccess = true
        })
        .addCase(updateItinerary.rejected, (state, action) => {
            state.itineraryLoading = false
            state.itineraryError = true
            state.itineraryMessage = action.payload
        })
        .addCase(searchItinerary.pending, (state) => {
            state.itineraryLoading = true
        })
        .addCase(searchItinerary.fulfilled, (state, action) => {
            state.itineraryLoading = false
            state.itinerarySuccess = true
            state.itineraries = action.payload
        })
        .addCase(searchItinerary.rejected, (state, action) => {
            state.itineraryLoading = false
            state.itineraryError = true
            state.itineraryMessage = action.payload
            state.itineraries = []
        })
        .addCase(deleteItinerary.pending, (state) => {
            state.itineraryLoading = true
        })
        .addCase(deleteItinerary.fulfilled, (state, action) => {
            state.itineraryLoading = false
            state.itinerarySuccess = true
        })
        .addCase(deleteItinerary.rejected, (state, action) => {
            state.itineraryLoading = false
            state.itineraryError = true
            state.itineraryMessage = action.payload
        })
    }

})

export const {resetItinerary} = itinerarySlice.actions
export default itinerarySlice.reducer