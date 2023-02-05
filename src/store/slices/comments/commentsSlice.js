import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComents",
  async () => {
    return await fetch(
      "https://jsonplaceholder.typicode.com/comments?_limit=10"
    ).then(res => res.json());
  }
);

const commentsAdapter = createEntityAdapter({
  selectId: comment => comment.id, // the id our comments response has
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.loading = false;
      commentsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchComments.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export const commentsSelectors = commentsAdapter.getSelectors(
  state => state.comments
);

// export const { selectIds, selectById, selectEntities, selectAll, selectTotal } =
//   commentsSelectors;

export default commentsSlice.reducer;
