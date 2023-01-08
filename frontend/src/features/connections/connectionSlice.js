import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import connectionService from './connectionService'

const initialState = {
    connections: [],
    connectionError: false,
    connectionSuccess: false,
    connectionLoading: false,
    connectionMessage: ''
}

// Get connections
export const getConnections = createAsyncThunk('connections/all', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await connectionService.get_connections(token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Request Connection
export const requestConnection = createAsyncThunk('connection/request', async (id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await connectionService.request_connection(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Accept Connection
export const acceptConnection = createAsyncThunk('connection/accept', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await connectionService.accept_request(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Connection
export const deleteConnection = createAsyncThunk('connection/delete', async (id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await connectionService.delete_request(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: initialState,
    reducers: {
        resetConnection: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getConnections.pending, (state) => {
            state.connectionLoading = true
        })
        .addCase(getConnections.fulfilled, (state, action) => {
            state.connectionLoading = false
            state.connectionSuccess = true
            state.connections = action.payload
        })
        .addCase(getConnections.rejected, (state, action) => {
            state.connectionLoading = false
            state.connectionError = true
            state.connectionMessage = action.payload
        })
        .addCase(requestConnection.pending, (state) => {
            state.connectionLoading = true
        })
        .addCase(requestConnection.fulfilled, (state) => {
            state.connectionLoading = false
            state.connectionSuccess = true
        })
        .addCase(requestConnection.rejected, (state, action) => {
            state.connectionLoading = false
            state.connectionError = true
            state.connectionMessage = action.payload
        })
        .addCase(acceptConnection.pending, (state) => {
            state.connectionLoading = true
        })
        .addCase(acceptConnection.fulfilled, (state) => {
            state.connectionLoading = false
            state.connectionSuccess = true
        })
        .addCase(acceptConnection.rejected, (state, action) => {
            state.connectionLoading = false
            state.connectionError = true
            state.connectionMessage = action.payload
        })
        .addCase(deleteConnection.pending, (state) => {
            state.connectionLoading = true
        })
        .addCase(deleteConnection.fulfilled, (state) => {
            state.connectionLoading = false
            state.connectionSuccess = true
        })
        .addCase(deleteConnection.rejected, (state, action) => {
            state.connectionLoading = false
            state.connectionError = true
            state.connectionMessage = action.payload
        })
    }
})

export const {resetConnection} = connectionSlice.actions
export default connectionSlice.reducer
