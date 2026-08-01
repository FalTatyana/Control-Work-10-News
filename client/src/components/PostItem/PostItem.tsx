import { type SubmitEvent, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { type Comment, type Post } from "../../../types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchPosts } from "../../app/postsSlice";

const initialComments: Comment[] = [
  {
    id: "1",
    postId: "post-1",
    author: "John Doe",
    message: "Hey, this is a great article!",
  },
  {
    id: "2",
    postId: "post-1",
    author: "Admin",
    message: "Don't do this to yourself...",
  },
];

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);

  const [comments, setComments] = useState<Comment[]>(initialComments);

  const [author, setAuthor] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const post = posts.find((currentPost) => currentPost.id === id);

  const postComments = comments.filter((comment) => comment.postId === id);

  const handleDeleteComment = (id: string) => {
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== id)
    );
    toast.success("Comment deleted");
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!author.trim() || !commentMessage.trim()) {
      toast.error("Enter all data");
      return;
    }

    const newComment: Comment = {
      id: crypto.randomUUID(),
      postId: post.id,
      author: author.trim(),
      message: commentMessage.trim(),
    };

    setComments((currentComments) => [...currentComments, newComment]);

    setAuthor("");
    setCommentMessage("");
    toast.success("Comment added");
  };

  if (loading) {
    return <h5>Loading...</h5>;
  }

  if (!id || !post) {
    return <h5>Not found</h5>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Box component="article">
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            {post.title}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            At {post.datetime}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              whiteSpace: "pre-line",
            }}
          >
            {post.message}
          </Typography>
        </Box>
        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
          Comments
        </Typography>

        <Stack spacing={2}>
          {comments.length === 0 ? (
            <Typography color="text.secondary">Comments not found.</Typography>
          ) : (
            comments.map((comment) => (
              <Paper
                key={comment.id}
                variant="outlined"
                sx={{ p: 2.5, borderRadius: 2 }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" sx={{ overflowWrap: "anywhere" }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {comment.author}
                    </Box>{" "}
                    wrote: {comment.message}
                  </Typography>

                  <Button
                    type="button"
                    variant="text"
                    color="error"
                    onClick={() => handleDeleteComment(comment.id)}
                    sx={{ flexShrink: 0, textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Paper>
            ))
          )}
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
          Add comment
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Name"
              value={author}
              onChange={(event) => {
                setAuthor(event.target.value);
              }}
              fullWidth
            />

            <TextField
              label="Comment"
              value={commentMessage}
              onChange={(event) => {
                setCommentMessage(event.target.value);
              }}
              multiline
              minRows={4}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                alignSelf: "flex-start",
                minWidth: 120,
                textTransform: "none",
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostDetails;
