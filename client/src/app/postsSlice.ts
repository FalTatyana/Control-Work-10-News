import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi.js";
import { type Post, type PostMessage } from "../../types.js";
import dayjs from "dayjs";

interface PostsState {
  posts: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
};

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  const response = await axiosApi.get<Post[]>("/");

  return response.data.map((post) => ({
    ...post,
    datetime: dayjs(post.datetime).format("DD.MM.YYYY HH:mm"),
  }));
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post: PostMessage) => {
    const response = await axiosApi.post<Post>(`/`, post);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    await axiosApi.delete(`/${id}`);
    return id;
  }
);


const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
      toast.success("Added new message");
    });
    builder.addCase(addPost.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((c) => c.id !== action.payload);
      state.loading = false;
      toast.info("Success deleted");
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
  },
});

export const PostReducer = postSlice.reducer;
export const {} = postSlice.actions;
