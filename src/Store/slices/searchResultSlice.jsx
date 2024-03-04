import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchResult = createAsyncThunk('fetchSearchResult', async (searchurl) => {
    const response = await fetch('api/data/get', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: searchurl
        })
    });
    return response.json();
})

const searchResultSlice = createSlice({
    name: 'searchResultSlice',
    initialState: {
        isLoading: false,
        data: []
    }, reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSearchResult.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchSearchResult.fulfilled, (state, action) => {
                state.isLoading = false
                if (!localStorage.getItem('WebSearch')) {
                    let data = [];
                    data.push(action.payload);
                    localStorage.setItem('WebSearch', JSON.stringify(data));
                } else {
                    let data = localStorage.getItem('WebSearch');
                    data = JSON.parse(data);
                    data.push(action.payload);
                    localStorage.setItem('WebSearch', JSON.stringify(data));
                }
                
                state.data = action.payload
            })
            .addCase(fetchSearchResult.rejected, (state, action) => {
                state.isLoading = false
                // Add any fetched posts to the array
                console.log(action.payload);
            })
    }

})

export default searchResultSlice.reducer;