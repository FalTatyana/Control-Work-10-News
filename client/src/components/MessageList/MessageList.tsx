import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchMessages } from "../../app/messagesSlice";

const MessageCard = () => {

  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.messages.messages);
  const loading = useSelector(
    (state: RootState) => state.messages.loading
  );
  
  React.useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  if (loading) {
    return <h3>Loading...</h3>;
  };

  return (
    <Stack sx={{maxWidth: 600}}>
      {messages.map((msg) => (
        <Card sx={{mb: 2}} key={msg.id}>
          <CardActionArea
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h5" component="div">
                {msg.message}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Author: {msg.author}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Date: {msg.datetime}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
};

export default MessageCard;
