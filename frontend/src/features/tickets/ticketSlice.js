import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false

            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const { reset } = ticketSlice.actions

export default ticketSlice.reducer