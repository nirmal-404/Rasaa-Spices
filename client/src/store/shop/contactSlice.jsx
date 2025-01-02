import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
    loading: false,
    error: null,
}


export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async()=> {
    const response = await fetch('http://localhost:5000/api/contact/contacts')
    const data = await response.json()
    console.log("Hello .............");
    return data;
})


// export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, { rejectWithValue }) => {
//     try {
//         const response = await fetch('http://localhost:5000/api/contact/contacts');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return await response.json();
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });


const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload || []; // Ensure it defaults to an array
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch contacts";
            });
    }
    
})


export default contactSlice.reducer