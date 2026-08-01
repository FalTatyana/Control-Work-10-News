import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchMessages } from "../../app/messagesSlice";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

const MessageCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.messages.messages);
  const loading = useSelector((state: RootState) => state.messages.loading);

  React.useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  const handleRead = (id) => {};

  const handleDelete = (id) => {};

  return (
    <Stack sx={{ maxWidth: 750, mx: "auto", width: "100%" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
        News
      </Typography>

      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            mb: 3,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
            transition: "0.2s",

            "&:hover": {
              boxShadow: 7,
              transform: "translateY(-2px)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 1, fontWeight: 700 }}
            >
              {post.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, color: "text.primary" }}
            >
              {post.message}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Date: {post.datetime}
            </Typography>
          </CardContent>

          <CardActions
            sx={{
              px: 3,
              pb: 3,
              pt: 0,
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleRead(post.id)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
              }}
            >
              Read more
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(post.id)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Delete post
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
};

export default MessageCard;
