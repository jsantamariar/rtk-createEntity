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

export const deleteComments = createAsyncThunk(
  "comments/deleteComments",
  async id => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const patchComment = createAsyncThunk(
  "comments/patchComment",
  async ({ id, newObj }) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newObj),
    });

    return { id, changes: newObj };
  }
);

const commentsAdapter = createEntityAdapter({
  selectId: comment => comment.id, // the id our comments response has
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState(initialState),
  reducers: {
    /* 
        You can use entityAdapter reducers instead of calling a API to delete specific comments.
        it depends on what is required. 
    */
    setAllComments: commentsAdapter.setAll,
    setCommentById: commentsAdapter.addOne,
    removeOneComment: commentsAdapter.removeOne,
    addManyComments: commentsAdapter.addMany,
    updateOneComment: commentsAdapter.updateOne,
  },
  extraReducers: builder => {
    // GET
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
    // DELETE
    builder.addCase(deleteComments.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(deleteComments.fulfilled, (state, { payload: id }) => {
      state.loading = false;
      commentsAdapter.removeOne(state, id);
    });
    builder.addCase(deleteComments.rejected, (state, { payload }) => {
      state.loading = false;
    });
    // PUT / PATCH
    builder.addCase(patchComment.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(patchComment.fulfilled, (state, { payload }) => {
      state.loading = false;
      commentsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    });
    builder.addCase(patchComment.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

/*  */
export const {
  setAllComments,
  removeOneComment,
  addManyComments,
  updateOneComment,
} = commentsSlice.actions;

/*  */
export const commentsSelectors = commentsAdapter.getSelectors(
  state => state.comments
);

export default commentsSlice.reducer;
