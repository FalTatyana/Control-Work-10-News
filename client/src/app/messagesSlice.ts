import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";
import { type Message, type PostMessage } from "../../types.js";
import dayjs from "dayjs";

interface MessagesState {
  messages: Message[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const fetchMessages = createAsyncThunk("messages/fetchAll", async () => {
  const response = await axiosApi.get<Message[]>("/messages");

  return response.data.map((message) => ({
    ...message,
    datetime: dayjs(message.datetime).format("DD.MM.YYYY HH:mm"),
  }));
});

export const addMessage = createAsyncThunk(
  "message/addMessage",
  async (message: PostMessage) => {
    const response = await axiosApi.post<Message>(`/messages`, message);
    return response.data;
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMessages.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addMessage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.messages.push(action.payload);
      toast.success("Added new message");
    });
    builder.addCase(addMessage.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
  },
});

export const messagesReducer = messageSlice.reducer;
export const {} = messageSlice.actions;
