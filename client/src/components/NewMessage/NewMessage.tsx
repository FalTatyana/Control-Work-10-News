import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch } from "../../app/store";
import type { PostMessage } from "../../../types";
import { addMessage, fetchMessages } from "../../app/messagesSlice";

const NewMessage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<PostMessage>({
    author: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.author.trim() || !form.message.trim()) {
      toast.error("Enter name and message");
      return;
    }

    const newMessage = {
      author: form.author,
      message: form.message,
    };

    await dispatch(addMessage(newMessage));
    await dispatch(fetchMessages());
    setForm({
      author: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ maxWidth: 600 }}>
        <TextField
          label="Enter your name"
          variant="outlined"
          id="author"
          name="author"
          onChange={handleChange}
          value={form.author}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Enter new message"
          variant="outlined"
          id="message"
          name="message"
          onChange={handleChange}
          value={form.message}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="outlined" sx={{ maxWidth: 200, mb: 7 }}>
          Add message
        </Button>
      </Stack>
    </form>
  );
};

export default NewMessage;
