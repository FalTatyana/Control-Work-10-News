import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch } from "../../app/store";
import type { PostMessage } from "../../../types";
import { addMessage, fetchMessages } from "../../app/messagesSlice";
import Typography from "@mui/material/Typography";

const NewMessage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<PostMessage>({
    title: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim() || !form.message.trim()) {
      toast.error("Enter name and message");
      return;
    }

    const newMessage = {
      title: form.title,
      message: form.message,
    };

    await dispatch(addMessage(newMessage));
    await dispatch(fetchMessages());
    setForm({
      title: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" component="div">
          Add new post
        </Typography>
        <TextField
          label="Enter title"
          variant="outlined"
          id="title"
          name="title"
          onChange={handleChange}
          value={form.title}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Enter new post"
          variant="outlined"
          id="message"
          name="message"
          onChange={handleChange}
          value={form.message}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="outlined" sx={{ maxWidth: 200, mb: 7 }}>
          Add new post
        </Button>
      </Stack>
    </form>
  );
};

export default NewMessage;
